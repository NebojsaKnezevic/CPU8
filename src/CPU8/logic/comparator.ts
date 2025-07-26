import type { Bit } from "../../interface/interfaces";
import { AndGate, AndGateM, NotGate, OrGate, XorGate } from "./logic-gates";




export class Comparator{
    private xor: XorGate;
    private not: NotGate;
    private andm: AndGateM;
    private and: AndGate;
    private or: OrGate;


    constructor(){
        this.not = new NotGate();
        this.and = new AndGate();
        this.xor = new XorGate();
        this.andm = new AndGateM();
        this.or = new OrGate();
    }

    setInputs(a: Bit, b: Bit, aboveEqual: Bit = 1, aLarger: Bit = 0){

        this.xor.setInputs(a,b);
        const xorOutput = this.xor.getOutput(); // c

        this.not.setInputs(xorOutput);
        const noXorOutput = this.not.getOutput();

        this.and.setInputs(aboveEqual, noXorOutput); // equal

        this.andm.setInputs([aboveEqual, xorOutput, a]); 
        const andmOutput = this.andm.getOutput();

        this.or.setInputs(andmOutput, aLarger); // a larger

    }

    getOutput(): [Bit,Bit,Bit]{
        return[
            this.and.getOutput(),    
            this.or.getOutput(),    
            this.xor.getOutput(),      
        ];
    }
}