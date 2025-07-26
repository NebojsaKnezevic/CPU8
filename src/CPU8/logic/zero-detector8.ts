import type { Bit, Byte } from "../../interface/interfaces";
import { NotGate, OrGate, OrGateM } from "./logic-gates";


export class ZeroDetector8{
    private or: OrGateM;
    private not: NotGate;

    constructor() {
        this.or = new OrGateM();
        this.not = new NotGate();
    }

    setInput(input: Byte) {

        this.or.setInputs(input);

        this.not.setInputs(this.or.getOutput());
    }

    getOutput(): Bit {
        return this.not.getOutput(); 
    }
}