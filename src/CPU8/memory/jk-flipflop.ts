import type { Bit } from "../../interface/interfaces";
import { NandGate } from "../logic/logic-gates";



//https://www.youtube.com/watch?v=j6krFp511H
//https://www.youtube.com/watch?v=t2LZtaNck_g
export class JKFF {
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

