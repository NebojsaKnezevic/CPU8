import { describe, it, expect } from "vitest";
import { Bus1 } from "../CPU8/bus/bus1";
import type { Byte } from "../interface/interfaces";
import { Register } from "../CPU8/memory/register";
import { Bus } from "../CPU8/bus/bus";




describe("Bus1", () => {

    const r = new Register(new Bus());
    it("should output all 0s when s=0 and a has only 0s", () => {
        const bus = new Bus1(r);
        const a: Byte = [0, 0, 0, 0, 0, 0, 0, 0];
        bus.setInputsTest(a, 0);
        expect(bus.getOutput()).toEqual([0, 0, 0, 0, 0, 0, 0, 0]);
    });

    it("should forward inputs when s=0", () => {
        const bus = new Bus1(r);
        const a: Byte = [1, 0, 1, 1, 0, 0, 1, 0];
        bus.setInputsTest(a, 0);
        expect(bus.getOutput()).toEqual([1, 0, 1, 1, 0, 0, 1, 0]); 
    });

    it("should return 1 when s is 1", () => {
        const bus = new Bus1(r);
        const a: Byte = [1, 0, 1, 1, 0, 0, 1, 0];
        bus.setInputsTest(a, 1);
        expect(bus.getOutput()).toEqual([0, 0, 0, 0, 0, 0, 0, 1]); 
    });

    it("should forward inputs when s=0", () => {
        const bus = new Bus1(r);
        const a: Byte = [1, 0, 1, 1, 0, 0, 1, 0];
        bus.setInputsTest(a, 0);
        expect(bus.getOutput()).toEqual([1, 0, 1, 1, 0, 0, 1, 0]); 
    });

    it("should return 1 when s is 1", () => {
        const bus = new Bus1(r);
        const a: Byte = [1, 0, 1, 1, 0, 0, 1, 0];
        bus.setInputsTest(a, 1);
        expect(bus.getOutput()).toEqual([0, 0, 0, 0, 0, 0, 0, 1]); 
    });
  
});
