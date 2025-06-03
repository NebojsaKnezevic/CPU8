import { describe, expect, it } from "vitest";
import { DMux } from "../CPU8/logic/dmux";
import type { Bit } from "../interface/interfaces";




describe("DMux", () => {
    it("Should act as DMux as per logic table of DMux.", () => {
        const dmux = new DMux();

        const testCases = [
            { input: 0, sel: 0, expected: [0, 0] },
            { input: 1, sel: 0, expected: [1, 0] },
            { input: 0, sel: 1, expected: [0, 0] },
            { input: 1, sel: 1, expected: [0, 1] },
        ];

        for (const { input, sel, expected } of testCases) {
            dmux.setInputs(input as Bit, sel as Bit);
            const out = dmux.getOutput();
            expect(out).toEqual(expected);
        }
    });
});