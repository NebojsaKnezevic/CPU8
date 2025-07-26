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
// Opis: Sabira RA + RB i upisuje rezultat u RB
// Komponenta: Adder8

// OP Code: 001 (1)
// Operacija: SHR (Shift Right)
// Opis: Pomera sve bitove RA udesno; najviši bit se puni sa carry, upisuje rezultat u RB
// Komponenta: Shr

// OP Code: 010 (2)
// Operacija: SHL (Shift Left)
// Opis: Pomera sve bitove RA ulevo; najniži bit se puni sa carry, upisuje rezultat u RB
// Komponenta: Shl

// OP Code: 011 (3)
// Operacija: NOT
// Opis: Inverzija svih bitova RA (bitwise NOT) i upisivanje rezultata u RB
// Komponenta: Not8

// OP Code: 100 (4)
// Operacija: AND
// Opis: Bitovni AND između RA i RB i upis rezultata u RB
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

//ALU 1  check ALU TEST!                    1 XXX - XX - XX

//Store is from REG to RAM, Store from RB to RAM address in RA
//Load is from RAM to REG, Load RB from RAM address in RA
//Store is from REG to RAM                  0 001 address value
//Load is from RAM to REG                   0 000 address value
//STORE: 1 LOAD: 0
//LOAD from next RAM address into RB,       0 010 -- 00
//Jump Register: jumps to address in RB     0 011 -- 00
//Jump Address: Jumps to next byte in RAM   0 100 -- --


