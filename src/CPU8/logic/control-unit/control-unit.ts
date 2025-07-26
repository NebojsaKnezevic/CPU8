
import type { Bit, Byte } from "../../../interface/interfaces";
import { Bus } from "../../bus/bus";
import { Bus1 } from "../../bus/bus1";
import { BitMemory } from "../../memory/bit-memory";
import { ByteMemory } from "../../memory/byte-memory";
import { EnableGate } from "../../memory/enable-gate";
import { Ram } from "../../memory/ram";
import { Register } from "../../memory/register";
import { Alu } from "../alu";
import { Decoder2x4 } from "../decoder2x4";
import { Decoder3x8 } from "../decoder3x8";
import { AndGate, AndGateM, NotGate, OrGate, OrGateM } from "../logic-gates";
import { ControlLogicCore } from "./control-logic-core";
import { Stepper } from "./stepper";




export class ControlUnit {
    public R: Register[];
    private tmp: Register;
    private bus1: Bus1;

    private alu: Alu;
    private acc: Register;

    private iar: Register;
    private ir: Register;

    private flags: ByteMemory;
    private carryIn: BitMemory;

    private ram: Ram;

    // private clock: Clock;
    private stepper: Stepper;

    // private and: Map<string, AndGate>;
    // private or: OrGate[] = [];

    // private andm: AndGateM[] = [];
    // private orm: Map<string, OrGateM>;

    private decoder45e_2x4_a: Decoder2x4;
    private decoder67e_2x4_b: Decoder2x4;
    private decoder67s_2x4_b: Decoder2x4;

    private controlLogicCore: ControlLogicCore;

    private inner_decoder3x8: Decoder3x8;
    private inner_decoder3x8_enable: EnableGate;
    private inner_decoder3x8_not: NotGate;

    constructor(
        alu: Alu,
        ram: Ram,
        registers: Register[],
        tmp: Register,
        bus1: Bus1,
        acc: Register,
        iar: Register,
        ir: Register,
        flags: ByteMemory
        // clock: Clock
    ) {
        this.alu = alu;
        this.ram = ram;
        this.R = registers;
        this.tmp = tmp;
        this.bus1 = bus1;
        this.acc = acc;
        this.iar = iar;
        this.ir = ir;
        // this.clock = clock;
        this.stepper = new Stepper();
        // this.and = new Map();
        // this.orm = new Map();

        this.decoder45e_2x4_a = new Decoder2x4();
        this.decoder67e_2x4_b = new Decoder2x4();
        this.decoder67s_2x4_b = new Decoder2x4();
        this.controlLogicCore = new ControlLogicCore();
        this.inner_decoder3x8 = new Decoder3x8();
        //Bus has no purpose, this is my own change regarding the actual logic of the control unit
        //I add new bus just in case here so that it doesnt alter the real bus somehow.
        this.inner_decoder3x8_enable = new EnableGate(new Bus);
        this.inner_decoder3x8_not = new NotGate();

        this.flags = flags;
        this.carryIn = new BitMemory();
    }

    setInputs(clockInput: [Bit, Bit, Bit]) {
        const [clk, clke, clks] = clockInput;
        const [b0, b1, b2, b3, b4, b5, b6, b7] = this.ir.getData();

        this.stepper.setInputs(clk);
        const [s1, s2, s3, s4, s5, s6] = this.stepper.getOutput();


        //####### OP CODE
        this.opCodeHandle(b0, [b1, b2, b3], s5);

        //####### INSTRUCTIONs
        const { ais4, ais5, ais6 } = this.aluInstruction([b0, b1, b2, b3], s4, s5, s6);
        this.inner_decoder3x8.setInputs(b1, b2, b3);
        this.inner_decoder3x8_not.setInputs(b0);
        const decoderOutput: Byte = this.inner_decoder3x8_enable.getData(
            this.inner_decoder3x8.getOutput(),
            this.inner_decoder3x8_not.getOutput()
        );
        const { lsis4, lsis5a, lsis5b } = this.loadStoreInstruction(decoderOutput, s4, s5);
        const { dis4, dis5, dis6 } = this.dataInstruction(decoderOutput, s4, s5, s6);
        const jri = this.jumpRegisterInstruction(decoderOutput, s4);
        const { jais4, jais5 } = this.jumpAddressInstruction(decoderOutput, s4, s5);
        const flagsOutput = this.handleFlagInputs(this.flags, [b4, b5, b6, b7]);
        const { jcaezS4, jcaezS5, jcaezS6 } = this.jumpCAEZInstruction(decoderOutput, flagsOutput, s4, s5, s6);
        const rf = this.resetFlags(decoderOutput, s4);


        //####### ENABLE
        this.enableRegisters([b4, b5, b6, b7], clke, [ais5, lsis4], [ais4, lsis5b, jri]);
        this.enableBus1([s1, dis4, rf, jcaezS4]);
        this.enableIAR([s1, dis4, jais4, jcaezS4], clke);
        this.enableRAM([s2, lsis5a, dis5, jais5, jcaezS6], clke);
        this.enableACC([s3, ais6, dis6, jcaezS5], clke);
        this.enableCarry(ais5);

        //####### SET
        this.setRegisters([b6, b7], clks, [ais6, lsis5a, dis5]);
        this.setMAR([s1, lsis4, dis4, jais4, jcaezS4], clks);
        this.setACC([s1, ais5, dis4, jcaezS4], clks);
        this.setIR([s2], clks);
        this.setIAR([s3, dis6, jri, jais5, jcaezS5, jcaezS6], clks);
        this.setTMP(ais4, clks);
        this.setRAM([lsis5b], clks);
        this.setFLAGS([ais5, rf], clks);
    }

