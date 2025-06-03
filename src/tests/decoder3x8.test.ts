import { describe, it, expect } from "vitest";
import { Decoder3x8 } from "../CPU8/logic/decoder3x8";
import type {  Byte } from "../interface/interfaces";
import { numberToByte } from "../constants/byte-conversion";


describe("Decoder3x8", () => {
    it("should output correct one-hot signal for all 8 input combinations", () => {
        for (let i = 0; i < 8; i++) {
            let x = numberToByte(i);
            const [a, b, c] = [x[2], x[1], x[0]]; // MSB, LSB
            const decoder = new Decoder3x8();
            decoder.setInputs(a, b, c);
            const output = decoder.getOutput();

            // Here 1 should move from MSB to LSB
            const expected = Array(8).fill(0) as Byte;
            expected[i] = 1;
            // console.log(output,expected)
            expect(output).toEqual(expected);
        }
    });
});
