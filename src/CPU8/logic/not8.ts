import { WORD_WIDTH } from "../../constants/config";
import type { Byte } from "../../interface/interfaces";
import { NotGate } from "./logic-gates";


export class Not8{
    private not: NotGate[]; 

    constructor(){
        this.not = Array.from({length: WORD_WIDTH}, () => new NotGate())
    }

    setInputs(a: Byte){
        for (let i = this.not.length - 1; i >= 0; i--) {
         
          this.not[i].setInputs(a[i]);
        }
    }

    getOutput(): Byte{
        return this.not.map(not => not.getOutput()) as Byte
    }
}