    private resetFlags(decoderOutput: Byte, s4: Bit): Bit {
        const [b0, b1, b2, b3, b4, b5, b6, b7] = decoderOutput;
        this.controlLogicCore.flagReset_and.setInputs(b6, s4);
        return this.controlLogicCore.flagReset_and.getOutput();
    }

    private jumpCAEZInstruction(decoderOutput: Byte, caezFlagsOutput: Bit, s4: Bit, s5: Bit, s6: Bit): { jcaezS4: Bit, jcaezS5: Bit, jcaezS6: Bit } {
        const output: { jcaezS4: Bit, jcaezS5: Bit, jcaezS6: Bit } = { jcaezS4: 0, jcaezS5: 0, jcaezS6: 0 };

        const [b0, b1, b2, b3, b4, b5, b6, b7] = decoderOutput;

        this.controlLogicCore.jump_caez_and1.setInputs(s4, b5);
        this.controlLogicCore.jump_caez_and2.setInputs(s5, b5);
        this.controlLogicCore.jump_caez_andM.setInputs([caezFlagsOutput, s6, b5]);

        output.jcaezS4 = this.controlLogicCore.jump_caez_and1.getOutput();
        output.jcaezS5 = this.controlLogicCore.jump_caez_and2.getOutput();
        output.jcaezS6 = this.controlLogicCore.jump_caez_andM.getOutput();
        // console.log(output)
        return output;
    }

    private handleFlagInputs(flags: ByteMemory, inputs: [Bit, Bit, Bit, Bit]): Bit {
        const [b4, b5, b6, b7] = inputs;
        const [zero, equal, aLarger, carry] = flags.getData();
        this.controlLogicCore.flagZ_and.setInputs(zero, b7);
        this.controlLogicCore.flagE_and.setInputs(equal, b6);
        this.controlLogicCore.flagA_and.setInputs(aLarger, b5);
        this.controlLogicCore.flagC_and.setInputs(carry, b4);

        this.controlLogicCore.flags_Input_handle.setInputs([
            this.controlLogicCore.flagZ_and.getOutput(),
            this.controlLogicCore.flagE_and.getOutput(),
            this.controlLogicCore.flagA_and.getOutput(),
            this.controlLogicCore.flagC_and.getOutput()
        ]);
        return this.controlLogicCore.flags_Input_handle.getOutput();
    }

    private jumpAddressInstruction(decoderOutput: Byte, s4: Bit, s5: Bit): { jais4: Bit, jais5: Bit } {
        const output: { jais4: Bit, jais5: Bit } = { jais4: 0, jais5: 0 }

        const [b0, b1, b2, b3, b4, b5, b6, b7] = decoderOutput;

        this.controlLogicCore.jump_address_and1.setInputs(b4, s4);
        this.controlLogicCore.jump_address_and2.setInputs(b4, s5);

        output.jais4 = this.controlLogicCore.jump_address_and1.getOutput();
        output.jais5 = this.controlLogicCore.jump_address_and2.getOutput();

        // console.log(output)
        // console.log([b0, b1, b2, b3, b4, b5, b6, b7])

        return output;

    }

    private jumpRegisterInstruction(decoderOutput: Byte, s4: Bit): Bit {
        const [b0, b1, b2, b3, b4, b5, b6, b7] = decoderOutput;
        this.controlLogicCore.jump_register_and.setInputs(b3, s4);
        return this.controlLogicCore.jump_register_and.getOutput();
    }

