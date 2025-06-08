import { describe, it, expect } from "vitest";
import { Shl } from "../CPU8/logic/shl";
import { numberToByte } from "../constants/byte-conversion";


describe("SHL", () => {
    const shl = new Shl();
    it("should act as multiplier by 2", () => {
        

        shl.setInputs(numberToByte(2));
        const result = shl.getOutput()[0];

        expect(numberToByte(4)).toEqual(result);
    })
    it("should act as multiplier by 2", () => {

        shl.setInputs(numberToByte(1));
        const result = shl.getOutput()[0];

        expect(numberToByte(2)).toEqual(result);
    })

    it("should act as multiplier by 2", () => {
        //ovde sam mnozio sa 2, 2 puta: 10 x 2 x 2 = 40
        shl.setInputs(numberToByte(10));
        shl.setInputs(shl.getOutput()[0]);
        const result = shl.getOutput()[0];

        expect(numberToByte(40)).toEqual(result);
    })

    it("should act as multiplier by 2", () => {

        shl.setInputs(numberToByte(255));
        const result = shl.getOutput()[0];
        // console.log(byteToNumber(result))
        expect(numberToByte(254)).toEqual(result);
    })
});