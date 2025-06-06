import { describe, it, expect } from "vitest";
import { Adder8 } from "../CPU8/logic/adder8";
import type { Byte, Bit } from "../interface/interfaces";
import { numberToByte } from "../constants/byte-conversion";


describe("Adder8", () => {
    it("adds 1 + 2 = 3", () => {
        const a: Byte = numberToByte(1); 
        const b: Byte = numberToByte(2); 
        const expected: Byte = numberToByte(3); 
        const expectedCarry: Bit = 0;

        const adder = new Adder8();
        adder.setInputs(a, b);
        const [out, carry] = adder.getOutput();

        expect(out).toEqual(expected);
        expect(carry).toBe(expectedCarry);
    });

    it("adds 255 + 1 = 0 with carry", () => {
        const a: Byte = numberToByte(255); 
        const b: Byte = numberToByte(1); 
        const expected: Byte = numberToByte(0); 
        const expectedCarry: Bit = 1;

        const adder = new Adder8();
        adder.setInputs(a, b);
        const [out, carry] = adder.getOutput();

        expect(out).toEqual(expected);
        expect(carry).toBe(expectedCarry);
    });

    it("adds with initial carry-in: 1 + 1 + carry = 3", () => {
        const a: Byte = numberToByte(1); 
        const b: Byte = numberToByte(1); 
        const expected: Byte = numberToByte(3); 
        const expectedCarry: Bit = 0;

        const adder = new Adder8();
        adder.setInputs(a, b, 1); // carry-in
        const [out, carry] = adder.getOutput();

        expect(out).toEqual(expected);
        expect(carry).toBe(expectedCarry);
    });

    it("should show expected result 210", () => {
        const a: Byte = numberToByte(55); 
        const b: Byte = numberToByte(155); 
        const expected: Byte = numberToByte(210); 
        const expectedCarry: Bit = 0;

        const adder = new Adder8();
        adder.setInputs(a, b, 0); 
        const [out, carry] = adder.getOutput();

        expect(out).toEqual(expected);
        expect(carry).toBe(expectedCarry);
    });

    it("should show expected result 54", () => {
        const a: Byte = numberToByte(155); 
        const b: Byte = numberToByte(155);
        const expected: Byte = numberToByte(54); 
        const expectedCarry: Bit = 1;

        const adder = new Adder8();
        adder.setInputs(a, b, 0); 
        const [out, carry] = adder.getOutput();

        expect(out).toEqual(expected);
        expect(carry).toBe(expectedCarry);
    });
});
