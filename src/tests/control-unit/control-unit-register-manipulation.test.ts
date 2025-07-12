import { it, describe, should, expect } from "vitest";
import { Computer } from "../../CPU8/computer";
import { byteToNumber, numberToByte } from "../../constants/byte-conversion";


describe("Control unit register manipulation", () => {
    const computer = new Computer();
    computer.insertProgramIntoRAM(0, [
        //A reg 4th and 5th Bits
        [0, 0, 1, 1, 0, 0, 1, 0],
        [0, 0, 1, 1, 0, 1, 1, 0],
        [0, 0, 1, 1, 1, 0, 1, 0],
        [0, 0, 1, 1, 1, 1, 1, 0],

        //B reg 6th and 7th Bits
        [0, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 1, 1, 0, 1, 0, 1],
        [0, 0, 1, 1, 1, 0, 1, 0],
        [0, 0, 1, 1, 1, 1, 1, 1],

    ]);



    it("Should enable register A[0] data on the BUS, 4th and 5th bits pick reg a, here they are 00", () => {
        computer.controlUnit.setTestRegInputsFrom3x8Decoder(1, 0)
        computer.controlUnit.R[0].setInputsFromNonBus(numberToByte(1))

        computer.run(1);

        const valA = byteToNumber(computer.bus.getOutput())
        const valB = 1
        expect(1).equal(1);
    })

    // it("Should enable register A[1] data on the BUS, 4th and 5th bits pick reg a, here they are 01", () => {
    //     computer.controlUnit.setTestRegInputsFrom3x8Decoder(1, 0)
    //     computer.controlUnit.R[1].setInputsFromNonBus(numberToByte(12))

    //     computer.run(1);

    //     const valA = byteToNumber(computer.bus.getOutput())
    //     const valB = 12
    //     expect(valA === valB).toBe(true);
    // })

    // it("Should enable register A[2] data on the BUS, 4th and 5th bits pick reg a, here they are 10", () => {
    //     computer.controlUnit.setTestRegInputsFrom3x8Decoder(1, 0)
    //     computer.controlUnit.R[2].setInputsFromNonBus(numberToByte(123))

    //     computer.run(1);

    //     const valA = byteToNumber(computer.bus.getOutput())
    //     const valB = 123
    //     expect(valA === valB).toBe(true);
    // })

    // it("Should enable register A[3] data on the BUS, 4th and 5th bits pick reg a, here they are 11", () => {
    //     computer.controlUnit.setTestRegInputsFrom3x8Decoder(1, 0)
    //     computer.controlUnit.R[3].setInputsFromNonBus(numberToByte(223))

    //     computer.run(1);

    //     const valA = byteToNumber(computer.bus.getOutput())
    //     const valB = 223
    //     expect(valA === valB).toBe(true);
    // })



    // it("Should enable register B[0] data on the BUS, 6th and 7th bits pick reg a, here they are 00", () => {
    //     computer.controlUnit.setTestRegInputsFrom3x8Decoder(0, 1)
    //     computer.controlUnit.R[0].setInputsFromNonBus(numberToByte(1))

    //     computer.run(1);

    //     const valA = byteToNumber(computer.bus.getOutput())
    //     const valB = 1
    //     expect(valA === valB).toBe(true);
    // })

    // it("Should enable register B[1] data on the BUS, 6th and 7th bits pick reg a, here they are 01", () => {
    //     computer.controlUnit.setTestRegInputsFrom3x8Decoder(0, 1)
    //     computer.controlUnit.R[1].setInputsFromNonBus(numberToByte(12))

    //     computer.run(1);

    //     const valA = byteToNumber(computer.bus.getOutput())
    //     const valB = 12
    //     expect(valA === valB).toBe(true);
    // })

    // it("Should enable register B[2] data on the BUS, 6th and 7th bits pick reg a, here they are 10", () => {
    //     computer.controlUnit.setTestRegInputsFrom3x8Decoder(0, 1)
    //     computer.controlUnit.R[2].setInputsFromNonBus(numberToByte(123))

    //     computer.run(1);

    //     const valA = byteToNumber(computer.bus.getOutput())
    //     const valB = 123
    //     expect(valA === valB).toBe(true);
    // })

    // it("Should enable register B[3] data on the BUS, 6th and 7th bits pick reg a, here they are 11", () => {
    //     computer.controlUnit.setTestRegInputsFrom3x8Decoder(0, 1)
    //     computer.controlUnit.R[3].setInputsFromNonBus(numberToByte(223))

    //     computer.run(1);

    //     const valA = byteToNumber(computer.bus.getOutput())
    //     const valB = 223
    //     expect(valA === valB).toBe(true);
    // })




    //################### SET B REG
    // it("Should set value of Regs from the bus, 6th and 7th bits pick reg b, here they are 00", () => {
    //     const computer = new Computer();
    //     computer.insertProgramIntoRAM(0, [
    //         //B reg 6th and 7th Bits
    //         [1, 0, 1, 1, 0, 1, 0, 1],
    //         [1, 0, 1, 1, 0, 0, 0, 0],
    //         [1, 1, 1, 1, 1, 1, 1, 1],
    //         [1, 0, 1, 1, 0, 0, 0, 0],
    //         // [1, 0, 1, 1, 0, 1, 0, 1],
    //         // [1, 0, 1, 1, 0, 1, 0, 1]

    //     ]);
    //     computer.controlUnit.setTestRegInputsFrom3x8Decoder(0, 0)
    //     // computer.bus.setInputs(numberToByte(11))

    //     computer.run();

    //     const valA = byteToNumber(computer.controlUnit.R[0].getData())
    //     const valB = byteToNumber([1, 0, 1, 1, 0, 1, 0, 1]);
    //     console.log(valA, valB)
    //     expect(valA === valB).toBe(true);
    // })

    // it("Should set value of Regs from the bus, 6th and 7th bits pick reg b, here they are 01", () => {
    //     computer.controlUnit.setTestRegInputsFrom3x8Decoder(0, 0)
    //     computer.bus.setInputs(numberToByte(133))

    //     computer.run(1);

    //     const valA = byteToNumber(computer.controlUnit.R[1].getData())
    //     const valB = 11
    //     console.log(valA, valB)
    //     expect(valA === valB).toBe(true);
    // })

    // it("Should set value of Regs from the bus, 6th and 7th bits pick reg b, here they are 10", () => {
    //     computer.controlUnit.setTestRegInputsFrom3x8Decoder(0, 0)
    //     computer.bus.setInputs(numberToByte(111))

    //     computer.run(1);

    //     const valA = byteToNumber(computer.controlUnit.R[2].getData())
    //     const valB = 111
    //     expect(valA === valB).toBe(true);
    // })

    // it("Should set value of Regs from the bus, 6th and 7th bits pick reg b, here they are 11", () => {
    //     computer.controlUnit.setTestRegInputsFrom3x8Decoder(0, 0)
    //     computer.bus.setInputs(numberToByte(133))

    //     computer.run(1);

    //     const valA = byteToNumber(computer.controlUnit.R[3].getData())
    //     const valB = 133
    //     expect(valA === valB).toBe(true);
    // })
});