
import { describe, it, expect } from "vitest";
import { Ram } from "../CPU8/memory/ram";
import { Bus } from "../CPU8/bus/bus";


describe("RAM", () => {
    const bus = new Bus();
    const ram = new Ram(bus);
    it("sets MAR register, then places inputs in that particular RamCell: Address 0", () => {
        bus.setInputs([0, 0, 0, 0, 0, 0, 0, 0]);
        ram.setMarInputs(1);
        bus.setInputs([0, 0, 0, 0, 0, 0, 0, 1]);
        const ramCell = ram.setInputs(1, 0)

        expect(bus.getOutput()).toEqual(ramCell.getData());
    }),
    it("sets MAR register, then places inputs in that particular RamCell: Address 1", () => {
        bus.setInputs([0, 0, 0, 0, 0, 0, 0, 1]);
        ram.setMarInputs(1);
        bus.setInputs([0, 0, 0, 0, 0, 0, 0, 1]);
        const ramCell = ram.setInputs(1, 0)

        expect(bus.getOutput()).toEqual(ramCell.getData());
    }),
    it("Comapres data written in two RamCells", () => {
        bus.setInputs([0, 0, 0, 0, 0, 0, 0, 0]);
        ram.setMarInputs(1);
        bus.setInputs([0, 1, 1, 0, 0, 0, 0, 0]);
        const ramCell = ram.setInputs(1, 0)

        bus.setInputs([0, 0, 0, 0, 0, 0, 0, 1]);
        ram.setMarInputs(1);
        bus.setInputs([0, 1, 1, 0, 0, 0, 0, 0]);
        const ramCell1 = ram.setInputs(1, 0)

        expect(ramCell1.getData()).toEqual(ramCell.getData());
    }),
    it("writes and reads different values from different RAM cells", () => {
        // Write 00000001 to address 0
        bus.setInputs([0,0,0,0,0,0,0,0]);
        ram.setMarInputs(1);
        bus.setInputs([0,0,0,0,0,0,0,1]);
        ram.setInputs(1, 0);
    
        // Write 00000010 to address 1
        bus.setInputs([0,0,0,0,0,0,0,1]);
        ram.setMarInputs(1);
        bus.setInputs([0,0,0,0,0,0,1,0]);
        ram.setInputs(1, 0);
    
        //Read from address 0
        bus.setInputs([0,0,0,0,0,0,0,0]);
        ram.setMarInputs(1);
        const cell0 = ram.setInputs(0, 1);
        expect(cell0.getData()).toEqual([0,0,0,0,0,0,0,1]);
    
        //Read from address 1
        bus.setInputs([0,0,0,0,0,0,0,1]);
        ram.setMarInputs(1);
        const cell1 = ram.setInputs(0, 1);
        expect(cell1.getData()).toEqual([0,0,0,0,0,0,1,0]);
    });
    
    it("does not write when store bit is 0", () => {
        bus.setInputs([0,0,0,0,0,0,1,1]);
        ram.setMarInputs(1);
        bus.setInputs([1,1,1,1,1,1,1,1]);
        ram.setInputs(0, 0); // Store = 0
    
        const readCell = ram.setInputs(0, 1); // Only read
        expect(readCell.getData()).not.toEqual([1,1,1,1,1,1,1,1]);
    });
 
});