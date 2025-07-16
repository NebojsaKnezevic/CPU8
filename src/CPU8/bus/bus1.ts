// import type { Bit, Byte } from "../../interface/interfaces";
// import { Adder } from "../logic/adder";
// import { AndGate, AndGateM, NotGate, OrGate } from "../logic/logic-gates";
// import { Shl } from "../logic/shl";
// import { EnableGate } from "../memory/enable-gate";
// import { Register } from "../memory/register";
// import { Bus } from "./bus";


// export class Bus1{
//     private ands: AndGate[];
//     private not: NotGate;
//     // private or: OrGate;
//     private andM: AndGateM;
//     private or1: OrGate;
//     private adder: Adder;
//     private notCarry: NotGate;
//     private tmp: Register;



   
//     private output: Byte = [0,0,0,0,0,0,0,0];

//     constructor(r: Register){
//         this.ands = Array.from({length: 6}, () => new AndGate());
//         this.not = new NotGate();
//         this.notCarry = new NotGate();
//         this.andM = new AndGateM();
//         this.or1 = new OrGate();
//         this.adder = new Adder();
//         this.tmp = r;
//     }

//     setInputs( s: Bit = 0, double: Bit = 0){
//         this.adder.setInputs(s,double);
//         const [sum, carry] = this.adder.getOutput(); 
//         this.notCarry.setInputs(carry);
//         const notCarry = this.notCarry.getOutput();
        
//         const a = this.tmp.getData();
//         this.not.setInputs(sum);
//         const nots = this.not.getOutput();
//         this.andM.setInputs([a[a.length - 1], sum, notCarry]);
//         this.or1.setInputs(a[a.length - 2], carry);
//         for (let i = a.length - 3; i >= 0; i--){
//             this.ands[i].setInputs(a[i], nots);
//         }

//         //prepare 1 as output
//         let output: Byte = [0,0,0,0,0,0,0,0];
    
//         for (let i = 0; i < this.ands.length; i++) {
//             output[i] = (this.ands[i].getOutput());
//         }
    
//         output[output.length - 1] = (this.andM.getOutput()); 
//         output[output.length - 2] = (this.or1.getOutput()); 
//         this.output = output;

//     }

//     setInputsTest(a: Byte, s: Bit = 0){
//         this.not.setInputs(s);
//         const nots = this.not.getOutput();
//         this.or.setInputs(a[a.length - 1], s);
//         for (let i = a.length - 2; i >= 0; i--){
//             this.ands[i].setInputs(a[i], nots);
//         }
//         let output: Byte = [0,0,0,0,0,0,0,0];
    
//         for (let i = 0; i < this.ands.length; i++) {
//             output[i] = (this.ands[i].getOutput());
//         }
    
//         output[output.length - 1] = (this.or.getOutput()); // poslednji bit (a[7]) tretiran posebno
//         this.output = output;
//     }

//     getOutput(): Byte {
        
//         // console.log("bus1 out", output)
//         return this.output;
//     }
// }

import type { Bit, Byte } from "../../interface/interfaces";
import { AndGate, NotGate, OrGate } from "../logic/logic-gates";
import { Register } from "../memory/register";


export class Bus1{
    private ands: AndGate[];
    private not: NotGate;
    private or: OrGate;
    private tmp: Register;

    constructor(r: Register){
        this.ands = Array.from({length: 7}, () => new AndGate());
        this.not = new NotGate();
        this.or = new OrGate();
        this.tmp = r;
    }

    setInputs( s: Bit = 0){
        const a = this.tmp.getData();
        this.not.setInputs(s);
        const nots = this.not.getOutput();
        this.or.setInputs(a[a.length - 1], s);
        for (let i = a.length - 2; i >= 0; i--){
            this.ands[i].setInputs(a[i], nots);
        }
        // this.getOutput();
    }

    setInputsTest(a: Byte, s: Bit = 0){
        this.not.setInputs(s);
        const nots = this.not.getOutput();
        this.or.setInputs(a[a.length - 1], s);
        for (let i = a.length - 2; i >= 0; i--){
            this.ands[i].setInputs(a[i], nots);
        }
    }

    getOutput(): Byte {
        let output: Byte = [0,0,0,0,0,0,0,0];
    
        for (let i = 0; i < this.ands.length; i++) {
            output[i] = (this.ands[i].getOutput());
        }
    
        output[output.length - 1] = (this.or.getOutput()); // poslednji bit (a[7]) tretiran posebno
        // console.log("bus1 out", output)
        return output;
    }
}