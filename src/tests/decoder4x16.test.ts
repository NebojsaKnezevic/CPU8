import { describe, it, expect } from "vitest";
import { Decoder4x16 } from "../CPU8/logic/decoder4x16";
import type { Word } from "../interface/interfaces";
import { numberToByte } from "../constants/byte-conversion";


describe("Decoder4x16", () => {
    it("should output correct one-hot signal for all 16 input combinations", () => {
        for (let i = 0; i < 16; i++) {
            let x = numberToByte(i);
            const [a, b, c, d] = [x[3], x[2], x[1], x[0]]; // MSB, LSB
            const decoder = new Decoder4x16();
            decoder.setInputs(a, b, c, d);
            const output = decoder.getOutput();

            // Here 1 should move from MSB to LSB
            const expected = Array(16).fill(0) as Word;
            expected[i] = 1;
            // console.log(output,expected)
            expect(output).toEqual(expected);
        }
    });
});