    private dataInstruction(decoderOutput: Byte, s4: Bit, s5: Bit, s6: Bit): { dis4: Bit, dis5: Bit, dis6: Bit } {

        const output: { dis4: Bit, dis5: Bit, dis6: Bit } = { dis4: 0, dis5: 0, dis6: 0 };

        const [b0, b1, b2, b3, b4, b5, b6, b7] = decoderOutput;

        //s4
        this.controlLogicCore.data_instruction_and0.setInputs(s4, b2);
        output.dis4 = this.controlLogicCore.data_instruction_and0.getOutput();

        //s5
        this.controlLogicCore.data_instruction_and1.setInputs(s5, b2);
        output.dis5 = this.controlLogicCore.data_instruction_and1.getOutput();

        //s6
        this.controlLogicCore.data_instruction_and2.setInputs(s6, b2);
        output.dis6 = this.controlLogicCore.data_instruction_and2.getOutput();

        return output;
    }

    private loadStoreInstruction(decoderOutput: Byte, s4: Bit, s5: Bit): { lsis4: Bit, lsis5a: Bit, lsis5b: Bit } {

        const out: { lsis4: Bit, lsis5a: Bit, lsis5b: Bit } = { lsis4: 0, lsis5a: 0, lsis5b: 0 }

        const [b0, b1, b2, b3, b4, b5, b6, b7] = decoderOutput;

        //s4
        this.controlLogicCore.inner_decoder3x8_and0.setInputs(s4, b0); //load
        const loadAndOut_s4 = this.controlLogicCore.inner_decoder3x8_and0.getOutput();
        // console.log(decoderOutput)
        this.controlLogicCore.inner_decoder3x8_and1.setInputs(s4, b1); //store
        const storeAndOut_s4 = this.controlLogicCore.inner_decoder3x8_and1.getOutput();
        this.controlLogicCore.inner_decoder3x8_or.setInputs(loadAndOut_s4, storeAndOut_s4);

        out.lsis4 = this.controlLogicCore.inner_decoder3x8_or.getOutput();

        //s5 
        this.controlLogicCore.inner_decoder3x8_and2.setInputs(s5, b0); //load
        const loadAndOut_s5 = this.controlLogicCore.inner_decoder3x8_and2.getOutput();
        this.controlLogicCore.inner_decoder3x8_and3.setInputs(s5, b1); //store
        const storeAndOut_s5 = this.controlLogicCore.inner_decoder3x8_and3.getOutput();

        out.lsis5a = loadAndOut_s5; //load
        out.lsis5b = storeAndOut_s5; //store
        // console.log(out)
        return out;
    }

    private aluInstruction(irInputs: [Bit, Bit, Bit, Bit], s4: Bit, s5: Bit, s6: Bit): { ais4: Bit, ais5: Bit, ais6: Bit } {

        const output: { ais4: Bit, ais5: Bit, ais6: Bit } = { ais4: 0, ais5: 0, ais6: 0 }

        const [b0, b1, b2, b3] = irInputs;
        this.controlLogicCore.aluInstruction_step6_andGateM_opCode.setInputs([b1, b2, b3]);
        this.controlLogicCore.aluInstruction_step6_not.setInputs(
            this.controlLogicCore.aluInstruction_step6_andGateM_opCode.getOutput()
        );
        this.controlLogicCore.aluInstruction_step4_andGate.setInputs(s4, b0);
        this.controlLogicCore.aluInstruction_step5_andGate.setInputs(s5, b0);
        this.controlLogicCore.aluInstruction_step6_andGateM.setInputs([
            s6,
            b0,
            this.controlLogicCore.aluInstruction_step6_not.getOutput()
        ]);

        output.ais4 = this.controlLogicCore.aluInstruction_step4_andGate.getOutput();
        output.ais5 = this.controlLogicCore.aluInstruction_step5_andGate.getOutput();
        output.ais6 = this.controlLogicCore.aluInstruction_step6_andGateM.getOutput();

        return output;


    }

    private opCodeHandle(b0: Bit, opCode: [Bit, Bit, Bit], s5: Bit) {
        const [code0, code1, code2] = opCode;

        this.controlLogicCore.alu_0_andM.setInputs([b0, code0, s5]);
        this.controlLogicCore.alu_1_andM.setInputs([b0, code1, s5]);
        this.controlLogicCore.alu_2_andM.setInputs([b0, code2, s5]);

        this.alu.setInputs({
            ...this.alu.aluInput, decoderInputs: {
                a: this.controlLogicCore.alu_0_andM.getOutput(),
                b: this.controlLogicCore.alu_1_andM.getOutput(),
                c: this.controlLogicCore.alu_2_andM.getOutput()
            }
        })
    }