describe("ALU INSTRUCTIONS: MSB:1 OPCODE:000 RA:00 RB:00", () => {
    const computer = new Computer();
  
    computer.insertProgramIntoRAM(20, [
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 1, 0, 0, 0, 1, 1],
        [0, 1, 1, 0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 1, 0],
        [0, 1, 0, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 1, 1, 0],
        [0, 0, 1, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 1, 1, 1, 1],
        [0, 0, 1, 0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 1, 1, 0],
        [0, 0, 1, 0, 0, 0, 1, 1],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [1, 0, 0, 1, 1, 1, 1, 0],
        [0, 0, 1, 0, 0, 0, 0, 1],
        [0, 1, 0, 0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [1, 0, 0, 1, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 1, 0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [1, 0, 0, 1, 1, 1, 1, 0],
        [0, 0, 1, 0, 0, 0, 1, 1],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [1, 0, 1, 0, 1, 1, 1, 0],
        [0, 0, 1, 0, 0, 0, 0, 1],
        [0, 1, 0, 0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [1, 0, 1, 0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 1, 1],
        [1, 0, 1, 0, 0, 1, 1, 0],
        [0, 0, 1, 0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [1, 0, 1, 0, 1, 1, 1, 0],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 1],
        [1, 0, 1, 1, 0, 0, 0, 1],
        [0, 0, 1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 1, 1, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 1, 1],
        [1, 0, 0, 1, 1, 0, 1, 1],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0, 1, 1, 1],
        [1, 1, 0, 0, 0, 0, 1, 1],
        [0, 0, 1, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 1, 1, 1, 1],
        [0, 0, 1, 0, 0, 0, 0, 1],
        [0, 0, 1, 0, 0, 1, 1, 1],
        [1, 1, 0, 0, 1, 1, 0, 1],
        [0, 0, 1, 0, 0, 0, 1, 1],
        [1, 0, 0, 1, 1, 0, 1, 1],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0, 1, 1, 1],
        [1, 1, 0, 1, 0, 0, 1, 1],
        [0, 0, 1, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 1, 1, 1, 1],
        [0, 0, 1, 0, 0, 0, 0, 1],
        [0, 0, 1, 0, 0, 1, 1, 1],
        [1, 1, 0, 1, 1, 1, 0, 1],
        [0, 0, 1, 0, 0, 0, 1, 1],
        [0, 1, 1, 1, 0, 0, 1, 1],
        [0, 0, 1, 0, 0, 0, 0, 1],
        [0, 1, 1, 1, 0, 1, 0, 0],
        [1, 1, 1, 0, 1, 1, 0, 1],
        [0, 0, 1, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1, 1, 1, 1],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [1, 1, 1, 0, 0, 0, 1, 0],
        [0, 0, 1, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1, 1, 1, 1],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 1, 0],
        [0, 0, 1, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1, 1, 1, 1],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 0, 0, 0]
    ]
    );

    it("ADD", () => {
        computer.run(3);
        expect(computer.registers[1].getData()).toEqual(numberToByte(21))
        expect(computer.flags.getData()[3]).toBe(1);
    });

    it("ADD", () => {
        computer.run(3);
        expect(computer.registers[1].getData()).toEqual(numberToByte(18))
        expect(computer.flags.getData()[3]).toBe(0);
    });

    it("ADD", () => {
        computer.run(3);
        expect(computer.registers[2].getData()).toEqual(numberToByte(177))
    });

    it("ADD", () => {
        computer.run(3);
        expect(computer.registers[2].getData()).toEqual(numberToByte(32))
    });

    it("SHR", () => {
        computer.run(3);
        expect(computer.registers[2].getData()).toEqual(numberToByte(8))
    });

    it("SHR", () => {
        computer.run(3);
        expect(computer.registers[0].getData()).toEqual(numberToByte(34))
    });

    it("SHR", () => {
        computer.run(3);
        expect(byteToNumber(computer.registers[2].getData())).toEqual(byteToNumber(numberToByte(0)));
        expect(computer.flags.getData()[3]).toBe(1);
    });


    it("SHL", () => {
        computer.run(3);
        expect(computer.registers[2].getData()).toEqual(numberToByte(33))
    });

    it("SHL", () => {
        computer.run(3);
        expect(computer.registers[0].getData()).toEqual(numberToByte(136))
    });


    it("SHL", () => {
        computer.run(3);
        expect(byteToNumber(computer.registers[2].getData())).toEqual(byteToNumber(numberToByte(332 - 256)));
        expect(computer.flags.getData()[3]).toBe(1);
    });

    it("NOT", () => {
        computer.run(2);
        expect(byteToNumber(computer.registers[1].getData())).toEqual(byteToNumber(numberToByte(240)));

    });


    it("NOT", () => {
        computer.run(2);
        expect(byteToNumber(computer.registers[0].getData())).toEqual(byteToNumber(numberToByte(0)));

    });

    it("AND", () => {
        computer.run(3);
        expect(byteToNumber(computer.registers[3].getData())).toEqual(byteToNumber(numberToByte(19)));

    });

    it("AND", () => {
        computer.run(3);
        expect(byteToNumber(computer.registers[1].getData())).toEqual(byteToNumber(numberToByte(7)));

    });

    it("OR", () => {
        computer.run(3);
        expect(byteToNumber(computer.registers[3].getData())).toEqual(byteToNumber(numberToByte(191)));

    });

    it("OR", () => {
        computer.run(3);
        expect(byteToNumber(computer.registers[1].getData())).toEqual(byteToNumber(numberToByte(47)));


    });

    it("XOR", () => {
        computer.run(3);
        expect(byteToNumber(computer.registers[1].getData())).toEqual(byteToNumber(numberToByte(7)));
    });

    it("XOR", () => {
        computer.run(3);
        expect(byteToNumber(computer.registers[2].getData())).toEqual(byteToNumber(numberToByte(31)));
    });

    it("CMP", () => {
        computer.run(3);
        expect(computer.alu.getOutput().aLarger).toEqual(byteToNumber(numberToByte(1)));
        expect(computer.alu.getOutput().equal).toEqual(byteToNumber(numberToByte(0)));
    });

    it("CMP", () => {
        computer.run(3);
        expect(computer.alu.getOutput().aLarger).toEqual(byteToNumber(numberToByte(0)));
        expect(computer.alu.getOutput().equal).toEqual(byteToNumber(numberToByte(0)));
    });

    it("CMP", () => {
        computer.run(3);
        expect(computer.alu.getOutput().aLarger).toEqual(byteToNumber(numberToByte(0)));
        expect(computer.alu.getOutput().equal).toEqual(byteToNumber(numberToByte(1)));
    });

});