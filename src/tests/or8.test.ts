import { describe, it, expect } from "vitest";
import { numberToByte } from "../constants/byte-conversion";
import { Or8 } from "../CPU8/logic/or8";


describe("Or8", () => {
    const or = new Or8();

    it("should return 00000000 when ORing 00000000 & 00000000", () => {
        or.setInputs(numberToByte(0), numberToByte(0));
        const result = or.getOutput();
        const expected = numberToByte(0);
        expect(result).toEqual(expected);
    });
    
    it("should return 11111111 when ORing 00000000 & 11111111", () => {
        or.setInputs(numberToByte(0), numberToByte(255));
        const result = or.getOutput();
        const expected = numberToByte(255);
        expect(result).toEqual(expected);
    });

    it("should return 11111111 when ORing 11111111 & 10101010", () => {
        or.setInputs(numberToByte(255), numberToByte(170)); 
        const result = or.getOutput();
        const expected = numberToByte(255);
        expect(result).toEqual(expected);
    });

    it("should return 00000011 when ORing 00000010 & 00000001", () => {
        or.setInputs(numberToByte(2), numberToByte(1));
        const result = or.getOutput();
        const expected = numberToByte(3);
        expect(result).toEqual(expected);
    });

    it("should return 11000000 when ORing 10000000 & 01000000", () => {
        or.setInputs(numberToByte(128), numberToByte(64)); 
        const result = or.getOutput();
        const expected = numberToByte(192); 
        expect(result).toEqual(expected);
    });
});
