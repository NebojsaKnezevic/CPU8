import { byteToNumber, numberToByte } from "../../constants/byte-conversion";
import type { Bit, Byte, IAluInputs, IAluOutputs } from "../../interface/interfaces";
import { EnableGate } from "../memory/enable-gate";
import { Adder8 } from "./adder8";
import { And8 } from "./and8";
import { Comparator8 } from "./comparator8";
import { Decoder3x8 } from "./decoder3x8";
import { AndGate, NandGate, NotGate } from "./logic-gates";
import { Not8 } from "./not8";
import { Or8 } from "./or8";
import { Shl } from "./shl";
import { Shr } from "./shr";
import { ZeroDetector8 } from "./zero-detector8";


export class Alu {

    private line: Array<{
        id: number,
        gate: Adder8 | Shr | Shl | Not8 | And8 | Or8 | Comparator8,
        enable: EnableGate,
        and?: AndGate
    }>;

    private nand: NandGate[];
    private decoder3x8: Decoder3x8;
    private zero: ZeroDetector8;

    private inputs: IAluInputs;

    constructor() {

        this.line = [
            { id: 1, gate: new Adder8(), enable: new EnableGate(null), and: new AndGate() },
            { id: 2, gate: new Shr(), enable: new EnableGate(null), and: new AndGate() },
            { id: 4, gate: new Shl(), enable: new EnableGate(null), and: new AndGate() },
            { id: 8, gate: new Not8(), enable: new EnableGate(null) },
            { id: 16, gate: new And8(), enable: new EnableGate(null) },
            { id: 32, gate: new Or8(), enable: new EnableGate(null) },
            { id: 64, gate: new Comparator8(), enable: new EnableGate(null) }
        ];

        this.nand = Array.from({ length: 3 }, () => new NandGate());
        this.decoder3x8 = new Decoder3x8();
        this.zero = new ZeroDetector8();

        this.inputs = {
            a: numberToByte(0),
            b: numberToByte(0),
            carry: 0,
            decoderInputs: {
                a: 0, b: 0, c: 0
            }
        }
    }

    setInputs(aluInput: IAluInputs) {
        for (const line of this.line) {
            if (line.gate instanceof Shl || line.gate instanceof Shr) {
                line.gate.setInputs(aluInput.a, aluInput.carry);
            } else if (line.gate instanceof Not8) {
                line.gate.setInputs(aluInput.a);
            } else if (line.gate instanceof Adder8) {
                line.gate.setInputs(aluInput.a, aluInput.b, aluInput.carry);
            } else {
                line.gate.setInputs(aluInput.a, aluInput.b);
            }
        }
        const { a, b, c } = aluInput.decoderInputs;
        this.decoder3x8.setInputs(a, b, c);
    }

    getOutput(): IAluOutputs {
        //here i first >>>>reversed<<<< decoder output then convertet into number!!!!!!
        const lineID = byteToNumber(this.decoder3x8.getOutput().reverse() as Byte);
        const activeLine = this.line.find(l => l.id === lineID);

        let output: IAluOutputs = {
            aLarger: 0,
            equal: 0,
            zero: 0,
            out: [0, 0, 0, 0, 0, 0, 0, 0],
            carryOut: 0
        }


        if (activeLine) {

            switch (true) {
                // Actually tri state buffers were used to enable carry out from respective chips, i ommited them here since they are unncesery in software simulation.
                case activeLine.gate instanceof Shl ||
                    activeLine.gate instanceof Shr ||
                    activeLine.gate instanceof Adder8:
                    output.out = activeLine.gate.getOutput()[0];
                    activeLine.and?.setInputs(1, activeLine.gate.getOutput()[1])
                    output.carryOut = activeLine.and?.getOutput() as Bit
                    break;
                case activeLine.gate instanceof Comparator8:
                    output.out = activeLine.gate.getOutput()[2];
                    // output.aLarger = activeLine.gate.getOutput()[0];
                    // output.equal = activeLine.gate.getOutput()[1];
                    break;
                case activeLine.gate instanceof Not8:
                    output.out = activeLine.gate.getOutput();
                    break;
                case activeLine.gate instanceof Or8 ||
                    activeLine.gate instanceof And8:
                    output.out = activeLine.gate.getOutput();
                    break;
            }

            // Zero flag
            this.zero.setInput(output.out);
            output.zero = this.zero.getOutput();
            
            const comparator = this.line.find(l => l.id === 64)
            // console.log(comparator?.gate.getOutput()[2])
            // a larger flag
            output.aLarger = comparator?.gate.getOutput()[0] as Bit;

            // equal flag
            output.equal = comparator?.gate.getOutput()[1]  as Bit;
        }

        return output;
    }
}