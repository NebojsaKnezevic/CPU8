import { WORD_WIDTH } from "../../constants/config";
import type { Bit, Byte } from "../../interface/interfaces";
import { Adder } from "./adder";


export class Adder8 {
    private out: Byte;
    private carry: Bit;

    private adders: Adder[];

    constructor() {
        this.out = [0, 0, 0, 0, 0, 0, 0, 0];
        this.carry = 0;

        this.adders = Array.from({ length: WORD_WIDTH }, () => new Adder())
    }

    setInputs(a: Byte, b: Byte, c: Bit = 0) {
        this.out = [0, 0, 0, 0, 0, 0, 0, 0];
        let currentCarry: Bit = c;
        
        for (let i = this.adders.length - 1; i >=  0; i--) {
            this.adders[i].setInputs(a[i],b[i],currentCarry)
            const [sum, newCarry] = this.adders[i].getOutput();
            this.out[i] = sum;
            currentCarry = newCarry;
        }

        this.carry = currentCarry;
    }

    getOutput(): [Byte, Bit] {
        return [this.out, this.carry];
    }
}