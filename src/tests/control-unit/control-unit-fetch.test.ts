

import { describe, it, expect } from "vitest";
import { byteToNumber } from "../../constants/byte-conversion";
import { Computer } from "../../CPU8/computer";
import type { Byte } from "../../interface/interfaces";

describe("Control Unit-fetch", () => {
    const computer = new Computer();

    const startAddress = 200;
    const program = [
        [1, 0, 1, 1, 0, 0, 1, 0],
        [0, 1, 1, 0, 1, 0, 0, 1],
        [1, 1, 0, 0, 0, 1, 1, 0],
        [0, 0, 1, 1, 1, 0, 0, 1],
        [1, 0, 0, 0, 1, 1, 0, 1],
        [0, 1, 0, 1, 1, 1, 1, 0],
        [1, 1, 1, 0, 0, 0, 1, 1],
        [0, 0, 0, 1, 1, 1, 0, 0],
        [1, 0, 1, 0, 1, 1, 0, 0],
        // [0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 0, 0, 1, 0],
        [0, 1, 1, 0, 1, 0, 0, 1],
        [1, 1, 0, 0, 0, 1, 1, 0],
        [0, 0, 1, 1, 1, 0, 0, 1],
        [1, 0, 0, 0, 1, 1, 0, 1],
        [0, 1, 0, 1, 1, 1, 1, 0],
        [1, 1, 1, 0, 0, 0, 1, 1],
        [0, 0, 0, 1, 1, 1, 0, 0],
        [1, 0, 1, 0, 1, 1, 0, 0],
        [1, 0, 1, 1, 0, 0, 1, 0],
        [0, 1, 1, 0, 1, 0, 0, 1],
        [1, 1, 0, 0, 0, 1, 1, 0],
        [0, 0, 1, 1, 1, 0, 0, 1],
        [1, 0, 0, 0, 1, 1, 0, 1],
        [0, 1, 0, 1, 1, 1, 1, 0],
        [1, 1, 1, 0, 0, 0, 1, 1],
        [0, 0, 0, 1, 1, 1, 0, 0],
        [1, 0, 1, 0, 1, 1, 0, 0],
        [1, 0, 1, 1, 0, 0, 1, 0],
        [0, 1, 1, 0, 1, 0, 0, 1],
        [1, 1, 0, 0, 0, 1, 1, 0],
        [0, 0, 1, 1, 1, 0, 0, 1],
        [1, 0, 0, 0, 1, 1, 0, 1],
        [0, 1, 0, 1, 1, 1, 1, 0],
        [1, 1, 1, 0, 0, 0, 1, 1],
        [0, 0, 0, 1, 1, 1, 0, 0],
        [1, 0, 1, 0, 1, 1, 0, 0],
        [1, 0, 1, 1, 0, 0, 1, 0],
        [0, 1, 1, 0, 1, 0, 0, 1],
        [1, 1, 0, 0, 0, 1, 1, 0],
        [0, 0, 1, 1, 1, 0, 0, 1],
        [1, 0, 0, 0, 1, 1, 0, 1],
        [0, 1, 0, 1, 1, 1, 1, 0],
        [1, 1, 1, 0, 0, 0, 1, 1],
        [0, 0, 0, 1, 1, 1, 0, 0],
        [1, 0, 1, 0, 1, 1, 0, 0]
    ]

    computer.insertProgramIntoRAM(startAddress, program as Byte[]);

    

    it("should fetch proper data from RAM into IR", () => {

        for (let i = 0; i < program.length  ; i++) {
            // console.log("rrrun", i)
            computer.run(1);
  
            expect(byteToNumber(computer.iar.getData())).toEqual(i + startAddress + 1);
            expect(program[i]).toEqual(computer.ir.getData());
            
           
        }


    })


});