

import { describe, it, expect } from "vitest";
import { Computer } from "../../CPU8/computer";
import type { Byte } from "../../interface/interfaces";
import { byteToNumber, numberToByte } from "../../constants/byte-conversion";

//ALU 1                                     1 XXX - XX - XX

//LOAD from next RAM address into RB,       0 010 -- 00
//Store is from REG to RAM                  0 001 00 00
//Load is from RAM to REG                   0 001 00 00
//STORE: 1 LOAD: 0

describe("DATA INSTRUCTION TEST, BUT TECHNICALLY THIS IS ENTIRE COMPUTER LOGIC TEST SO FAR. WE HAVE FUNCTIONAL COMPUTER AS OF NOW...", () => {
    const computer = new Computer();

    const program: Byte[] = [
        [0, 0, 1, 0, 0, 0, 0, 0]    //Load value from next RAM address into R[0]
        , numberToByte(10)          //Value to be loaded

        , [0, 0, 1, 0, 0, 0, 1, 0]  //Load value from next RAM address into R[2]
        , numberToByte(66)          //Value to be loaded

        , [1, 0, 0, 0, 0, 0, 1, 0]  //Add contents of R[0] and R[2] and store it into R[2]

        , [0, 0, 1, 0, 0, 0, 0, 1]  //Load value from next RAM address into R[1], this will be the address where we gonna store R[2] contents
        , numberToByte(177)         //Value to be loaded or to say address of ram
        , [0, 0, 0, 1, 0, 1, 1, 0]  //Store contents of RB into RAM address of RA

        , [0, 0, 0, 0, 0, 1, 0, 0]  //Since address of our value stored in ram is in R[1], we gonna use it to load value

        , [1, 0, 0, 1, 0, 0, 0, 0]  //Now we use SHR instruction the value in R[0] which is basically divide by 2

        , [1, 0, 1, 0, 0, 0, 0, 0]  //Now we use SHL on R[0] to multiple by 2, we gonna do it twice
        , [1, 0, 1, 0, 0, 0, 0, 0]  //Now we use SHL on R[0] to multiple by 2, we gonna do it twice

        , [0, 0, 0, 1, 1, 0, 0, 0]  //Store contents of RB into RAM address of RA
        , [0, 0, 0, 0, 1, 0, 0, 0]  //Since address of our value stored in ram is in R[1], we gonna use it to load value

    ]

    computer.insertProgramIntoRAM(0, program);

    it(`Test if ${byteToNumber(program[1])} value is loaded into R[0]`, () => {
        computer.run(1);

        expect(computer.registers[0].getData()).toEqual(program[1]);
    })

    it(`Test if ${byteToNumber(program[3])} value is loaded into R[2]`, () => {
        computer.run(1);

        expect(computer.registers[2].getData()).toEqual(program[3]);
    })

    it(`Test if add operation was correct and R[2] now has sum of R[0] and R[2] which should be ${byteToNumber(program[1]) + byteToNumber(program[3])}`, () => {
        computer.run(1);

        const res = byteToNumber(program[1]) + byteToNumber(program[3])

        expect(computer.registers[2].getData()).toEqual(numberToByte(res));
    })

    it("Test if we stored our value properyl, it takes 2 fetch execute cycles...", () => {
        computer.run(2);

        const res = byteToNumber(program[1]) + byteToNumber(program[3])

        expect(byteToNumber(computer.ram.getRamCellManually(byteToNumber(program[6])).getData())).toEqual(res);
    })

    it(`Test if proper value is loaded`, () => {
        computer.run(1);

        const res = byteToNumber(program[1]) + byteToNumber(program[3])

        expect(computer.registers[0].getData()).toEqual(numberToByte(res));
    })

    it(`Test if we did SHR on the value of R[0] which is ${byteToNumber(program[1]) + byteToNumber(program[3])}`, () => {
        computer.run(1);

        const res = byteToNumber(program[1]) + byteToNumber(program[3])

        expect(computer.registers[0].getData()).toEqual(numberToByte(res / 2));
    })

    it(`Test if we did SHL on the value of R[0] which is basically multiple by 2, and we gonna do it twice`, () => {
        computer.run(2);

        const res = byteToNumber(program[1]) + byteToNumber(program[3])

        expect(computer.registers[0].getData()).toEqual(numberToByte(res * 2));
    })

    
    it(`Store then load the value`, () => {
        computer.run(2);

        const res = byteToNumber(program[1]) + byteToNumber(program[3])

        expect(byteToNumber(computer.registers[0].getData())).toEqual(byteToNumber(numberToByte(res * 2)));
    })
});