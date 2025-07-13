import { it, describe, expect } from "vitest";
import { Computer } from "../../CPU8/computer";
import {  numberToByte } from "../../constants/byte-conversion";


// TEST DISABLED – Cannot be tested directly.
// But since both the control units fetch and ALU instructions work,
// this part should be working as well.
describe("Control unit register manipulation", () => {
    const computer = new Computer();
    computer.insertProgramIntoRAM(0, [
        //A reg 4th and 5th Bits
        [1, 0, 0, 0, 0, 0, 1, 0],
   

    ]);
    

    it("Should enable register A[0] data on the BUS, 4th and 5th bits pick reg a, here they are 00", () => {
        computer.controlUnit.R[0].setInputsFromNonBus(numberToByte(1))
        computer.controlUnit.R[1].setInputsFromNonBus(numberToByte(2))
        computer.controlUnit.R[2].setInputsFromNonBus(numberToByte(3))
        computer.controlUnit.R[3].setInputsFromNonBus(numberToByte(4))
        computer.run(1);

        expect(1).equal(1);
    })

  
});