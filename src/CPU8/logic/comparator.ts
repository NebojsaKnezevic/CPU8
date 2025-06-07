import type { Bit } from "../../interface/interfaces";
import { AndGate, NotGate, XorGate } from "./logic-gates";




export class Comparator{
    private not: [NotGate, NotGate];
    private and: [AndGate, AndGate];
    private xor: XorGate;

    constructor(){
        this.not = Array.from({length: 2}, ()=> new NotGate()) as [NotGate, NotGate];
        this.and = Array.from({length: 2}, ()=> new AndGate()) as [AndGate, AndGate];
        this.xor = new XorGate();
    }

    setInputs(a: Bit, b: Bit){
        this.not[0].setInputs(a);
        const na = this.not[0].getOutput();

        this.not[1].setInputs(b);
        const nb = this.not[1].getOutput();

        this.and[0].setInputs(na, b);
        this.and[1].setInputs(a, nb);

        const and1 = this.and[0].getOutput();
        const and2 = this.and[1].getOutput();

        this.xor.setInputs(and1, and2);

    }

    getOutput(): [Bit,Bit,Bit]{
        return[
            this.and[0].getOutput(),    // A < b
            this.and[1].getOutput(),    // A > b
            this.xor.getOutput(),       // A != b
        ];
    }
}