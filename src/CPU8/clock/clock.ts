import type { Bit } from "../../interface/interfaces";
import { NandGate, NotGate } from "../logic/logic-gates";
import { JKFF } from "../memory/jk-flipflop";




export class Clock {
    private clk: Bit = 0;
    private clke: Bit = 1;
    private clks: Bit = 0;

    private out: [Bit, Bit, Bit][] = [
        [0,1,0],
        [1,1,1],
        [1,1,0],
        [0,0,0]
    ]

    private i: number = 0;

    // in    0101 0101
    // clk   0110 0110
    // clke  1110 1110
    // clks  0100 0100

    setInputs(): void {
        this.i = this.i + 1;
        if(this.i === 4) this.i = 0;
    }

    getOutput(): [Bit, Bit, Bit] {
        return this.out[this.i];
    }
}