import { describe, it, expect } from "vitest";

import { numberToByte } from "../constants/byte-conversion";
import { Shr } from "../CPU8/logic/shr";


describe("SHR", () => {
    it("should act as divider by 2", () => {
        const shr = new Shr();

        shr.setInputs(numberToByte(4));
        const result = shr.getOutput();

        expect(numberToByte(2)).toEqual(result);
    })

    it("should act as divider by 2", () => {
        const shr = new Shr();

        shr.setInputs(numberToByte(200));
        const result = shr.getOutput();

        expect(numberToByte(100)).toEqual(result);
    })

    
    it("should act as divider by 2, there is reminder 1", () => {
        const shr = new Shr();

        shr.setInputs(numberToByte(33));
        const result = shr.getOutput();

        expect(numberToByte(16)).toEqual(result);
    })

    it("should act as divider by 2, there is reminder 1", () => {
        const shr = new Shr();

        shr.setInputs(numberToByte(253));
        const result = shr.getOutput();

        expect(numberToByte(126)).toEqual(result);
    })
 
});