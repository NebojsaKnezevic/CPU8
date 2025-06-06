import { describe, it, expect } from "vitest";
import { Not8 } from "../CPU8/logic/not8";
import { numberToByte } from "../constants/byte-conversion";



describe("Not8", () => {
    const not8 = new Not8();

    it("should return bitwise NOT of 0", () => {
        // 00000000 => NOT => 11111111 => 255
        const input = numberToByte(0);
        not8.setInputs(input);
        const result = not8.getOutput();
        const expected = numberToByte(255);
        expect(result).toEqual(expected);
    });

    it("should return bitwise NOT of 255", () => {
        // 11111111 => NOT => 00000000 => 0
        const input = numberToByte(255);
        not8.setInputs(input);
        const result = not8.getOutput();
        const expected = numberToByte(0);
        expect(result).toEqual(expected);
    });

    it("should return bitwise NOT of 170", () => {
        // 10101010 => NOT => 01010101 => 85
        const input = numberToByte(170);
        not8.setInputs(input);
        const result = not8.getOutput();
        const expected = numberToByte(85);
        expect(result).toEqual(expected);
    });

    it("should return bitwise NOT of 1", () => {
        // 00000001 => NOT => 11111110 => 254
        const input = numberToByte(1);
        not8.setInputs(input);
        const result = not8.getOutput();
        const expected = numberToByte(254);
        expect(result).toEqual(expected);
    });

    it("should return bitwise NOT of 128", () => {
        // 10000000 => NOT => 01111111 => 127
        const input = numberToByte(128);
        not8.setInputs(input);
        const result = not8.getOutput();
        const expected = numberToByte(127);
        expect(result).toEqual(expected);
    });
});

