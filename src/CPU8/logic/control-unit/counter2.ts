import type { Bit } from "../../../interface/interfaces";
import { BitMemory } from "../../memory/bit-memory";
import { NotGate, OrGate } from "../logic-gates";

/** 
 * Interface for a 12-bit counter
 */
export interface ICounter2 {
    /**
     * Set inputs for the counter
     * @param clkin Clock input
     */
    setInputs(clkin: Bit): void;

    /**
     * Get output bits (every other bit) for total of 6
     */
    getOutput(): [Bit, Bit, Bit, Bit, Bit, Bit];

    // /**
    //  * Log full internal data
    //  */
    // getData(): void;
}

/**
 * 12-bit counter with even/odd logic
 */
export class Counter2 implements ICounter2 {
    private bits: BitMemory[];
    private not: NotGate;
    private not1: NotGate;
    private or: OrGate;
    private or1: OrGate;

    constructor() {
        this.bits = Array.from({ length: 12 }, () => new BitMemory());
        this.not = new NotGate();
        this.not1 = new NotGate();
        this.or = new OrGate();
        this.or1 = new OrGate();
    }


    setInputs(clkin: Bit) {
        this.not.setInputs(this.bits[11].getOutput());
        const x = this.not.getOutput();

        this.or.setInputs(this.bits[11].getOutput(), clkin);
        const even: Bit = this.or.getOutput();

        this.not1.setInputs(clkin);
        const notclk: Bit = this.not1.getOutput();

        this.or1.setInputs(this.bits[11].getOutput(), notclk);
        const odd: Bit = this.or1.getOutput();

        // propagate through the 12-bit chain
        this.bits[0].setInputs(even, x);
        this.bits[1].setInputs(odd, this.bits[0].getOutput());
        this.bits[2].setInputs(even, this.bits[1].getOutput());
        this.bits[3].setInputs(odd, this.bits[2].getOutput());
        this.bits[4].setInputs(even, this.bits[3].getOutput());
        this.bits[5].setInputs(odd, this.bits[4].getOutput());
        this.bits[6].setInputs(even, this.bits[5].getOutput());
        this.bits[7].setInputs(odd, this.bits[6].getOutput());
        this.bits[8].setInputs(even, this.bits[7].getOutput());
        this.bits[9].setInputs(odd, this.bits[8].getOutput());
        this.bits[10].setInputs(even, this.bits[9].getOutput());
        this.bits[11].setInputs(odd, this.bits[10].getOutput());

        // reset when the last bit overflows
        if (this.bits[11].getOutput() === 1) {
            for (let i = 0; i < 12; i++) {
                this.bits[i].setInputs(1, 0);
            }
        }
    }

    getOutput(): [Bit, Bit, Bit, Bit, Bit, Bit] {
        return [
            this.bits[1].getOutput(),
            this.bits[3].getOutput(),
            this.bits[5].getOutput(),
            this.bits[7].getOutput(),
            this.bits[9].getOutput(),
            this.bits[11].getOutput(),
        ];
    }

    // getData() {
    //     console.log([...this.bits.map(b => b.getOutput())]);
    // }
}
