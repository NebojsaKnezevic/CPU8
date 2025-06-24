
import type { Bit } from "../../../interface/interfaces";
import { Bus1 } from "../../bus/bus1";
import type { Clock } from "../../clock/clock";
import { Ram } from "../../memory/ram";
import { Register } from "../../memory/register";
import { Alu } from "../alu";
import { AndGate, AndGateM, OrGate, OrGateM } from "../logic-gates";
import { Stepper } from "./stepper";




export class ControlUnit {
    private R: Register[];
    private tmp: Register;
    private bus1: Bus1;

    private alu: Alu;
    private acc: Register;

    private iar: Register;
    private ir: Register;

    private ram: Ram;

    // private clock: Clock;
    private stepper: Stepper;

    private and: Map<string, AndGate>;
    private or: OrGate[] = [];

    private andm: AndGateM[] = [];
    private orm: OrGateM[] = [];

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
        this.and = new Map();
    }

    setInputs(clockInput: [Bit, Bit, Bit]) {
        // console.log('clock', clockInput)
        const [clk, clke, clks] = clockInput;
        const [b0, b1, b2, b3, b4, b5, b6, b7] = this.ir.getData();

        this.stepper.setInputs(clk);
        const [s1, s2, s3, s4, s5, s6] = this.stepper.getOutput();

        console.log("IR",[b0, b1, b2, b3, b4, b5, b6, b7])

        const iar_andGateE = this.getAndGate('iar_andgateE');
        const iar_andGateS = this.getAndGate('iar_andgateS');
        const mar_andGate = this.getAndGate('mar_andgate');
        const acc_andGateE = this.getAndGate('acc_andgateE');
        const acc_andGateS = this.getAndGate('acc_andgateS');
        const ram_andGate = this.getAndGate('ram_andgate');
        const ir_andGate = this.getAndGate('ir_andgate');
        



        //STEP 1
        if (s1 === 1) {
            this.bus1.setInputs(s1);

            iar_andGateE?.setInputs(clke, s1)
            if (iar_andGateE?.getOutput() === 1) this.iar.getDataOnBus(iar_andGateE.getOutput());
            

            mar_andGate?.setInputs(s1, clks);
            if (mar_andGate?.getOutput() === 1) this.ram.setMarInputs(mar_andGate.getOutput());

            acc_andGateS?.setInputs(s1, clks);
            if (acc_andGateS?.getOutput() === 1) this.acc.setInputsFromAlu(acc_andGateS.getOutput());
            // console.log([s1, s2, s3, s4, s5, s6])
            // console.log([clk, clke, clks])
        }




        //STEP 2
        if (s2 === 1) {
            ram_andGate?.setInputs(s2, clke);
            if (ram_andGate?.getOutput() === 1) this.ram.setOnBus(ram_andGate.getOutput()); //Manually set write flag to 0
      
            ir_andGate?.setInputs(s2, clks);
            if (ir_andGate?.getOutput() === 1) this.ir.setInputs(ir_andGate.getOutput());
            // console.log('2', this.ram.getMarOutput())
        }




        //STEP 3
        if (s3 === 1) {
            acc_andGateE?.setInputs(s3, clke);
            if (acc_andGateE?.getOutput() === 1) this.acc.getDataOnBus(acc_andGateE.getOutput());
            // console.log(this.acc.getData())
            //  console.log('3',[clk, clke, clks])
            iar_andGateS?.setInputs(clks, s3)
            if (iar_andGateS?.getOutput() === 1) this.iar.setInputs(iar_andGateS.getOutput());
            // console.log('3', this.ram.getMarOutput())
            // console.log('iar', this.iar.getData())
            // console.log('acc', this.acc.getData())
            // console.log('alu', this.alu.getOutput().out)
        }
        // if(s4 === 1){
        //     console.log('4', this.ram.getMarOutput())
        // }
        // if(s5 === 1){
        //     console.log('5', this.ram.getMarOutput())
        // }
        // if(s6 === 1){
        //     console.log('6', this.ram.getMarOutput())
        // }

    }

    private getAndGate(key: string) {
        if (!this.and.has(key)) {
            this.and.set(key, new AndGate());
        }
        return this.and.get(key);
    }

    getOutput() {
        return this;
    }
}
