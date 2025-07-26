
import { WORD_WIDTH } from "../../constants/config";
import type { Bit, Byte } from "../../interface/interfaces";
import { Comparator } from "./comparator";
import { OrGate, XorGate } from "./logic-gates";



export class Comparator8 {

    private comparators: Comparator[];

    constructor() {

        this.comparators = Array.from({ length: WORD_WIDTH }, () => new Comparator());
    }

    setInputs(a: Byte, b: Byte) {
        this.comparators[0].setInputs(a[0], b[0], 1, 0); // MSB = index 0
        // console.log(`[0] a=${a[0]} b=${b[0]} eq=1 alarger=0`);

        for (let i = 1; i < WORD_WIDTH; i++) {
            const [eq, alarger, _] = this.comparators[i - 1].getOutput();
            // console.log(`[${i}] a=${a[i]} b=${b[i]} eq=${eq} alarger=${alarger}`);
            this.comparators[i].setInputs(a[i], b[i], eq, alarger);
        }
    }

    getOutput(): [Bit, Bit, Byte] {
        const [eq, alarger, _] = this.comparators[WORD_WIDTH - 1].getOutput();

        const xorRes: Byte = this.comparators.map(c => c.getOutput()[2]) as Byte;

        return [alarger, eq, xorRes];
    }
}