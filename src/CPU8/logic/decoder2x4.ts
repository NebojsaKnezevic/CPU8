import type { Bit, Nibble } from "../../interface/interfaces";
import { AndGate, NandGate, NotGate } from "./logic-gates";

export class Decoder2x4 {
    private a: Bit = 0;
    private b: Bit = 0;

    private na: Bit = 0;
    private nb: Bit = 0;

    private and00: AndGate;
    private and01: AndGate;
    private and10: AndGate;
    private and11: AndGate;

    constructor() {
        this.and00 = new AndGate();
        this.and01 = new AndGate();
        this.and10 = new AndGate();
        this.and11 = new AndGate();
    }

    setInputs(a: Bit, b: Bit) {
        this.a = a;
        this.b = b;

        const na = new NotGate();
        na.setInputs(a);
        this.na = na.getOutput();

        const nb = new NotGate();
        nb.setInputs(b);
        this.nb = nb.getOutput();
    }

    getOutput(): Nibble {
        this.and00.setInputs(this.na, this.nb);
        this.and01.setInputs(this.na, this.b);
        this.and10.setInputs(this.a, this.nb);
        this.and11.setInputs(this.a, this.b);
        return [
            this.and00.getOutput(), 
            this.and01.getOutput(),
            this.and10.getOutput(),
            this.and11.getOutput()
        ];
    }
}