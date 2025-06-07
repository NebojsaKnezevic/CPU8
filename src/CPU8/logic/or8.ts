import { WORD_WIDTH } from "../../constants/config";
import type { Byte } from "../../interface/interfaces";
import {  OrGate } from "./logic-gates";


export class Or8{
    private out: OrGate[];

    constructor(){
        this.out = Array.from({length: WORD_WIDTH}, () => new OrGate());
    }

    setInputs(a: Byte, b: Byte){
        for (let i = this.out.length - 1; i >= 0; i--) {
            this.out[i].setInputs(a[i], b[i]);
        }
    }

    getOutput(): Byte{
        return this.out.map(or => or.getOutput()) as Byte;
    }
}