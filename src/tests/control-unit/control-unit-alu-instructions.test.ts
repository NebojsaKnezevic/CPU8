import { describe, it, expect } from "vitest";
import { Computer } from "../../CPU8/computer";
import { byteToNumber, numberToByte } from "../../constants/byte-conversion";

// - MSB (bit 7 – skroz levo) je uvek 1 ➝ označava validnu ALU instrukciju
// - Sledeća 3 bita su OP CODE (bitovi 6, 5, 4)
// - Poslednja 4 bita su parametri za REG A i REG B

// Format bita: [7] [6][5][4] [3][2] [1][0]
//              ^    opcode    RA       RB

// OP Code: 000 (0)
// Operacija: ADD
// Opis: Sabira A + B
// Komponenta: Adder8

// OP Code: 001 (1)
// Operacija: SHR (Shift Right)
// Opis: Pomera sve bitove A udesno; najviši bit se puni sa carry
// Komponenta: Shr

// OP Code: 010 (2)
// Operacija: SHL (Shift Left)
// Opis: Pomera sve bitove A ulevo; najniži bit se puni sa carry
// Komponenta: Shl

// OP Code: 011 (3)
// Operacija: NOT
// Opis: Inverzija svih bitova A (bitwise NOT)
// Komponenta: Not8

// OP Code: 100 (4)
// Operacija: AND
// Opis: Bitovni AND između A i B
// Komponenta: And8

// OP Code: 101 (5)
// Operacija: OR
// Opis: Bitovni OR između A i B
// Komponenta: Or8

// OP Code: 110 (6)
// Operacija: CMP (Compare)
// Opis: Poredi A i B, postavlja izlaze: aLarger i equal
// Komponenta: Comparator8

// OP Code: 111 (7)
// Operacija: Nedefinisana (nije korišćena u knjizi)
// Može se koristiti za buduće proširenje ALU-a


describe("ALU INSTRUCTIONS: MSB:1 OPCODE:000 RA:00 RB:00", () => {
    const computer = new Computer();
    computer.insertProgramIntoRAM(0, [
        [1, 0, 0, 0, 0, 0, 1, 1],
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


        computer.registers[0].setInputsFromNonBus(numberToByte(1))
        computer.registers[1].setInputsFromNonBus(numberToByte(2))

        computer.registers[2].setInputsFromNonBus(numberToByte(3))
        computer.registers[3].setInputsFromNonBus(numberToByte(4))

        computer.run(1);

        // expect(byteToNumber(computer.acc.getData()) ).equal(33 )

        expect(byteToNumber(computer.registers[3].getData())).equal(5)
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