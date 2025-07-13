import { describe, it, expect } from "vitest";
import { Decoder2x4 } from "../CPU8/logic/decoder2x4";
import type { Nibble } from "../interface/interfaces";
import { numberToByte } from "../constants/byte-conversion";



describe("Decoder2x4", () => {
    it("should output correct one-hot signal for all 4 input combinations", () => {
        for (let i = 3; i >= 0; i--) {
            let x = numberToByte(i);
            const [a, b] = [x[x.length - 2], x[x.length - 1]]; // MSB, LSB
            const decoder = new Decoder2x4();
            decoder.setInputs(a, b);
            const output = decoder.getOutput();

            // Here 1 should move from MSB to LSB
            const expected = Array(4).fill(0) as Nibble;
            expected[i] = 1;
            // console.log(output,expected)
            expect(output).toEqual(expected);
        }
    });
});
