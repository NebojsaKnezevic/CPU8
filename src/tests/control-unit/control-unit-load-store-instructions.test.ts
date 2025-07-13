import { describe, it, expect } from "vitest";
import { Computer } from "../../CPU8/computer";
import { byteToNumber, numberToByte } from "../../constants/byte-conversion";

//Store is from REG to RAM
//Load is from RAM to REG
//STORE: 1 LOAD: 0


describe("ALU LOAD & STORE: 000 [0:1] XX XX", () => {

    const computer = new Computer();
    computer.insertProgramIntoRAM(0, [
        [0, 0, 0, 1, 1, 1, 1, 0], //STORE
        [0, 0, 0, 0, 1, 1, 1, 0], //LOAD

        [0, 0, 0, 1, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],

        [0, 0, 0, 1, 1, 0, 1, 1],
        [0, 0, 0, 0, 1, 1, 0, 1],

        [0, 0, 0, 1, 0, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 1, 1],

        [0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 1],

        [0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 1],

        [0, 0, 0, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 1, 1, 1, 0],
    ]);

    const tests: { RA: number, RA_VAL: number, RB: number, RB_VAL: number }[] = [
        { RA: 3, RA_VAL: 24, RB: 2, RB_VAL: 100 }, //STORE 100 into RAM address 10
        { RA: 3, RA_VAL: 24, RB: 2, RB_VAL: 100 }, //LOAD RAM address 10 into RB

        { RA: 0, RA_VAL: 101, RB: 1, RB_VAL: 111 },
        { RA: 0, RA_VAL: 101, RB: 1, RB_VAL: 111 },

        { RA: 2, RA_VAL: 25, RB: 3, RB_VAL: 166 },
        { RA: 3, RA_VAL: 25, RB: 1, RB_VAL: 166 },

        { RA: 0, RA_VAL: 171, RB: 1, RB_VAL: 131 },
        { RA: 2, RA_VAL: 171, RB: 3, RB_VAL: 131 },

        { RA: 3, RA_VAL: 55, RB: 0, RB_VAL: 77 },
        { RA: 1, RA_VAL: 55, RB: 1, RB_VAL: 77 },

        { RA: 3, RA_VAL: 55, RB: 0, RB_VAL: 77 },
        { RA: 2, RA_VAL: 55, RB: 1, RB_VAL: 77 },

        { RA: 3, RA_VAL: 99, RB: 2, RB_VAL: 88 },
        { RA: 3, RA_VAL: 99, RB: 2, RB_VAL: 88 },
    ]


    for (let i = 0; i <= tests.length - 1; i++) {

        // if (i == 11) continue;
        if (i % 2 === 0) {
            it("TEST STORE", () => {
                computer.registers[tests[i].RA].setInputsFromNonBus(numberToByte(tests[i].RA_VAL)); //address where to store    REG A
                computer.registers[tests[i].RB].setInputsFromNonBus(numberToByte(tests[i].RB_VAL)); //value to store            REG B
                computer.run(1)

                expect(byteToNumber(computer.ram.getRamCellManually(tests[i].RA_VAL).register.getData())).toEqual(tests[i].RB_VAL);
            })

        } else {
            it("TEST LOAD", () => {
                computer.registers[tests[i].RA].setInputsFromNonBus(numberToByte(tests[i].RA_VAL)); //address from where to load    REG A

                computer.run(1);

                expect(tests[i].RB_VAL).toEqual(byteToNumber(computer.registers[tests[i].RB].getData()));

            })

        }








    }



});
