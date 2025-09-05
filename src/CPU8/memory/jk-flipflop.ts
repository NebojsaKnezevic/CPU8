import type { Bit } from "../../interface/interfaces";

/**
 * Interface representing the behavior of a JK flip-flop.
 * @deprecated do not use, it doesn't work properly!
 */
export interface IJKFF {
    /**
     * Sets the inputs for the JK flip-flop.
     * @param j - The J input bit.
     * @param k - The K input bit.
     * @param clock - The clock input bit.
     */
    setInputs(j: Bit, k: Bit, clock: Bit): void;

    /**
     * Gets the output of the JK flip-flop.
     * @returns A tuple: [Q, !Q].
     */
    getOutput(): [Bit, Bit];
}


//https://www.youtube.com/watch?v=j6krFp511H
//https://www.youtube.com/watch?v=t2LZtaNck_g
export class JKFF implements IJKFF {
    private masterQ: Bit = 0;
    private slaveQ: Bit = 0;
    private previousClock: Bit = 0;

    public setInputs(j: Bit, k: Bit, clock: Bit): void {

        if (this.previousClock === 0 && clock === 1) {
            if (j === 0 && k === 0) {

            } else if (j === 0 && k === 1) {
                this.masterQ = 0;
            } else if (j === 1 && k === 0) {
                this.masterQ = 1;
            } else if (j === 1 && k === 1) {
                this.masterQ = this.masterQ === 1 ? 0 : 1;
            }
        }

        if (this.previousClock === 1 && clock === 0) {
            this.slaveQ = this.masterQ;
        }

        this.previousClock = clock;
    }

    public getOutput(): [Bit, Bit] {
        return [this.slaveQ, this.slaveQ === 1 ? 0 : 1];
    }
}
