import { describe, it, expect } from "vitest";
import { RamCell } from "../CPU8/memory/ram-cell";
import { Bus } from "../CPU8/bus/bus";
import type { Bit, Byte } from "../interface/interfaces";


describe("RamCell", () => {
    it("should given the inputs, realese data on bus or acceprt data from bus.", () => {
        const bus: Bus = new Bus();
        const ramCell: RamCell = new RamCell(bus);

        // h: Bit, v: Bit, s: Bit, e: Bit, reset: Bit
        // h abd v are inputs from address decoders and they must be 1
        // s and e and reset are signals from control unit 
        // bus purpose is to set data on bus for testing purposes
        const testCases = [
            { h: 1 as Bit, v: 1 as Bit, s: 0 as Bit, e: 0 as Bit, reset: 0 as Bit, busData: [1, 1, 0, 0, 0, 0, 1, 1] as Byte, shouldEqual: false },
            { h: 1 as Bit, v: 1 as Bit, s: 0 as Bit, e: 1 as Bit, reset: 0 as Bit, shouldEqual: false },
            { h: 1 as Bit, v: 1 as Bit, s: 1 as Bit, e: 0 as Bit, reset: 0 as Bit, shouldEqual: true },
            { h: 1 as Bit, v: 1 as Bit, s: 1 as Bit, e: 1 as Bit, reset: 0 as Bit, shouldEqual: true },
            { h: 1 as Bit, v: 1 as Bit, s: 0 as Bit, e: 0 as Bit, reset: 0 as Bit, busData: [1, 1, 0, 1, 1, 0, 1, 1] as Byte, shouldEqual: false },
            { h: 1 as Bit, v: 1 as Bit, s: 1 as Bit, e: 0 as Bit, reset: 0 as Bit, shouldEqual: true },
            { h: 1 as Bit, v: 1 as Bit, s: 0 as Bit, e: 0 as Bit, reset: 0 as Bit, busData: [1, 1, 0, 0, 0, 0, 1, 1] as Byte, shouldEqual: false },
            { h: 1 as Bit, v: 1 as Bit, s: 0 as Bit, e: 1 as Bit, reset: 0 as Bit, shouldEqual: false },
            { h: 1 as Bit, v: 1 as Bit, s: 1 as Bit, e: 1 as Bit, reset: 0 as Bit, shouldEqual: true },
        ];

        for (const { h, v, s, e, reset, busData, shouldEqual } of testCases) {

            if(busData){
                bus.setInputs(busData);
            }
          
            ramCell.setInputs(h, v, s, e, reset);

            if (shouldEqual) {
                expect(bus.getOutput()).toEqual(ramCell.getData());
            }
            else {
                expect(bus.getOutput()).not.toEqual(ramCell.getData());
            }



        }
    });
});