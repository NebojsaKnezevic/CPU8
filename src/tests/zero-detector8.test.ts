

import { describe, it, expect } from "vitest";
import { ZeroDetector8 } from "../CPU8/logic/zero-detector8";
import { numberToByte } from "../constants/byte-conversion";

describe("ZeroDetector8", () => {
    const zd = new ZeroDetector8();
    it("should return 1 when all 0", () => {
        zd.setInput(numberToByte(0));
        expect(zd.getOutput()).toBe(1);
    });

    it("should return 0 when != 0", () => {
        zd.setInput(numberToByte(122));
        expect(zd.getOutput()).toBe(0);
    });

    it("should return 0 when != 0", () => {
        zd.setInput(numberToByte(255));
        expect(zd.getOutput()).toBe(0);
    });

    it("should return 0 when != 0", () => {
        zd.setInput(numberToByte(128));
        expect(zd.getOutput()).toBe(0);
    });
});