import { describe, expect, it } from "vitest";
import { Comparator8 } from "../CPU8/logic/comparator8";
import { numberToByte } from "../constants/byte-conversion";

describe("Comparator8", () => {
    const comp = new Comparator8();

    it("should detect a < b", () => {
        comp.setInputs(numberToByte(10), numberToByte(15));
        const [ gt, eq] = comp.getOutput();
  
        expect(gt).toBe(0);
        expect(eq).toBe(0);
    });

    it("should detect a > b", () => {
        comp.setInputs(numberToByte(250), numberToByte(100));
        const [ gt, eq] = comp.getOutput();
      
        expect(gt).toBe(1);
        expect(eq).toBe(0);
    });

    it("should detect equality", () => {
        comp.setInputs(numberToByte(42), numberToByte(42));
        const [ gt, eq] = comp.getOutput();
   
        expect(gt).toBe(0);
        expect(eq).toBe(1);
    });

    it("should detect A > 0", () => {
        comp.setInputs(numberToByte(1), numberToByte(0));
        const [ gt, eq] = comp.getOutput();
   
        expect(gt).toBe(1);
        expect(eq).toBe(0);
    });

    it("should detect A > B", () => {
        comp.setInputs(numberToByte(254), numberToByte(155));
        const [ gt, eq] = comp.getOutput();
   
        expect(gt).toBe(1);
        expect(eq).toBe(0);
    });
});
