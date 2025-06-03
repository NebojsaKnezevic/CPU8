import type { Bit, Byte } from "../../interface/interfaces";
import { Decoder2x4 } from "./decoder2x4";
import { AndGate, NotGate } from "./logic-gates";

export class Decoder3x8 {
    private a: Bit = 0;
    private b: Bit = 0;
    private c: Bit = 0;

    private na: Bit = 0;

    private decoder2x4_1: Decoder2x4;
    private decoder2x4_2: Decoder2x4;


    constructor() {
        this.decoder2x4_1 = new Decoder2x4();
        this.decoder2x4_2 = new Decoder2x4();
    }

    setInputs(a: Bit, b: Bit, c: Bit) {
        this.a = a;
        this.b = b;
        this.c = c;

        const na = new NotGate();
        na.setInputs(a);
        this.na = na.getOutput();

        this.decoder2x4_1.setInputs(b,c);
        this.decoder2x4_2.setInputs(b,c);
    }

    getOutput(): Byte {
        const decoder2x4_1 = this.decoder2x4_1.getOutput();
        const decoder2x4_2 = this.decoder2x4_2.getOutput();

        const result: Byte = [0,0,0,0,0,0,0,0]; 

        for (let i = 0; i < 4; i++) {
            const and1 = new AndGate();
            and1.setInputs(this.na, decoder2x4_1[i]);
            result[i] = and1.getOutput();

            const and2 = new AndGate();
            and2.setInputs(this.a, decoder2x4_2[i]);
            result[i + 4] = and2.getOutput();
            
        }
        
        return result;
    }
}