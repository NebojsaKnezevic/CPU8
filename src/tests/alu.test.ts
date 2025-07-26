import { describe, it, expect } from "vitest";
import { Alu } from "../CPU8/logic/alu";
import type { Bit, IAluInputs, IAluOutputs } from "../interface/interfaces";
import { numberToByte } from "../constants/byte-conversion";

// export interface IAluInputs{
//     a: Byte,
//     b: Byte,
//     carry: Bit,
//     decoderInputs: {
//         a: Bit, b: Bit, c: Bit
//     }
// }

describe("Alu", () => {
    const alu = new Alu();

    it("1 OPCODE: 0, 0, 0 == Adder", () => {
        const aluInput: IAluInputs = {
            a: numberToByte(10),
            b: numberToByte(49),
            carry: 1,
            decoderInputs: { // opcode
                a: 0, b: 0, c: 0
            }
        }
        alu.setInputsTest(aluInput);

        const aluOutput: IAluOutputs = alu.getOutput();

        const expectedOutput: IAluOutputs = {
            aLarger: 0,
            equal: 0,
            zero: 0,
            out: numberToByte(10 + 49 + 1),
            carryOut: 0
        }

        expect(aluOutput).toEqual(expectedOutput);
    });

    it("2 OPCODE: 0, 0, 0 == Adder", () => {
        const aluInput: IAluInputs = {
            a: numberToByte(110),
            b: numberToByte(49),
            carry: 0,
            decoderInputs: { // opcode
                a: 0, b: 0, c: 0
            }
        }

        alu.setInputsTest(aluInput);
        const aluOutput: IAluOutputs = alu.getOutput();

        const expectedOutput: IAluOutputs = {
            aLarger: 1,
            equal: 0,
            zero: 0,
            out: numberToByte(110 + 49),
            carryOut: 0
        }

        expect(aluOutput).toEqual(expectedOutput);

        // console.log(aluOutput)
    });

    it("3 OPCODE: 0, 0, 0 == Adder", () => {
        const aluInput: IAluInputs = {
            a: numberToByte(130),
            b: numberToByte(149),
            carry: 1,
            decoderInputs: { // opcode
                a: 0, b: 0, c: 0
            }
        }
        alu.setInputsTest(aluInput);
        const aluOutput: IAluOutputs = alu.getOutput();

        const expectedOutput: IAluOutputs = {
            aLarger: 0,
            equal: 0,
            zero: 0,
            out: numberToByte(130 + 149 + 1),
            carryOut: 1
        }

        expect(aluOutput).toEqual(expectedOutput);
    });

    it("4 OPCODE: 0, 0, 0 == Adder", () => {
        const aluInput: IAluInputs = {
            a: numberToByte(0),
            b: numberToByte(9),
            carry: 1,
            decoderInputs: { // opcode
                a: 0, b: 0, c: 0
            }
        }
        alu.setInputsTest(aluInput);
        const aluOutput: IAluOutputs = alu.getOutput();

        const expectedOutput: IAluOutputs = {
            aLarger: 0,
            equal: 0,
            zero: 0,
            out: numberToByte(10),
            carryOut: 0
        }

        expect(aluOutput).toEqual(expectedOutput);
    });

    it("5 OPCODE: 0, 0, 0 == Adder", () => {
        const aluInput: IAluInputs = {
            a: numberToByte(0),
            b: numberToByte(0),
            carry: 0,
            decoderInputs: { // opcode
                a: 0, b: 0, c: 0
            }
        }
        alu.setInputsTest(aluInput);
        const aluOutput: IAluOutputs = alu.getOutput();

        const expectedOutput: IAluOutputs = {
            aLarger: 0,
            equal: 1,
            zero: 1,
            out: numberToByte(0),
            carryOut: 0
        }

        expect(aluOutput).toEqual(expectedOutput);
    });

    it("1 OPCODE: 0, 0, 1 == SHR(ROR) Aka DIVIDER by 2", () => {
        const aluInput: IAluInputs = {
            a: numberToByte(0),
            b: numberToByte(0), //this is ignored
            carry: 0,
            decoderInputs: { // opcode
                a: 0, b: 0, c: 1
            }
        }
        alu.setInputsTest(aluInput);
        const aluOutput: IAluOutputs = alu.getOutput();

        const expectedOutput: IAluOutputs = {
            aLarger: 0,
            equal: 1,
            zero: 1,
            out: numberToByte(0),
            carryOut: 0
        }

        expect(aluOutput).toEqual(expectedOutput);
    });

    it("2 OPCODE: 0, 0, 1 == SHR(ROR) Aka DIVIDER by 2", () => {
        const aluInput: IAluInputs = {
            a: numberToByte(0),
            b: numberToByte(0), //this is ignored
            carry: 1,
            decoderInputs: { // opcode
                a: 0, b: 0, c: 1
            }
        }
        alu.setInputsTest(aluInput);
        const aluOutput: IAluOutputs = alu.getOutput();

        const expectedOutput: IAluOutputs = {
            aLarger: 0,
            equal: 1,
            zero: 0,
            out: numberToByte(128),
            carryOut: 0
        }
        expect(aluOutput).toEqual(expectedOutput);

    });

    it("3 OPCODE: 0, 0, 1 == SHR(ROR) Aka DIVIDER by 2", () => {
        const aluInput: IAluInputs = {
            a: numberToByte(13),
            b: numberToByte(0), //this is ignored
            carry: 0,
            decoderInputs: { // opcode
                a: 0, b: 0, c: 1
            }
        }
        alu.setInputsTest(aluInput);
        const aluOutput: IAluOutputs = alu.getOutput();

        const expectedOutput: IAluOutputs = {
            aLarger: 1,
            equal: 0,
            zero: 0,
            out: numberToByte(6),
            carryOut: 1
        }

        expect(aluOutput).toEqual(expectedOutput);
    });

    it("4 OPCODE: 0, 0, 1 == SHR(ROR) Aka DIVIDER by 2", () => {
        const aluInput: IAluInputs = {
            a: numberToByte(128),
            b: numberToByte(0), //this is ignored
            carry: 0,
            decoderInputs: { // opcode
                a: 0, b: 0, c: 1
            }
        }
        alu.setInputsTest(aluInput);
        const aluOutput: IAluOutputs = alu.getOutput();

        const expectedOutput: IAluOutputs = {
            aLarger: 1,
            equal: 0,
            zero: 0,
            out: numberToByte(64),
            carryOut: 0
        }

        expect(aluOutput).toEqual(expectedOutput);
    });

    it("5 OPCODE: 0, 0, 1 == SHR(ROR) Aka DIVIDER by 2", () => {
        const aluInput: IAluInputs = {
            a: numberToByte(77),
            b: numberToByte(0), //this is ignored
            carry: 0,
            decoderInputs: { // opcode
                a: 0, b: 0, c: 1
            }
        }
        alu.setInputsTest(aluInput);
        const aluOutput: IAluOutputs = alu.getOutput();

        const expectedOutput: IAluOutputs = {
            aLarger: 1,
            equal: 0,
            zero: 0,
            out: numberToByte(38),
            carryOut: 1
        }

        expect(aluOutput).toEqual(expectedOutput);
    });

    it("1 OPCODE: 0, 1, 0 == SHL(ROL) Aka MULTIPLIER by 2", () => {
        const aluInput: IAluInputs = {
            a: numberToByte(77),
            b: numberToByte(0), //this is ignored
            carry: 0,
            decoderInputs: { // opcode
                a: 0, b: 1, c: 0
            }
        }
        alu.setInputsTest(aluInput);
        const aluOutput: IAluOutputs = alu.getOutput();

        const expectedOutput: IAluOutputs = {
            aLarger: 1,
            equal: 0,
            zero: 0,
            out: numberToByte(154),
            carryOut: 0
        }

        expect(aluOutput).toEqual(expectedOutput);
    });

    it("2 OPCODE: 0, 1, 0 == SHL(ROL) Aka MULTIPLIER by 2", () => {
        const aluInput: IAluInputs = {
            a: numberToByte(1),
            b: numberToByte(0), //this is ignored
            carry: 0,
            decoderInputs: { // opcode
                a: 0, b: 1, c: 0
            }
        }
        alu.setInputsTest(aluInput);
        const aluOutput: IAluOutputs = alu.getOutput();

        const expectedOutput: IAluOutputs = {
            aLarger: 1,
            equal: 0,
            zero: 0,
            out: numberToByte(2),
            carryOut: 0
        }

        expect(aluOutput).toEqual(expectedOutput);
    });

    it("3 OPCODE: 0, 1, 0 == SHL(ROL) Aka MULTIPLIER by 2", () => {
        const aluInput: IAluInputs = {
            a: numberToByte(0),
            b: numberToByte(0), //this is ignored
            carry: 0,
            decoderInputs: { // opcode
                a: 0, b: 1, c: 0
            }
        }
        alu.setInputsTest(aluInput);
        const aluOutput: IAluOutputs = alu.getOutput();

        const expectedOutput: IAluOutputs = {
            aLarger: 0,
            equal: 1,
            zero: 1,
            out: numberToByte(0),
            carryOut: 0
        }

        expect(aluOutput).toEqual(expectedOutput);
    });

    it("4 OPCODE: 0, 1, 0 == SHL(ROL) Aka MULTIPLIER by 2", () => {
        const aluInput: IAluInputs = {
            a: numberToByte(155),
            b: numberToByte(0), //this is ignored
            carry: 1,
            decoderInputs: { // opcode
                a: 0, b: 1, c: 0
            }
        }
        alu.setInputsTest(aluInput);
        const aluOutput: IAluOutputs = alu.getOutput();

        const expectedOutput: IAluOutputs = {
            aLarger: 1,
            equal: 0,
            zero: 0,
            out: numberToByte(311),
            carryOut: 1
        }
        expect(aluOutput).toEqual(expectedOutput);
    });

    it("5 OPCODE: 0, 1, 0 == SHL(ROL) Aka MULTIPLIER by 2", () => {
        const aluInput: IAluInputs = {
            a: numberToByte(455),
            b: numberToByte(0), //this is ignored
            carry: 1,
            decoderInputs: { // opcode
                a: 0, b: 1, c: 0
            }
        }
        alu.setInputsTest(aluInput);
        const aluOutput: IAluOutputs = alu.getOutput();

        const expectedOutput: IAluOutputs = {
            aLarger: 1,
            equal: 0,
            zero: 0,
            out: numberToByte(911),
            carryOut: 1
        }

        expect(aluOutput).toEqual(expectedOutput);
    });

    it("1 OPCODE: 0, 1, 1 == Not8 ", () => {
        const aluInput: IAluInputs = {
            a: numberToByte(0),
            b: numberToByte(0), //this is ignored
            carry: 0,
            decoderInputs: { // opcode
                a: 0, b: 1, c: 1
            }
        }
        alu.setInputsTest(aluInput);
        const aluOutput: IAluOutputs = alu.getOutput();

        const expectedOutput: IAluOutputs = {
            aLarger: 0,
            equal: 1,
            zero: 0,
            out: numberToByte(255),
            carryOut: 0
        };

        expect(aluOutput).toEqual(expectedOutput);
    });

    it("2 OPCODE: 0, 1, 1 == Not8 ", () => {
        const aluInput: IAluInputs = {
            a: numberToByte(1),
            b: numberToByte(0), //this is ignored
            carry: 1,
            decoderInputs: { // opcode
                a: 0, b: 1, c: 1
            }
        }
        alu.setInputsTest(aluInput);
        const aluOutput: IAluOutputs = alu.getOutput();

        const expectedOutput: IAluOutputs = {
            aLarger: 1,
            equal: 0,
            zero: 0,
            out: numberToByte(254),
            carryOut: 0
        };
        // console.log(aluInput,aluOutput)
        expect(aluOutput).toEqual(expectedOutput);
    });

    it("3 OPCODE: 0, 1, 1 == Not8 ", () => {
        const aluInput: IAluInputs = {
            a: numberToByte(33),
            b: numberToByte(0), //this is ignored
            carry: 1,
            decoderInputs: { // opcode
                a: 0, b: 1, c: 1
            }
        }
        alu.setInputsTest(aluInput);
        const aluOutput: IAluOutputs = alu.getOutput();

        const expectedOutput: IAluOutputs = {
            aLarger: 1,
            equal: 0,
            zero: 0,
            out: numberToByte(255 - 33),
            carryOut: 0
        };
        expect(aluOutput).toEqual(expectedOutput);
    });


    it("4 OPCODE: 0, 1, 1 == Not8 ", () => {
        const aluInput: IAluInputs = {
            a: numberToByte(128),
            b: numberToByte(0), //this is ignored
            carry: 1,
            decoderInputs: { // opcode
                a: 0, b: 1, c: 1
            }
        }
        alu.setInputsTest(aluInput);
        const aluOutput: IAluOutputs = alu.getOutput();

        const expectedOutput: IAluOutputs = {
            aLarger: 1,
            equal: 0,
            zero: 0,
            out: numberToByte(255 - 128),
            carryOut: 0
        };
        // console.log(aluInput,aluOutput)
        expect(aluOutput).toEqual(expectedOutput);
    });

    it("5 OPCODE: 0, 1, 1 == Not8 ", () => {
        const aluInput: IAluInputs = {
            a: numberToByte(255),
            b: numberToByte(0), //this is ignored
            carry: 1,
            decoderInputs: { // opcode
                a: 0, b: 1, c: 1
            }
        }
        alu.setInputsTest(aluInput);
        const aluOutput: IAluOutputs = alu.getOutput();

        const expectedOutput: IAluOutputs = {
            aLarger: 1,
            equal: 0,
            zero: 1,
            out: numberToByte(255 - 255),
            carryOut: 0
        };

        expect(aluOutput).toEqual(expectedOutput);
    });

    it("1 OPCODE: 1, 0, 0 == And8 ", () => {
        const aluInput: IAluInputs = {
            a: numberToByte(255),
            b: numberToByte(255),
            carry: 1,
            decoderInputs: { // opcode
                a: 1, b: 0, c: 0
            }
        }
        alu.setInputsTest(aluInput);
        const aluOutput: IAluOutputs = alu.getOutput();

        const expectedOutput: IAluOutputs = {
            aLarger: 0,
            equal: 1,
            zero: 0,
            out: numberToByte(255),
            carryOut: 0
        };

        expect(aluOutput).toEqual(expectedOutput);
    });

    it("2 OPCODE: 1, 0, 0 == And8 ", () => {
        const aluInput: IAluInputs = {
            a: numberToByte(254),
            b: numberToByte(255),
            carry: 1,
            decoderInputs: { // opcode
                a: 1, b: 0, c: 0
            }
        }
        alu.setInputsTest(aluInput);
        const aluOutput: IAluOutputs = alu.getOutput();

        const expectedOutput: IAluOutputs = {
            aLarger: 0,
            equal: 0,
            zero: 0,
            out: numberToByte(254),
            carryOut: 0
        };

        expect(aluOutput).toEqual(expectedOutput);
    });

    it("3 OPCODE: 1, 0, 0 == And8 ", () => {
        const aluInput: IAluInputs = {
            a: numberToByte(154),
            b: numberToByte(255),
            carry: 1,
            decoderInputs: { // opcode
                a: 1, b: 0, c: 0
            }
        }
        alu.setInputsTest(aluInput);
        const aluOutput: IAluOutputs = alu.getOutput();

        const expectedOutput: IAluOutputs = {
            aLarger: 0,
            equal: 0,
            zero: 0,
            out: numberToByte(154),
            carryOut: 0
        };

        expect(aluOutput).toEqual(expectedOutput);
    });

    it("4 OPCODE: 1, 0, 0 == And8 ", () => {
        const aluInput: IAluInputs = {
            a: numberToByte(254),
            b: numberToByte(155),
            carry: 1,
            decoderInputs: { // opcode
                a: 1, b: 0, c: 0
            }
        }
        alu.setInputsTest(aluInput);
        const aluOutput: IAluOutputs = alu.getOutput();

        const expectedOutput: IAluOutputs = {
            aLarger: 1,
            equal: 0,
            zero: 0,
            out: numberToByte(154),
            carryOut: 0
        };
        console.log(aluOutput, expectedOutput)
        expect(aluOutput).toEqual(expectedOutput);

    });

    it("5 OPCODE: 1, 0, 0 == And8 ", () => {
        const aluInput: IAluInputs = {
            a: numberToByte(0),
            b: numberToByte(155),
            carry: 1,
            decoderInputs: { // opcode
                a: 1, b: 0, c: 0
            }
        }
        alu.setInputsTest(aluInput);
        const aluOutput: IAluOutputs = alu.getOutput();

        const expectedOutput: IAluOutputs = {
            aLarger: 0,
            equal: 0,
            zero: 1,
            out: numberToByte(0),
            carryOut: 0
        };

        expect(aluOutput).toEqual(expectedOutput);
    });

    it("1 OPCODE: 1, 0, 1 == Or8 ", () => {
        const aluInput: IAluInputs = {
            a: numberToByte(0),
            b: numberToByte(0),
            carry: 0,
            decoderInputs: { a: 1, b: 0, c: 1 }
        };
        alu.setInputsTest(aluInput);
        const aluOutput = alu.getOutput();

        const expectedOutput: IAluOutputs = {
            aLarger: 0,
            equal: 1,
            zero: 1,
            out: numberToByte(0),
            carryOut: 0
        };

        expect(aluOutput).toEqual(expectedOutput);
    });

    it("2 OPCODE: 1, 0, 1 == Or8 ", () => {
        const aluInput: IAluInputs = {
            a: numberToByte(0),
            b: numberToByte(155),
            carry: 0,
            decoderInputs: { a: 1, b: 0, c: 1 }
        };
        alu.setInputsTest(aluInput);
        const aluOutput = alu.getOutput();

        const expectedOutput: IAluOutputs = {
            aLarger: 0,
            equal: 0,
            zero: 0,
            out: numberToByte(155),
            carryOut: 0
        };

        expect(aluOutput).toEqual(expectedOutput);
    });

    it("3 OPCODE: 1, 0, 1 == Or8 ", () => {
        const aluInput: IAluInputs = {
            a: numberToByte(170),
            b: numberToByte(85),
            carry: 0,
            decoderInputs: { a: 1, b: 0, c: 1 }
        };
        alu.setInputsTest(aluInput);
        const aluOutput = alu.getOutput();

        const expectedOutput: IAluOutputs = {
            aLarger: 1,
            equal: 0,
            zero: 0,
            out: numberToByte(255),
            carryOut: 0
        };

        expect(aluOutput).toEqual(expectedOutput);
    });

    it("4 OPCODE: 1, 0, 1 == Or8 ", () => {
        const aluInput: IAluInputs = {
            a: numberToByte(15),
            b: numberToByte(240),
            carry: 0,
            decoderInputs: { a: 1, b: 0, c: 1 }
        };
        alu.setInputsTest(aluInput);
        const aluOutput = alu.getOutput();

        const expectedOutput: IAluOutputs = {
            aLarger: 0,
            equal: 0,
            zero: 0,
            out: numberToByte(255),
            carryOut: 0
        };

        expect(aluOutput).toEqual(expectedOutput);
    });

    it("5 OPCODE: 1, 0, 1 == Or8 ", () => {
        const aluInput: IAluInputs = {
            a: numberToByte(204),
            b: numberToByte(51),
            carry: 0,
            decoderInputs: { a: 1, b: 0, c: 1 }
        };
        alu.setInputsTest(aluInput);
        const aluOutput = alu.getOutput();

        const expectedOutput: IAluOutputs = {
            aLarger: 1,
            equal: 0,
            zero: 0,
            out: numberToByte(255),
            carryOut: 0
        };

        expect(aluOutput).toEqual(expectedOutput);
    });


    // greater,  // bit 4
    // equal,    // bit 2
    // less,     // bit 1

    it("should compute a XOR b correctly", () => {
        const tests = [
            { a: 204, b: 51, expected: 255, aLarger:1, equal:0 },
            { a: 51, b: 204, expected: 255, aLarger:0, equal:0  },
            { a: 100, b: 101, expected: 1, aLarger:0, equal:0  },
            { a: 2, b: 1, expected: 3, aLarger:1, equal:0  },
            { a: 222, b: 2, expected: 220 , aLarger:1, equal:0  },
        ];

        for (const { a, b, expected, aLarger, equal } of tests) {
            const aluInput: IAluInputs = {
                a: numberToByte(a,),
                b: numberToByte(b),
                carry: 0,
                decoderInputs: { a: 1, b: 1, c: 0 }
            };
            alu.setInputsTest(aluInput);
            const aluOutput = alu.getOutput();

            const expectedOutput: IAluOutputs = {
                aLarger: aLarger as Bit,
                equal: equal as Bit,
                zero: 0,
                out: numberToByte(expected),
                carryOut: 0
            };
            console.log(expectedOutput.out)
            expect(aluOutput).toEqual(expectedOutput);
        }
    });






});