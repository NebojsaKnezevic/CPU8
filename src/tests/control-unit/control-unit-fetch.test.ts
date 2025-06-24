

import { describe, it, expect } from "vitest";
import { Bus } from "../../CPU8/bus/bus";
import { Ram } from "../../CPU8/memory/ram";
import { Register } from "../../CPU8/memory/register";
import { Bus1 } from "../../CPU8/bus/bus1";
import { Alu } from "../../CPU8/logic/alu";
import { ControlUnit } from "../../CPU8/logic/control-unit/control-unit";
import { Clock } from "../../CPU8/clock/clock";
import { byteToNumber, numberToByte } from "../../constants/byte-conversion";

describe("Control Unit", () => {
    const bus = new Bus();

    const ram = new Ram(bus);
    const registers = Array.from({ length: 4 }, () => new Register(bus));
    const tmp = new Register(bus);
    const bus1 = new Bus1(tmp);
    // bus.setInputs(tmp.getData());
    const acc = new Register(bus);
    const iar = new Register(bus);
    const ir = new Register(bus);
    const alu = new Alu();
    acc.initAluConnection(alu);
    const controlUnit = new ControlUnit(alu, ram, registers, tmp, bus1, acc, iar, ir);

    ram.setDataManually(0, [
        [1, 0, 1, 1, 0, 0, 1, 0],
        [0, 1, 1, 0, 1, 0, 0, 1],
        [1, 1, 0, 0, 0, 1, 1, 0],
        [0, 0, 1, 1, 1, 0, 0, 1],
        [1, 0, 0, 0, 1, 1, 0, 1],
        [0, 1, 0, 1, 1, 1, 1, 0],
        [1, 1, 1, 0, 0, 0, 1, 1],
        [0, 0, 0, 1, 1, 1, 0, 0],
        [1, 0, 1, 0, 1, 1, 0, 0],
        [0, 1, 0, 0, 0, 1, 0, 1]
    ]);

    const clock = new Clock();

    it("should fetch proper data from RAM", () => {
        //first cycles always begin with 23, the rest are 24 clock signals
        for (let i = 0; i < 23; i++) {

            alu.setInputs({
                a: bus.getOutput(),
                b: bus1.getOutput(),
                carry: 0,
                decoderInputs: {
                    a: 0, b: 0, c: 0 // ADD
                }
            });

            controlUnit.setInputs(clock.getOutput());

            clock.setInputs();

            const iarValue = iar.getData();
            const is0 = JSON.stringify(iarValue) === JSON.stringify(numberToByte(0));
            const is1 = JSON.stringify(iarValue) === JSON.stringify(numberToByte(1));

            expect(is0 || is1).toBe(true);

            // expect(ir.getData()).toEqual(ram.getRamCellManually(0).register.getData());
            const irValue = ir.getData();
            const ir0 = JSON.stringify(irValue) === JSON.stringify(numberToByte(0));
            const ir1 = JSON.stringify(irValue) === JSON.stringify(ram.getRamCellManually(0).register.getData());

            expect(ir0 || ir1).toBe(true);
        }
    })

    it("should fetch proper data from RAM", () => {
        //first cycles always begin with 23, the rest are 24 clock signals
        for (let i = 0; i < 24; i++) {

            alu.setInputs({
                a: bus.getOutput(),
                b: bus1.getOutput(),
                carry: 0,
                decoderInputs: {
                    a: 0, b: 0, c: 0 // ADD
                }
            });

            controlUnit.setInputs(clock.getOutput());

            clock.setInputs();

            const iarValue = iar.getData();
            const is0 = JSON.stringify(iarValue) === JSON.stringify(numberToByte(1));
            const is1 = JSON.stringify(iarValue) === JSON.stringify(numberToByte(2));

            expect(is0 || is1).toBe(true);

            const irValue = ir.getData();
            const ir0 = JSON.stringify(irValue) === JSON.stringify(ram.getRamCellManually(0).register.getData());
            const ir1 = JSON.stringify(irValue) === JSON.stringify(ram.getRamCellManually(1).register.getData());

            expect(ir0 || ir1).toBe(true);
        }
    })

    it("should fetch proper data from RAM", () => {
        //first cycles always begin with 23, the rest are 24 clock signals
        for (let i = 0; i < 24; i++) {

            alu.setInputs({
                a: bus.getOutput(),
                b: bus1.getOutput(),
                carry: 0,
                decoderInputs: {
                    a: 0, b: 0, c: 0 // ADD
                }
            });

            controlUnit.setInputs(clock.getOutput());

            clock.setInputs();

            const iarValue = iar.getData();
            const is0 = JSON.stringify(iarValue) === JSON.stringify(numberToByte(2));
            const is1 = JSON.stringify(iarValue) === JSON.stringify(numberToByte(3));

            expect(is0 || is1).toBe(true);

            const irValue = ir.getData();
            const ir0 = JSON.stringify(irValue) === JSON.stringify(ram.getRamCellManually(1).register.getData());
            const ir1 = JSON.stringify(irValue) === JSON.stringify(ram.getRamCellManually(2).register.getData());

            expect(ir0 || ir1).toBe(true);
        }
    })

    it("should fetch proper data from RAM", () => {
        //first cycles always begin with 23, the rest are 24 clock signals
        for (let i = 0; i < 24; i++) {

            alu.setInputs({
                a: bus.getOutput(),
                b: bus1.getOutput(),
                carry: 0,
                decoderInputs: {
                    a: 0, b: 0, c: 0 // ADD
                }
            });

            controlUnit.setInputs(clock.getOutput());

            clock.setInputs();

            const iarValue = iar.getData();
            const is0 = JSON.stringify(iarValue) === JSON.stringify(numberToByte(3));
            const is1 = JSON.stringify(iarValue) === JSON.stringify(numberToByte(4));

            expect(is0 || is1).toBe(true);

            const irValue = ir.getData();
            const ir0 = JSON.stringify(irValue) === JSON.stringify(ram.getRamCellManually(2).register.getData());
            const ir1 = JSON.stringify(irValue) === JSON.stringify(ram.getRamCellManually(3).register.getData());

            expect(ir0 || ir1).toBe(true);
        }
    })

    it("should fetch proper data from RAM", () => {
        //first cycles always begin with 23, the rest are 24 clock signals
        for (let i = 0; i < 24; i++) {

            alu.setInputs({
                a: bus.getOutput(),
                b: bus1.getOutput(),
                carry: 0,
                decoderInputs: {
                    a: 0, b: 0, c: 0 // ADD
                }
            });

            controlUnit.setInputs(clock.getOutput());

            clock.setInputs();

            const iarValue = iar.getData();
            const is0 = JSON.stringify(iarValue) === JSON.stringify(numberToByte(4));
            const is1 = JSON.stringify(iarValue) === JSON.stringify(numberToByte(5));

            expect(is0 || is1).toBe(true);

            const irValue = ir.getData();
            const ir0 = JSON.stringify(irValue) === JSON.stringify(ram.getRamCellManually(3).register.getData());
            const ir1 = JSON.stringify(irValue) === JSON.stringify(ram.getRamCellManually(4).register.getData());

            expect(ir0 || ir1).toBe(true);
        }
    })
});