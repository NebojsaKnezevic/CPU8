import type { Bit, Nibble } from "../../interface/interfaces";
import { OrGate } from "./logic-gates";



export class Or4Way{
    private or: OrGate[];

    constructor(){
        this.or = Array.from({length:3}, () => new OrGate())
    }

    setInputs(input: Nibble){
        this.or[2].setInputs(input[3], input[2]);
        const orOut = this.or[2].getOutput();

        this.or[1].setInputs(orOut, input[1]);
        const orOut1 = this.or[1].getOutput();

        this.or[0].setInputs(orOut1, input[0]);
    }

    getOutput(): Bit{
        return this.or[0].getOutput();
    }
}