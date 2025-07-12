import { describe, it, expect } from "vitest";
import { Computer } from "../../CPU8/computer";
import { byteToNumber, numberToByte } from "../../constants/byte-conversion";




describe("ALU INSTRUCTIONS", () => {
    const computer = new Computer();
    computer.insertProgramIntoRAM(0, [
        [1, 0, 0, 0, 1, 0, 1, 1],
        [1, 0, 0, 0, 0, 1, 1, 0],
        [1, 0, 0, 0, 0, 1, 1, 0],

        [1, 0, 0, 1, 1, 0, 1, 0],
        [1, 0, 0, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 1, 1, 1, 1],

        [1, 0, 1, 0, 1, 0, 1, 1],
        [1, 0, 1, 0, 1, 0, 0, 1],

        [1, 0, 1, 1, 1, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 1],
        [1, 0, 1, 1, 1, 0, 1, 1],

        [1, 1, 0, 0, 0, 1, 1, 0],
        [1, 1, 0, 0, 1, 0, 1, 1],

        [1, 1, 0, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 0, 0, 1, 1],

        [1, 1, 1, 0, 0, 0, 1, 1],
        [1, 1, 1, 0, 0, 0, 1, 1],
        [1, 1, 1, 0, 0, 0, 1, 1],

        [1, 1, 1, 1, 0, 0, 1, 1],
        [1, 1, 1, 1, 0, 1, 1, 0],
        [1, 1, 1, 1, 1, 0, 0, 1],
    ]);
    it("Should add reg A and B: #1 ADD, OP CODE: 000", () => {


        computer.registers[2].setInputsFromNonBus(numberToByte(23))
        computer.registers[3].setInputsFromNonBus(numberToByte(13))

        computer.run(1);

        // expect(byteToNumber(computer.acc.getData()) ).equal(33 )

        expect(byteToNumber(computer.registers[3].getData())).equal(36)
    })

    it("Should add reg A and B: #1 ADD, OP CODE: 000", () => {


        computer.registers[1].setInputsFromNonBus(numberToByte(123))
        computer.registers[2].setInputsFromNonBus(numberToByte(113))

        computer.run(1);

        // expect(byteToNumber(computer.acc.getData()) ).equal(33 )

        expect(byteToNumber(computer.registers[2].getData())).equal(236)
    })

    it("Should add reg A and B: #1 ADD, OP CODE: 000", () => {


        computer.registers[1].setInputsFromNonBus(numberToByte(255))
        computer.registers[2].setInputsFromNonBus(numberToByte(2))

        computer.run(1);

        // expect(byteToNumber(computer.acc.getData()) ).equal(33 )

        expect(byteToNumber(computer.registers[2].getData())).equal(1)
    })

    it("Should divide A by 2: #2 SHR, OP CODE: 001", () => {


        computer.registers[2].setInputsFromNonBus(numberToByte(2))


        computer.run(1);

        // expect(byteToNumber(computer.acc.getData()) ).equal(1 )

        expect(byteToNumber(computer.registers[2].getData())).equal(1)
    })

    it("Should divide A by 2: #2 SHR, OP CODE: 001", () => {


        computer.registers[3].setInputsFromNonBus(numberToByte(32))


        computer.run(1);

        // expect(byteToNumber(computer.acc.getData()) ).equal(1 )

        expect(byteToNumber(computer.registers[3].getData())).equal(16)
    })

    it("Should divide A by 2: #2 SHR, OP CODE: 001", () => {


        computer.registers[3].setInputsFromNonBus(numberToByte(1))


        computer.run(1);

        // expect(byteToNumber(computer.acc.getData()) ).equal(1 )

        expect(byteToNumber(computer.registers[3].getData())).equal(0)
    })

    it("Should divide A by 2: #3 SHL, OP CODE: 010", () => {


        computer.registers[2].setInputsFromNonBus(numberToByte(32))


        computer.run(1);

        // expect(byteToNumber(computer.acc.getData()) ).equal(1 )

        expect(byteToNumber(computer.registers[3].getData())).equal(64)
    })

    it("Should divide A by 2: #3 SHL, OP CODE: 010", () => {


        computer.registers[2].setInputsFromNonBus(numberToByte(255))


        computer.run(1);

        // expect(byteToNumber(computer.acc.getData()) ).equal(1 )

        expect(byteToNumber(computer.registers[1].getData())).equal(254)
    })

    it("Not A: #4 NOT, OP CODE: 011", () => {


        computer.registers[2].setInputsFromNonBus(numberToByte(255))


        computer.run(1);

        // expect(byteToNumber(computer.acc.getData()) ).equal(1 )

        expect(byteToNumber(computer.registers[1].getData())).equal(0)
    })

    it("Not A: #4 NOT, OP CODE: 011", () => {


        computer.registers[2].setInputsFromNonBus(numberToByte(0))


        computer.run(1);

        // expect(byteToNumber(computer.acc.getData()) ).equal(1 )

        expect(byteToNumber(computer.registers[3].getData())).equal(255)
    })

    it("Not A: #4 NOT, OP CODE: 011", () => {


        computer.registers[2].setInputsFromNonBus(numberToByte(75))


        computer.run(1);

        // expect(byteToNumber(computer.acc.getData()) ).equal(1 )

        expect(byteToNumber(computer.registers[3].getData())).equal(180)
    })


    it("And A & B: #5 And, OP CODE: 100", () => {

        computer.registers[1].setInputsFromNonBus(numberToByte(175))
        computer.registers[2].setInputsFromNonBus(numberToByte(75))


        computer.run(1);

        // expect(byteToNumber(computer.acc.getData()) ).equal(1 )

        expect(byteToNumber(computer.registers[2].getData())).equal(11)
    })

    it("And A & B: #5 And, OP CODE: 100", () => {

        computer.registers[2].setInputsFromNonBus(numberToByte(32))
        computer.registers[3].setInputsFromNonBus(numberToByte(2))


        computer.run(1);

        // expect(byteToNumber(computer.acc.getData()) ).equal(1 )

        expect(byteToNumber(computer.registers[3].getData())).equal(0)
    })

    it("OR A & B: #6 OR, OP CODE: 101", () => {

        computer.registers[2].setInputsFromNonBus(numberToByte(32))
        computer.registers[3].setInputsFromNonBus(numberToByte(2))


        computer.run(1);

        // expect(byteToNumber(computer.acc.getData()) ).equal(1 )

        expect(byteToNumber(computer.registers[3].getData())).equal(34)
    })

    it("OR A & B: #6 OR, OP CODE: 101", () => {

        computer.registers[0].setInputsFromNonBus(numberToByte(160))
        computer.registers[3].setInputsFromNonBus(numberToByte(22))


        computer.run(1);

        // expect(byteToNumber(computer.acc.getData()) ).equal(1 )

        expect(byteToNumber(computer.registers[3].getData())).equal(182)
    })

    it("CMP A & B: #7 CMP, OP CODE: 110", () => {

        computer.registers[0].setInputsFromNonBus(numberToByte(160))
        computer.registers[3].setInputsFromNonBus(numberToByte(22))


        computer.run(1);

        // expect(byteToNumber(computer.acc.getData()) ).equal(1 )

        expect(byteToNumber(computer.registers[3].getData())).equal(4)

    })

    it("CMP A & B: #7 CMP, OP CODE: 110", () => {

        computer.registers[0].setInputsFromNonBus(numberToByte(22))
        computer.registers[3].setInputsFromNonBus(numberToByte(22))


        computer.run(1);

        // expect(byteToNumber(computer.acc.getData()) ).equal(1 )

        expect(byteToNumber(computer.registers[3].getData())).equal(2)
    })

    it("CMP A & B: #7 CMP, OP CODE: 110", () => {

        computer.registers[0].setInputsFromNonBus(numberToByte(2))
        computer.registers[3].setInputsFromNonBus(numberToByte(22))


        computer.run(1);

        // expect(byteToNumber(computer.acc.getData()) ).equal(1 )

        expect(byteToNumber(computer.registers[3].getData())).equal(1)
    })

    it("CMP WITH NO RESULTS in RegB: #8 CMP, OP CODE: 111", () => {

        computer.registers[0].setInputsFromNonBus(numberToByte(2))
        computer.registers[3].setInputsFromNonBus(numberToByte(22)) //REG B will keep this value


        computer.run(1);

        // expect(byteToNumber(computer.acc.getData()) ).equal(1 )

        expect(byteToNumber(computer.registers[3].getData())).equal(22)
    })

    it("CMP WITH NO RESULTS in RegB: #8 CMP, OP CODE: 111", () => {

        computer.registers[1].setInputsFromNonBus(numberToByte(2))
        computer.registers[2].setInputsFromNonBus(numberToByte(122)) //REG B will keep this value


        computer.run(1);

        // expect(byteToNumber(computer.acc.getData()) ).equal(1 )

        expect(byteToNumber(computer.registers[2].getData())).equal(122)
    })

    it("CMP WITH NO RESULTS in RegB: #8 CMP, OP CODE: 111", () => {

        computer.registers[2].setInputsFromNonBus(numberToByte(2))
        computer.registers[1].setInputsFromNonBus(numberToByte(212)) //REG B will keep this value


        computer.run(1);

        // expect(byteToNumber(computer.acc.getData()) ).equal(1 )

        expect(byteToNumber(computer.registers[1].getData())).equal(212)
    })

    

});