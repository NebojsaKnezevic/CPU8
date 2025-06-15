import type { Bit } from "../../../interface/interfaces";
import { BitMemory } from "../../memory/bit-memory";
import { NotGate } from "../logic-gates";



export class Counter {
    private bits: BitMemory[];
    private not: NotGate;

    constructor() {
        this.bits = Array.from({ length: 12 }, () => new BitMemory());
        this.not = new NotGate();

    }

    //first cklin then input!!!!
    setInputs(clkin: Bit, input: Bit = 1) {
        this.not.setInputs(clkin);
        let notclk: Bit = this.not.getOutput();

        this.bits[0].setInputs(notclk, input);
        this.bits[1].setInputs(clkin, this.bits[0].getOutput());
        this.bits[2].setInputs(notclk, this.bits[1].getOutput());
        this.bits[3].setInputs(clkin, this.bits[2].getOutput());
        this.bits[4].setInputs(notclk, this.bits[3].getOutput());
        this.bits[5].setInputs(clkin, this.bits[4].getOutput());
        this.bits[6].setInputs(notclk, this.bits[5].getOutput());
        this.bits[7].setInputs(clkin, this.bits[6].getOutput());
        this.bits[8].setInputs(notclk, this.bits[7].getOutput());
        this.bits[9].setInputs(clkin, this.bits[8].getOutput());
        this.bits[10].setInputs(clkin, this.bits[9].getOutput());
        this.bits[11].setInputs(notclk, this.bits[10].getOutput());

    }

    getOutput(): [Bit, Bit, Bit, Bit, Bit, Bit] {
        return this.bits.filter((b, i) => i % 2 !== 0).map(b => b.getOutput()) as [Bit, Bit, Bit, Bit, Bit, Bit];

    }

}