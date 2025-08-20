import { describe, it, expect } from "vitest";
import { Computer } from "../CPU8/computer";
import { byteToNumber } from "../constants/byte-conversion";


describe("COMPUTER", () => {
    const computer = new Computer();

    //subtract
    computer.insertProgramIntoRAM(221,
        computer.assembler(
            "ST R2, R3;"
            + "NOT R0,R0;"
            + "DATA R2, 1;"
            + "ADD R2, R0;"
            + "ADD R1, R0;"
            + "NOT R0, R0;"
            + "ADD R2, R0;"
            + "DATA R2, 2;"
            + "LD R2, R3;"
            + "JMPR --, R3;"
        )
    );
    

    //mul R1 234
    computer.insertProgramIntoRAM(233,
        computer.assembler(
            "ST R2, R3;"
            + "DATA R2, 0;" //234, 235 
            +"SHR R1, R1;" //236 Check if R1 is uneven
            +"JC, 240;" //237, 238 If carry, that means its uneven, then jump to 240
            +"JMP, 243;" //239, 240
            +"CLF;" //241
            +"ADD R0, R2;" //242
            +"SHL R0, R0;" //243
            +"AND R1,R1;" //244
            +"JZ, 248;" //245, 246
            +"JMP, 236;" //247, 248
            +"XOR R2, R0;" //249 R0 = A XOR B
            +"XOR R0, R2;" //250 R1 = B XOR (A XOR B) = A
            +"XOR R2, R0;" //251 R0 = (A XOR B) XOR A = B
            +"DATA R2, 2;" //252, 253
            +"LD R2, R3;" //254, 255
            +"JMPR --,R3;" //256
        )
    );
    

    computer.insertProgramIntoRAM(0,
        computer.assembler(
            "JMP, 0;"
        )
    );


    computer.insertProgramIntoRAM(10,
        computer.assembler(
            "DATA R0, 27;" //10, 11
            + "DATA R1, 7;" //12, 13
            + "DATA R2, 2;" //14, 15
            + "DATA R3, 20;" //16, 17
            + "JMP, 221;" //18, 19
            + "DATA R2, 2;" //20, 21
            + "DATA R3, 26;" //22, 23
            + "JMP, 233;" //24, 25
            + "JMP, 0;" 
            // + "CMP R1, R0;"
            // + "JA, 210;"
        )
    );
    // computer.run(123)

    it("should subtract", () => {
        computer.run(13);
        expect(byteToNumber(computer.registers[0].getData()) ).toBe(20);
        expect(byteToNumber(computer.registers[1].getData()) ).toBe(7);
    })

    it("should multiple", () => {
        expect(byteToNumber(computer.registers[0].getData()) ).toBe(20);
        expect(byteToNumber(computer.registers[1].getData()) ).toBe(7);
        computer.run(133);
        expect(byteToNumber(computer.registers[0].getData()) ).toBe(140);
    })
});
