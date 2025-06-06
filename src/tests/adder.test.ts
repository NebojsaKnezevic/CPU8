import { describe, it, expect } from "vitest";
import { Adder } from "../CPU8/logic/adder";
import type { Bit } from "../interface/interfaces";

describe("Full Adder", () => {
    it("should match adder truth table", () => {
        const adder = new Adder();

        const inputs: [Bit, Bit, Bit][] = [
            [0, 0, 0],
            [0, 0, 1],
            [0, 1, 0],
            [0, 1, 1],
            [1, 0, 0],
            [1, 0, 1],
            [1, 1, 0],
            [1, 1, 1],
        ];

        const expectedOutputs: [Bit, Bit][] = [
            [0, 0],
            [1, 0],
            [1, 0],
            [0, 1],
            [1, 0],
            [0, 1],
            [0, 1],
            [1, 1],
        ];

        for (let i = 0; i < inputs.length; i++) {
            const [a,b,c] = inputs[i];
            adder.setInputs(a,b,c);
            expect(adder.getOutput()).toEqual(expectedOutputs[i]);
        }
    });
});
