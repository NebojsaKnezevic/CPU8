import { describe, it , expect } from "vitest";
import { Computer } from "../../CPU8/computer";
import type { Byte } from "../../interface/interfaces";
import { byteToNumber, numberToByte } from "../../constants/byte-conversion";


//ALU 1                                     1 XXX - XX - XX

//Store is from REG to RAM, Store from RB to RAM address in RA
//Load is from RAM to REG, Load RB from RAM address in RA
//Store is from REG to RAM                  0 001 00 00
//Load is from RAM to REG                   0 000 00 00
//STORE: 1 LOAD: 0
//LOAD from next RAM address into RB,       0 010 -- 00
//Jump Register: jumps to address in RB     0 011 -- 00

describe("TEST", () => {
    const computer = new Computer();

    const program: Byte[] = [
        [0,0,1,0,0,0,0,0] //LOAD from next RAM address to RB
        ,numberToByte(121) //100 vrednost

        ,[0,0,1,0,0,0,0,1] //LOAD from next RAM address to RB
        ,numberToByte(101) //100 vrednost

        ,[1,0,0,0,0,0,0,1] //ADD R0 and R1 and store into R1

        ,[0,0,1,0,0,0,1,1] //LOAD address into R3
        ,numberToByte(201)

        ,[0,0,0,1,1,1,0,1] // STORE R1 into RAM address R3

        ,[0,0,1,1,0,0,1,1]

       ,[0,0,1,0,0,0,0,1] //LOAD from next RAM address to RB
        ,numberToByte(1) //100 vrednost
        ,[0,0,1,1,0,0,0,1]


    ];

    computer.insertProgramIntoRAM(0, program);

    it("Insert value into R[0]", () => {
        computer.run(1);

        expect(computer.registers[0].getData()).toEqual(program[1]);
        expect(byteToNumber(computer.iar.getData())).toEqual(2);
    })

    it("Insert value into R[1]", () => {
        computer.run(1);

        expect(computer.registers[1].getData()).toEqual(program[3]);
        expect(byteToNumber(computer.iar.getData())).toEqual(4);
    })

    it("ADD R[0] and R[1] and store the result into R[1]", () => {
        computer.run(1);
        const sum = byteToNumber(program[3]) + byteToNumber(program[1]);
        expect(computer.registers[1].getData()).toEqual(numberToByte(sum));
        expect(byteToNumber(computer.iar.getData())).toEqual(5);
    })

    it("Load address into R3", () => {
        computer.run(1);
 
        expect(computer.registers[3].getData()).toEqual(program[6]);
        expect(byteToNumber(computer.iar.getData())).toEqual(7);
    })

    it(`Store R1 into address R3`, () => {
        computer.run(1);
 
        expect(computer.registers[1].getData()).toEqual(computer.ram.getRamCellManually(byteToNumber(program[6])).getData());
        expect(byteToNumber(computer.iar.getData())).toEqual(8);
    })

    it(`RAM should select valie from address R3 which is sum of R0 and R1`, () => {
        computer.run(1);
        const sum = byteToNumber(program[3]) + byteToNumber(program[1]);
        expect(sum).toEqual(byteToNumber(computer.ram.getRamCellManually(byteToNumber(program[6])).getData()));
        expect(byteToNumber(computer.iar.getData())).toEqual(9);
    })

    it(`Check the value of address 1`, () => {
        computer.run(2);
 
        expect(computer.registers[0].getData()).toEqual(computer.ram.getRamCellManually(1).getData());
        expect(byteToNumber(computer.iar.getData())).toEqual(12);
    })
});