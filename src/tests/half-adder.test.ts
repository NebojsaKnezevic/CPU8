
import { describe,it,expect } from "vitest";
import { HalfAdder } from "../CPU8/logic/half-adder";
import type { Bit } from "../interface/interfaces";


describe("HalfAdder", () => {
    it("should match HalfAdder truth table", () => {
        const ha = new HalfAdder();

        const truthTable: [Bit, Bit, Bit, Bit][] = [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [1, 0, 1, 0],
            [1, 1, 0, 1],
        ];

        for (const [a, b, expectedSum, expectedCarry] of truthTable) {
            ha.setInputs(a, b);
            const [sum, carry] = ha.getOutput();
            expect(sum).toBe(expectedSum);
            expect(carry).toBe(expectedCarry);
        }
    });
});