    private enableRegisters(inputs: [Bit, Bit, Bit, Bit], clke: Bit, regAins: Bit[], regBins: Bit[]) {
        const [b4, b5, b6, b7] = inputs;

        this.controlLogicCore.rA_OrmgatE.setInputs(regAins);
        const regA = this.controlLogicCore.rA_OrmgatE.getOutput();

        this.controlLogicCore.rB_OrmgatE.setInputs(regBins);
        const regB = this.controlLogicCore.rB_OrmgatE.getOutput();

        this.decoder45e_2x4_a.setInputs(b4, b5);
        const [a0, a1, a2, a3] = this.decoder45e_2x4_a.getOutput(); //LSB to MSB

        this.decoder67e_2x4_b.setInputs(b6, b7);
        const [b0, b1, b2, b3] = this.decoder67e_2x4_b.getOutput(); //LSB to MSB

        this.controlLogicCore.regA_enable_r0_andM.setInputs([a0, clke, regA]);
        this.controlLogicCore.regA_enable_r1_andM.setInputs([a1, clke, regA]);
        this.controlLogicCore.regA_enable_r2_andM.setInputs([a2, clke, regA]);
        this.controlLogicCore.regA_enable_r3_andM.setInputs([a3, clke, regA]);

        this.R[0].getDataOnBus(this.controlLogicCore.regA_enable_r0_andM.getOutput());
        this.R[1].getDataOnBus(this.controlLogicCore.regA_enable_r1_andM.getOutput());
        this.R[2].getDataOnBus(this.controlLogicCore.regA_enable_r2_andM.getOutput());
        this.R[3].getDataOnBus(this.controlLogicCore.regA_enable_r3_andM.getOutput());

        this.controlLogicCore.regB_enable_r0_andM.setInputs([b0, clke, regB]);
        this.controlLogicCore.regB_enable_r1_andM.setInputs([b1, clke, regB]);
        this.controlLogicCore.regB_enable_r2_andM.setInputs([b2, clke, regB]);
        this.controlLogicCore.regB_enable_r3_andM.setInputs([b3, clke, regB]);

        this.R[0].getDataOnBus(this.controlLogicCore.regB_enable_r0_andM.getOutput());
        this.R[1].getDataOnBus(this.controlLogicCore.regB_enable_r1_andM.getOutput());
        this.R[2].getDataOnBus(this.controlLogicCore.regB_enable_r2_andM.getOutput());
        this.R[3].getDataOnBus(this.controlLogicCore.regB_enable_r3_andM.getOutput());
    }

    private setRegisters(inputs: [Bit, Bit], clks: Bit, regBins: Bit[]) {
        const [b6, b7] = inputs;
        this.controlLogicCore.rB_OrmgatS.setInputs(regBins);
        const regB = this.controlLogicCore.rB_OrmgatS.getOutput();

        this.decoder67s_2x4_b.setInputs(b6, b7);
        const [b0, b1, b2, b3] = this.decoder67s_2x4_b.getOutput(); //LSB to MSB

        this.controlLogicCore.regB_set_r0_andM.setInputs([b0, clks, regB]);
        this.controlLogicCore.regB_set_r1_andM.setInputs([b1, clks, regB]);
        this.controlLogicCore.regB_set_r2_andM.setInputs([b2, clks, regB]);
        this.controlLogicCore.regB_set_r3_andM.setInputs([b3, clks, regB]);
        // console.log(regB)


        this.R[0].setInputs(this.controlLogicCore.regB_set_r0_andM.getOutput());
        this.R[1].setInputs(this.controlLogicCore.regB_set_r1_andM.getOutput());
        this.R[2].setInputs(this.controlLogicCore.regB_set_r2_andM.getOutput());
        this.R[3].setInputs(this.controlLogicCore.regB_set_r3_andM.getOutput());

        // if (this.controlLogicCore.regB_set_r0_andM.getOutput() == 1) console.log("r0")
        // if (this.controlLogicCore.regB_set_r1_andM.getOutput() == 1) console.log("r1")
        // if (this.controlLogicCore.regB_set_r2_andM.getOutput() == 1) console.log("r2")
        // if (this.controlLogicCore.regB_set_r3_andM.getOutput() == 1) console.log("r3")
    }

