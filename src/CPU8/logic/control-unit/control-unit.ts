
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
    }

    setInputs(clockInput: [Bit, Bit, Bit]) {
        const [clk, clke, clks] = clockInput;
        const [b0, b1, b2, b3, b4, b5, b6, b7] = this.ir.getData();

        this.stepper.setInputs(clk);
        const [s1, s2, s3, s4, s5, s6] = this.stepper.getOutput();


        //####### OP CODE
        this.opCodeHandle(b0, [b1, b2, b3], s5);

        //####### ALU INSTRUCTION
        const { out4, out5, out6 } = this.aluInstruction([b0, b1, b2, b3], s4, s5, s6);

        //###### 

        this.inner_decoder3x8.setInputs(b1, b2, b3);
        this.inner_decoder3x8_not.setInputs(b0);
        const decoderOutput: Byte = this.inner_decoder3x8_enable.getData(
            this.inner_decoder3x8.getOutput(),
            this.inner_decoder3x8_not.getOutput()
        );
        const { s4out, s5outA, s5outB } = this.loadStoreInstruction(decoderOutput, s4, s5);
        // if(b0 === 0){console.log(decoderOutput)}

        //####### ENABLE
        this.enableRegisters([b4, b5, b6, b7], clke, [out5, s4out], [out4, s5outB]);
        this.enableBus1([s1]);
        this.enableIAR([s1], clke);
        this.enableRAM([s2, s5outA], clke);
        this.enableACC([s3, out6], clke);

        //####### SET
        this.setRegisters([b6, b7], clks, [out6, s5outA]);
        this.setMAR([s1, s4out], clks);
        this.setACC([s1, out5], clks);
        this.setIR([s2], clks);
        this.setIAR([s3], clks);
        this.tmpS(out4, clks);
        this.setRAM([s5outB], clks);
    }

    public debugDetails(){
        const [s1, s2, s3, s4, s5, s6] = this.stepper.getOutput();
        console.log([s1, s2, s3, s4, s5, s6])
    }

    private loadStoreInstruction(decoderOutput: Byte, s4: Bit, s5: Bit): { s4out: Bit, s5outA: Bit, s5outB: Bit } {

        const out: { s4out: Bit, s5outA: Bit, s5outB: Bit } = { s4out: 0, s5outA: 0, s5outB: 0 }

        const [b0, b1, b2, b3, b4, b5, b6, b7] = decoderOutput;

        //s4
        this.controlLogicCore.inner_decoder3x8_and0.setInputs(s4, b0); //load
        const loadAndOut_s4 = this.controlLogicCore.inner_decoder3x8_and0.getOutput();
        // console.log(decoderOutput)
        this.controlLogicCore.inner_decoder3x8_and1.setInputs(s4, b1); //store
        const storeAndOut_s4 = this.controlLogicCore.inner_decoder3x8_and1.getOutput();
        this.controlLogicCore.inner_decoder3x8_or.setInputs(loadAndOut_s4, storeAndOut_s4);

        out.s4out = this.controlLogicCore.inner_decoder3x8_or.getOutput();

        //s5 
        this.controlLogicCore.inner_decoder3x8_and2.setInputs(s5, b0); //load
        const loadAndOut_s5 = this.controlLogicCore.inner_decoder3x8_and2.getOutput();
        this.controlLogicCore.inner_decoder3x8_and3.setInputs(s5, b1); //store
        const storeAndOut_s5 = this.controlLogicCore.inner_decoder3x8_and3.getOutput();

        out.s5outA = loadAndOut_s5; //load
        out.s5outB = storeAndOut_s5; //store
        // console.log(out)
        return out;
    }

    private aluInstruction(irInputs: [Bit, Bit, Bit, Bit], s4: Bit, s5: Bit, s6: Bit): { out4: Bit, out5: Bit, out6: Bit } {
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

        return ({
            out4: this.controlLogicCore.aluInstruction_step4_andGate.getOutput(),
            out5: this.controlLogicCore.aluInstruction_step5_andGate.getOutput(),
            out6: this.controlLogicCore.aluInstruction_step6_andGateM.getOutput()
        });


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

    private tmpS(a: Bit, clks: Bit) {
        this.controlLogicCore.tmp_andGateS.setInputs(a, clks);
        this.tmp.setInputs(
            this.controlLogicCore.tmp_andGateS.getOutput()
        );
    }




    // private 


    // private fetchPhase(stepperOutput: [Bit, Bit, Bit, Bit, Bit, Bit], irOutput: Byte, clockInput: [Bit, Bit, Bit]) {
    //     const [clk, clke, clks] = clockInput;
    //     const [b0, b1, b2, b3, b4, b5, b6, b7] = irOutput;


    //     const [s1, s2, s3, s4, s5, s6] = stepperOutput;

    //     // console.log("IR",[b0, b1, b2, b3, b4, b5, b6, b7])

    //     const clc: ControlLogicCore = this.controlLogicCore;

    //     // const bus1_OrmE = this.getOrmGate('bus1_OrmE');
    //     // const iar_OrmE = this.getOrmGate('iar_OrmE');
    //     // const iar_OrmS = this.getOrmGate('iar_OrmS');
    //     // const mar_OrmGate = this.getOrmGate('mar_OrmGate');
    //     // const acc_OrmGateE = this.getOrmGate('acc_OrmGateE');
    //     // const acc_OrmGateS = this.getOrmGate('acc_OrmGateS');
    //     // const ram_OrmGate = this.getOrmGate('ram_OrmGate');
    //     // const ir_OrmGate = this.getOrmGate('ir_OrmGate');
    //     // const ra_OrmgatE = this.getOrmGate('ra_OrmgatE');
    //     // const ra_OrmgatS = this.getOrmGate('ra_OrmgatS');

    //     // const x = this.orm.get('ir_OrmGate');
    //     // console.log('xxxxx', x)
    //     // x?.setInputs

    //     // const iar_andGateE = this.getAndGate('iar_andgateE');
    //     // const iar_andGateS = this.getAndGate('iar_andgateS');
    //     // const mar_andGate = this.getAndGate('mar_andgate');
    //     // const acc_andGateE = this.getAndGate('acc_andgateE');
    //     // const acc_andGateS = this.getAndGate('acc_andgateS');
    //     // const ram_andGate = this.getAndGate('ram_andgate');
    //     // const ir_andGate = this.getAndGate('ir_andgate');


    //     //SELECT REGISTERS

    //     //STEP 1


    //     clc.bus1_OrmE.setInputs([s1])
    //     this.bus1.setInputs(clc.bus1_OrmE.getOutput());

    //     clc.iar_OrmE.setInputs([s1]);
    //     clc.iar_andGateE.setInputs(clke, clc.iar_OrmE.getOutput())
    //     this.iar.getDataOnBus(clc.iar_andGateE.getOutput());


    //     clc.mar_OrmGate.setInputs([s1]);
    //     clc.mar_andGate.setInputs(clc.mar_OrmGate.getOutput(), clks);
    //     this.ram.setMarInputs(clc.mar_andGate.getOutput());

    //     clc.acc_OrmGateS.setInputs([s1])
    //     clc.acc_andGateS.setInputs(clc.acc_OrmGateS.getOutput(), clks);
    //     this.acc.setInputsFromAlu(clc.acc_andGateS.getOutput());
    //     // console.log([s1, s2, s3, s4, s5, s6])
    //     // console.log([clk, clke, clks])





    //     //STEP 2

    //     clc.ram_OrmGate.setInputs([s2]);
    //     clc.ram_andGate.setInputs(clc.ram_OrmGate.getOutput(), clke);
    //     this.ram.setOnBus(clc.ram_andGate.getOutput()); //Manually set write flag to 0

    //     clc.ir_OrmGate.setInputs([s2])
    //     clc.ir_andGate.setInputs(clc.ir_OrmGate.getOutput(), clks);
    //     this.ir.setInputs(clc.ir_andGate.getOutput());
    //     // console.log('2', this.ram.getMarOutput())





    //     //STEP 3

    //     clc.acc_OrmGateE.setInputs([s3])
    //     clc.acc_andGateE.setInputs(clc.acc_OrmGateE.getOutput(), clke);
    //     this.acc.getDataOnBus(clc.acc_andGateE.getOutput());

    //     clc.iar_OrmS.setInputs([s3]);
    //     clc.iar_andGateS.setInputs(clks, clc.iar_OrmS.getOutput())
    //     this.iar.setInputs(clc.iar_andGateS.getOutput());

    //     // if(s4 === 1){
    //     //     console.log('4', this.ram.getMarOutput())
    //     // }
    //     // if(s5 === 1){
    //     //     console.log('5', this.ram.getMarOutput())
    //     // }
    //     // if(s6 === 1){
    //     //     console.log('6', this.ram.getMarOutput())
    //     // }

    // }

    getOutput() {
        return this;
    }
}
