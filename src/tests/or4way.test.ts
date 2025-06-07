import { describe, expect, it } from "vitest";
import { Or4Way } from "../CPU8/logic/or4way";
import type { Bit } from "../interface/interfaces";


describe("Or4Way", () => {
    const gate = new Or4Way();

    it("should return 0 if all inputs are 0", () => {
        gate.setInputs([0, 0, 0, 0]);
        expect(gate.getOutput()).toBe<Bit>(0);
    });

    it("should return 1 if at least one input is 1", () => {
        gate.setInputs([1, 0, 0, 0]);
        expect(gate.getOutput()).toBe<Bit>(1);

        gate.setInputs([0, 1, 0, 0]);
        expect(gate.getOutput()).toBe<Bit>(1);

        gate.setInputs([0, 0, 1, 0]);
        expect(gate.getOutput()).toBe<Bit>(1);

        gate.setInputs([0, 0, 0, 1]);
        expect(gate.getOutput()).toBe<Bit>(1);
    });

    it("should return 1 if all inputs are 1", () => {
        gate.setInputs([1, 1, 1, 1]);
        expect(gate.getOutput()).toBe<Bit>(1);
    });
});
