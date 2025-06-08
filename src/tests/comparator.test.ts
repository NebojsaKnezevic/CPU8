import { beforeEach, describe, expect, it } from "vitest";
import { Comparator } from "../CPU8/logic/comparator";




describe("Comparator1", () => {
    let comparator: Comparator = new Comparator();

    it("should return all 0s when a == b == 0", () => {
        comparator.setInputs(0, 0);
        const [AGreater, Equal, notEqual] = comparator.getOutput();
        expect(AGreater).toBe(0);
        expect(Equal).toBe(0);
        // expect(notEqual).toBe(0);
    });

    it("should return all 0s when a == b == 1", () => {
        comparator.setInputs(1, 1);
        const [aLessB, aGreaterB, notEqual] = comparator.getOutput();
        expect(aLessB).toBe(0);
        expect(aGreaterB).toBe(0);
        expect(notEqual).toBe(0);
    });

    it("should detect a < b", () => {
        comparator.setInputs(0, 1);
        const [aLessB, aGreaterB, notEqual] = comparator.getOutput();
        expect(aLessB).toBe(1);
        expect(aGreaterB).toBe(0);
        expect(notEqual).toBe(1);
    });

    it("should detect a > b", () => {
        comparator.setInputs(1, 0);
        const [aLessB, aGreaterB, notEqual] = comparator.getOutput();
        expect(aLessB).toBe(0);
        expect(aGreaterB).toBe(1);
        expect(notEqual).toBe(1);
    });
});
