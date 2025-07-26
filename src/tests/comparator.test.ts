import { beforeEach, describe, expect, it } from "vitest";
import { Comparator } from "../CPU8/logic/comparator";




describe("Comparator (1-bit, cascaded)", () => {
    let comparator: Comparator;

    beforeEach(() => {
        comparator = new Comparator();
    });

    it("a=0, b=0, aboveEqual=1, aLarger=0 => equal=1, aLarger=0, xor=0", () => {
        comparator.setInputs(0, 0, 1, 0);
        expect(comparator.getOutput()).toEqual([1, 0, 0]);
    });

    it("a=1, b=1, aboveEqual=1, aLarger=0 => equal=1, aLarger=0, xor=0", () => {
        comparator.setInputs(1, 1, 1, 0);
        expect(comparator.getOutput()).toEqual([1, 0, 0]);
    });

    it("a=0, b=1, aboveEqual=1, aLarger=0 => equal=0, aLarger=0, xor=1", () => {
        comparator.setInputs(0, 1, 1, 0);
        expect(comparator.getOutput()).toEqual([0, 0, 1]);
    });

    it("a=1, b=0, aboveEqual=1, aLarger=0 => equal=0, aLarger=1, xor=1", () => {
        comparator.setInputs(1, 0, 1, 0);
        expect(comparator.getOutput()).toEqual([0, 1, 1]);
    });

    it("a=0, b=1, aboveEqual=0, aLarger=1 => equal=0, aLarger=1, xor=1", () => {
        comparator.setInputs(0, 1, 0, 1);
        expect(comparator.getOutput()).toEqual([0, 1, 1]);
    });

    it("a=0, b=0, aboveEqual=0, aLarger=1 => equal=0, aLarger=1, xor=0", () => {
        comparator.setInputs(0, 0, 0, 1);
        expect(comparator.getOutput()).toEqual([0, 1, 0]);
    });

    it("a=1, b=1, aboveEqual=0, aLarger=0 => equal=0, aLarger=0, xor=0", () => {
        comparator.setInputs(1, 1, 0, 0);
        expect(comparator.getOutput()).toEqual([0, 0, 0]); // jer AND(0, not(xor)) = 0
    });
});
