import { describe, it, expect } from "vitest";
import { Computer } from "../../CPU8/computer";
import { numberToByte } from "../../constants/byte-conversion";

describe("JUMPIF", () => {
    const computer = new Computer();

    computer.insertProgramIntoRAM(111,
        computer.assembler(

            "DATA R1, 1;"
            + "DATA R0, 0;"
            + "AND R1, R0;"
            + "JZ, 0;"
        )
    );
    computer.insertProgramIntoRAM(0,
        computer.assembler(
            "DATA R0, 152;"
            + "DATA R1, 51;"
            + "ADD R0, R1;"
            + "ADD R0, R1;"
            + "JC, 111;"
            // +"DATA R2, 16;"


        )
    );

    for (let I = 0; I < 25; I++) {
        it("DATA R0, 52;", () => {
            computer.run(1);
            // console.log(computer.registers[0].getData())
            expect(computer.registers[0].getData()).toEqual(numberToByte(152));
        })

        it("DATA R1, 51;", () => {
            computer.run(1);
            // console.log(computer.registers[1].getData())
            expect(computer.registers[1].getData()).toEqual(numberToByte(51));
        })

        it("ADD R0, R1;", () => {
            computer.run(1);
            // console.log(computer.registers[1].getData())
            expect(computer.registers[1].getData()).toEqual(numberToByte(203));
        })

        it("XOR R1, R0; JC, 111;", () => {
            computer.run(2);
            expect(computer.iar.getData()).toEqual(numberToByte(111));
        })

        it("DATA R1, 51;", () => {
            computer.run(1);
            // console.log(computer.registers[0].getData())
            expect(computer.registers[1].getData()).toEqual(numberToByte(1));
        })

        it("DATA R0, 51;", () => {
            computer.run(1);
            // console.log(computer.registers[1].getData())
            expect(computer.registers[0].getData()).toEqual(numberToByte(0));
        })

        it("AND R1, R0; JZ, 0;", () => {
            computer.run(2);
            expect(computer.iar.getData()).toEqual(numberToByte(0));
        })


    }


});