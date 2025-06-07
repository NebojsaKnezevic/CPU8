import type { Bit, Byte } from "../../interface/interfaces";
import { NotGate, OrGate } from "./logic-gates";


export class ZeroDetector8{
    private or: OrGate[];
    private not: NotGate;

    constructor() {
        this.or = Array.from({ length: 7 }, () => new OrGate());
        this.not = new NotGate();
    }

    setInput(input: Byte) {

        this.or[6].setInputs(input[7], input[6]);
        for (let i = 5; i >= 0; i--) {
            this.or[i].setInputs(this.or[i + 1].getOutput(), input[i]);
        }

        this.not.setInputs(this.or[0].getOutput());
    }

    getOutput(): Bit {
        return this.not.getOutput(); 
    }
}