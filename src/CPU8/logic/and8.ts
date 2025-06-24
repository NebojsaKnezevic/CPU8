import { WORD_WIDTH } from "../../constants/config";
import type { Byte, IBasic8 } from "../../interface/interfaces";
import { AndGate } from "./logic-gates";


export class And8 implements IBasic8{
    private out: AndGate[];

    constructor(){
        this.out = Array.from({length: WORD_WIDTH}, () => new AndGate());
    }

    setInputs(a: Byte, b: Byte){
        for (let i = this.out.length - 1; i >= 0; i--) {
            this.out[i].setInputs(a[i], b[i]);
        }
    }

    getOutput(): Byte{
        return this.out.map(and => and.getOutput()) as Byte;
    }
}