    private enableBus1(inputs: Bit[]) {
        this.controlLogicCore.bus1_OrmE.setInputs(inputs)
        this.bus1.setInputs(this.controlLogicCore.bus1_OrmE.getOutput());
    }

    private setACC(inputs: Bit[], clks: Bit) {
        this.controlLogicCore.acc_OrmGateS.setInputs(inputs)
        this.controlLogicCore.acc_andGateS.setInputs(this.controlLogicCore.acc_OrmGateS.getOutput(), clks);
        this.acc.setInputsFromAlu(this.controlLogicCore.acc_andGateS.getOutput());
    }
    private enableACC(inputs: Bit[], clke: Bit) {
        this.controlLogicCore.acc_OrmGateE.setInputs(inputs)
        this.controlLogicCore.acc_andGateE.setInputs(this.controlLogicCore.acc_OrmGateE.getOutput(), clke);
        this.acc.getDataOnBus(this.controlLogicCore.acc_andGateE.getOutput());
    }

    private setMAR(inputs: Bit[], clks: Bit) {
        this.controlLogicCore.mar_OrmGate.setInputs(inputs);
        this.controlLogicCore.mar_andGateS.setInputs(this.controlLogicCore.mar_OrmGate.getOutput(), clks);
        this.ram.setMarInputs(this.controlLogicCore.mar_andGateS.getOutput());
    }

    private enableIAR(inputs: Bit[], clke: Bit) {
        this.controlLogicCore.iar_OrmE.setInputs(inputs);
        this.controlLogicCore.iar_andGateE.setInputs(clke, this.controlLogicCore.iar_OrmE.getOutput())
        this.iar.getDataOnBus(this.controlLogicCore.iar_andGateE.getOutput());
    }

    private setIAR(inputs: Bit[], clks: Bit) {
        this.controlLogicCore.iar_OrmS.setInputs(inputs);
        this.controlLogicCore.iar_andGateS.setInputs(clks, this.controlLogicCore.iar_OrmS.getOutput())
        this.iar.setInputs(this.controlLogicCore.iar_andGateS.getOutput());
    }

    private enableRAM(inputs: Bit[], clke: Bit) {
        this.controlLogicCore.ram_OrmGateE.setInputs(inputs);
        this.controlLogicCore.ram_andGateE.setInputs(this.controlLogicCore.ram_OrmGateE.getOutput(), clke);
        this.ram.setOnBus(this.controlLogicCore.ram_andGateE.getOutput()); //Manually set write flag to 0
    }

    private enableCarry(C: Bit) {
        const zercarryo: Bit = this.carryIn.getOutput();
        this.controlLogicCore.enableCarry_and.setInputs(C, zercarryo);

        this.alu.setCarryIn(this.controlLogicCore.enableCarry_and.getOutput());
    }

    private setRAM(inputs: Bit[], clks: Bit) {
        this.controlLogicCore.ram_OrmGateS.setInputs(inputs);
        this.controlLogicCore.ram_andGateS.setInputs(this.controlLogicCore.ram_OrmGateS.getOutput(), clks);
        this.ram.setInRam(this.controlLogicCore.ram_andGateS.getOutput()); //Manually set write flag to 0
    }

    private setIR(inputs: Bit[], clks: Bit) {
        this.controlLogicCore.ir_OrmGate.setInputs(inputs)
        this.controlLogicCore.ir_andGateS.setInputs(this.controlLogicCore.ir_OrmGate.getOutput(), clks);
        this.ir.setInputs(this.controlLogicCore.ir_andGateS.getOutput());
    }

    private setTMP(a: Bit, clks: Bit) {
        this.controlLogicCore.tmp_andGateS.setInputs(a, clks);
        this.tmp.setInputs(
            this.controlLogicCore.tmp_andGateS.getOutput()
        );

        this.carryIn.setInputs(a, 
            this.flags.getData()[3]
        )
    }

    private setFLAGS(inputs: Bit[], clks: Bit) {

        this.controlLogicCore.flags_OrmGateS.setInputs(inputs);
        this.controlLogicCore.flags_and.setInputs(
            clks,
            this.controlLogicCore.flags_OrmGateS.getOutput()
        );

        const setFlags = this.controlLogicCore.flags_and.getOutput();

        const zero = this.alu.getOutput().zero;
        const equal = this.alu.getOutput().equal;
        const aLarger = this.alu.getOutput().aLarger;
        const carry = this.alu.getOutput().carryOut;

        this.flags.setInputsFromNonBus([zero, equal, aLarger, carry, 0, 0, 0, 0], setFlags);
    }




    getOutput() {
        return this;
    }
}
