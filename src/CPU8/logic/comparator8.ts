import {  numberToByte } from "../../constants/byte-conversion";
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

        let prevOutput = this.comparators[0].getOutput()[2]; // NEQ za MSB

        for (let i = 1; i < 8; i++) {
            const neq = this.comparators[i].getOutput()[2];
            this.orGates[i - 1].setInputs(prevOutput, neq);
            prevOutput = this.orGates[i - 1].getOutput();
        }
    }

    getOutput(): [ Bit, Bit, Byte] {
        let less: Bit = 0;
        let greater: Bit = 0;
    
        // from MSB to LSB to find first unequal bit
        for (let i = 0; i < WORD_WIDTH ; i++) {
            const [l, g, _n] = this.comparators[i].getOutput();
            if (l === 1 || g === 1) {
                less = l;
                greater = g;
                break;
            }
        }
    
        const equal: Bit = less === 0 && greater === 0 ? 1 : 0;
    
        const result: Byte = [
            0, 0, 0, 0, 0,
            greater,  // bit 2
            equal,    // bit 1
            less,     // bit 0
            
        ];
    
        return [greater, equal, result];
    }
}