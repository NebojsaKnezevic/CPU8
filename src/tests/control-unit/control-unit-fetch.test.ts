

import { describe, it, expect } from "vitest";
import { byteToNumber } from "../../constants/byte-conversion";
import { Computer } from "../../CPU8/computer";
import type { Byte } from "../../interface/interfaces";

//since this is the first alu function that i implemented nad pretty basic i added bunch of random  bytes as program, 
//but i had to remove some inputs because they accidently started to trigger the newly added instructions making test to fail, 
//but actually this is a TESTIMONY THAT MY MACHINE WORKS!  

describe("Control Unit-fetch", () => {
    const computer = new Computer();

    const startAddress = 200;
    const program = [

        [0, 0, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 1],
        
        [0, 0, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 1],
        
        [0, 0, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 1],
        
        [0, 0, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 1, 1, 0, 1],
        [0, 0, 0, 0, 1, 1, 0, 1],
        [0, 0, 0, 0, 1, 1, 0, 1],
        [0, 0, 0, 0, 1, 1, 0, 1],
        [0, 0, 0, 0, 1, 1, 0, 1],
        [0, 0, 0, 0, 1, 1, 0, 1],
        [0, 0, 0, 0, 1, 1, 0, 1],
        [0, 0, 0, 0, 1, 1, 0, 1],
        [0, 0, 0, 0, 1, 1, 0, 1],
        
        

        // [0, 1, 1, 1, 0, 0, 1, 0],
        // [0, 1, 1, 0, 1, 0, 0, 1],
        // [0, 1, 0, 0, 0, 1, 1, 0],
        // // [0, 0, 1, 1, 1, 0, 0, 1],
        // [1, 0, 0, 0, 1, 1, 0, 1],
        // [1, 1, 1, 0, 0, 0, 1, 1],
        // [0, 0, 0, 1, 1, 1, 0, 0],
        // [1, 0, 1, 0, 1, 1, 0, 0],
        // [1, 0, 1, 1, 0, 0, 1, 0],
        // [0, 1, 1, 0, 1, 0, 0, 1],
        // [1, 1, 0, 0, 0, 1, 1, 0],
        // // [0, 0, 1, 1, 1, 0, 0, 1],
        // [1, 0, 0, 0, 1, 1, 0, 1],
        // [1, 1, 1, 0, 0, 0, 1, 1],
        // [0, 0, 0, 1, 1, 1, 0, 0],
        // [1, 0, 1, 0, 1, 1, 0, 0],
        // [1, 0, 1, 1, 0, 0, 1, 0],
        // [0, 1, 1, 0, 1, 0, 0, 1],
        // [1, 1, 0, 0, 0, 1, 1, 0],
        // // [0, 0, 1, 1, 1, 0, 0, 1],
        // [1, 0, 0, 0, 1, 1, 0, 1],
        // [1, 1, 1, 0, 0, 0, 1, 1],
        // [0, 0, 0, 1, 1, 1, 0, 0],
        // [1, 0, 1, 0, 1, 1, 0, 0],
        // [1, 0, 1, 1, 0, 0, 1, 0],
        // [0, 1, 1, 0, 1, 0, 0, 1],
        // [1, 1, 0, 0, 0, 1, 1, 0],
        // // [0, 0, 1, 1, 1, 0, 0, 1],
        // [1, 0, 0, 0, 1, 1, 0, 1],
        // [1, 1, 1, 0, 0, 0, 1, 1],
        // [0, 0, 0, 1, 1, 1, 0, 0],
        // [1, 0, 1, 0, 1, 1, 0, 0],
        // [1, 0, 1, 1, 0, 0, 1, 0],
        // [0, 1, 1, 0, 1, 0, 0, 1],
        // [1, 1, 0, 0, 0, 1, 1, 0],
        // // [0, 0, 1, 1, 1, 0, 0, 1],
        // [1, 0, 0, 0, 1, 1, 0, 1],
        // [1, 1, 1, 0, 0, 0, 1, 1],
        // [0, 0, 0, 1, 1, 1, 0, 0],
        // [1, 0, 1, 0, 1, 1, 0, 0]
    ]

    computer.insertProgramIntoRAM(startAddress, program as Byte[]);



    it("should fetch proper data from RAM into IR", () => {

        for (let i = 0; i < program.length; i++) {
            // console.log("rrrun", i)
            computer.run(1);

            expect(byteToNumber(computer.iar.getData())).toEqual(i + startAddress + 1);
            expect(program[i]).toEqual(computer.ir.getData());
        }


    })


});