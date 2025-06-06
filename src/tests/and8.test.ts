import { describe, it, expect } from "vitest";
import { And8 } from "../CPU8/logic/and8";
import { numberToByte } from "../constants/byte-conversion";


describe("And8", () => {
    const and = new And8();

    it("should return 00000000 when ANDing 00000000 & 00000000", () => {
        and.setInputs(numberToByte(0), numberToByte(0));
        const result = and.getOutput();
        const expected = numberToByte(0);
        expect(result).toEqual(expected);
    });

    it("should return 00000000 when ANDing 00000000 & 11111111", () => {
        and.setInputs(numberToByte(0), numberToByte(255));
        const result = and.getOutput();
        const expected = numberToByte(0);
        expect(result).toEqual(expected);
    });

    it("should return 10101010 when ANDing 11111111 & 10101010", () => {
        and.setInputs(numberToByte(255), numberToByte(170)); 
        const result = and.getOutput();
        const expected = numberToByte(170);
        expect(result).toEqual(expected);
    });

    it("should return 00000001 when ANDing 00000011 & 00000001", () => {
        and.setInputs(numberToByte(3), numberToByte(1));
        const result = and.getOutput();
        const expected = numberToByte(1);
        expect(result).toEqual(expected);
    });

    it("should return 10000000 when ANDing 11000000 & 10000000", () => {
        and.setInputs(numberToByte(192), numberToByte(128)); 
        const result = and.getOutput();
        const expected = numberToByte(128);
        expect(result).toEqual(expected);
    });
});
