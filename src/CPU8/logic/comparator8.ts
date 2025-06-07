import { WORD_WIDTH } from "../../constants/config";
import type { Bit, Byte } from "../../interface/interfaces";
import { Comparator } from "./comparator";
import { OrGate } from "./logic-gates";



export class Comparator8 {
    private comparators: Comparator[];
    private orGates: OrGate[]; 

    constructor() {
        this.comparators = Array.from({ length: WORD_WIDTH }, () => new Comparator());
        this.orGates = Array.from({ length: WORD_WIDTH - 1 }, () => new OrGate());
    }

    setInputs(a: Byte, b: Byte) {
        for (let i = 0; i < 8; i++) {
            this.comparators[i].setInputs(a[i], b[i]);
        }

        const neq0 = this.comparators[0].getOutput()[2];
        const neq1 = this.comparators[1].getOutput()[2];
        this.orGates[0].setInputs(neq0, neq1);

        let prevOutput = this.orGates[0].getOutput();
        for (let i = 2; i < 8; i++) {
            const neq = this.comparators[i].getOutput()[2];
            this.orGates[i - 1].setInputs(prevOutput, neq);
            prevOutput = this.orGates[i - 1].getOutput();
        }
    }

    getOutput(): [ Bit, Bit] {
        let less: Bit = 0;
        let greater: Bit = 0;

        for (let i = 0; i < 8; i++) {
            const [l, g, n] = this.comparators[i].getOutput();
            less = l;
            greater = g;
            if (l || g) break; 
        }

        const notEqual = this.orGates[6].getOutput();

        return [ greater, notEqual];
    }
}