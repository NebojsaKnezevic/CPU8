import type { Bit, Byte } from "../../interface/interfaces";
import { AndGate, NotGate, OrGate } from "../logic/logic-gates";


export class Bus1{
    private ands: AndGate[];
    private not: NotGate;
    private or: OrGate;


    constructor(){
        this.ands = Array.from({length: 7}, () => new AndGate());
        this.not = new NotGate();
        this.or = new OrGate();
    }

    setInputs(a: Byte, s: Bit = 0){
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
    
        return output;
    }
}