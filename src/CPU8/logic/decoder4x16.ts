import type { Bit, Byte, Word } from "../../interface/interfaces";
import { Decoder3x8 } from "./decoder3x8";
import { AndGate, NotGate } from "./logic-gates";

export class Decoder4x16 {
    private a: Bit = 0;
    private b: Bit = 0;
    private c: Bit = 0;
    private d: Bit = 0;

    private notA: Bit = 0;

    private decoderLow: Decoder3x8;
    private decoderHigh: Decoder3x8;

    constructor() {
        this.decoderLow = new Decoder3x8();
        this.decoderHigh = new Decoder3x8();
    }

    setInputs(a: Bit, b: Bit, c: Bit, d: Bit) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;

        const notGate = new NotGate();
        notGate.setInputs(a);
        this.notA = notGate.getOutput();

        this.decoderLow.setInputs(b, c, d);
        this.decoderHigh.setInputs(b, c, d);
    }

    getOutput(): Word {
        const lowOutputs = this.decoderLow.getOutput();  // Y0–Y7
        const highOutputs = this.decoderHigh.getOutput(); // Y8–Y15

        const result: Word = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

        for (let i = 0; i < 8; i++) {
            const andLow = new AndGate();
            andLow.setInputs(this.notA, lowOutputs[i]);
            result[i] = andLow.getOutput();

            const andHigh = new AndGate();
            andHigh.setInputs(this.a, highOutputs[i]);
            result[i + 8] = andHigh.getOutput();
        }

        return result;
    }
}
