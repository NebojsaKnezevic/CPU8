
import type { Bit, IAluInputs, IAluOutputs } from "../../interface/interfaces";
import { Bus } from "../bus/bus";
import { EnableGate } from "../memory/enable-gate";
import { Adder8 } from "./adder8";
import { And8 } from "./and8";
import { Comparator8 } from "./comparator8";
import { Decoder3x8 } from "./decoder3x8";
import { AndGate } from "./logic-gates";
import { Not8 } from "./not8";
import { Or8 } from "./or8";
import { Shl } from "./shl";
import { Shr } from "./shr";
import { ZeroDetector8 } from "./zero-detector8";


export class Alu {



    // private nand: NandGate[];
    private decoder3x8: Decoder3x8;
    private zero: ZeroDetector8;

    private adder: Adder8;
    private adderEnable: EnableGate;
    private adderAnd: AndGate;

    private shr: Shr;
    private shrEnable: EnableGate;
    private shrAnd: AndGate;

    private shl: Shl;
    private shlEnable: EnableGate;
    private shlAnd: AndGate;

    private not8: Not8;
    private not8Enable: EnableGate;

    private and8: And8;
    private and8Enable: EnableGate;

    private or8: Or8;
    private or8Enable: EnableGate;

    private cmp: Comparator8;
    private cmpEnable: EnableGate;



    public aluInput: IAluInputs = {
        a: [0, 0, 0, 0, 0, 0, 0, 0],
        b: [0, 0, 0, 0, 0, 0, 0, 0],
        carry: 0,
        decoderInputs: {
            a: 0, b: 0, c: 0
        }
    };

    private output: IAluOutputs = {
        aLarger: 0,
        equal: 0,
        zero: 0,
        out: [0, 0, 0, 0, 0, 0, 0, 0],
        carryOut: 0
    }

    constructor() {
        const bus = new Bus();
        this.decoder3x8 = new Decoder3x8();
        this.zero = new ZeroDetector8();

        this.adder = new Adder8();
        this.adderEnable = new EnableGate(bus);
        this.adderAnd = new AndGate();

        this.shr = new Shr();
        this.shrEnable = new EnableGate(bus);
        this.shrAnd = new AndGate();

        this.shl = new Shl();
        this.shlEnable = new EnableGate(bus);
        this.shlAnd = new AndGate();

        this.not8 = new Not8();
        this.not8Enable = new EnableGate(bus);

        this.and8 = new And8();
        this.and8Enable = new EnableGate(bus);

        this.or8 = new Or8();
        this.or8Enable = new EnableGate(bus);

        this.cmp = new Comparator8();
        this.cmpEnable = new EnableGate(bus);
    }

    setInputs(input: IAluInputs) {
        this.aluInput = input;
    
    }

    setCarryIn(c: Bit){
        this.aluInput.carry = c;
    }

    setInputsTest(input: IAluInputs) {
        this.setInputs(input);
    }

    getOutput(): IAluOutputs {
        const input = this.aluInput

        
        this.output = {
            aLarger: 0,
            equal: 0,
            zero: 0,
            out: [0, 0, 0, 0, 0, 0, 0, 0],
            carryOut: 0
        }


        this.decoder3x8.setInputs(
            input.decoderInputs.a,
            input.decoderInputs.b,
            input.decoderInputs.c
        );

        const [a, b, c, d, e, f, g, _] = this.decoder3x8.getOutput() //LSB to MSB

        this.handleAdder(input, a);
        this.handleShr(input, b);
        this.handleShl(input, c);
        this.handleNot(input, d);
        this.handleAnd(input, e);
        this.handleOr(input, f);
        this.handleCmp(input, g);
        this.handleZero();
        

        
        return this.output;
    }

    private controlledBufferChipLogic(a: Bit, value: Bit) {
        if (a === 1) return value;
        else return 0;
    }

    private handleZero(){
        this.zero.setInput(this.output.out);
        this.output.zero = this.zero.getOutput()
        
    }

    private handleAdder(input: IAluInputs, x: Bit){

        this.adder.setInputs(input.a, input.b, input.carry);
        const [aByte, aBit] = this.adder.getOutput();
        this.adderAnd.setInputs(aBit, x);

        if (x === 1) {
            this.output = {
                ...this.output,
                out: this.adderEnable.getData(aByte, x),
                carryOut: this.controlledBufferChipLogic(x, aBit)

            }
        }
    }

    private handleShr(input: IAluInputs, x: Bit){
        this.shr.setInputs(input.a, input.carry);
        const [outByte, outBit] = this.shr.getOutput();
        this.shrAnd.setInputs(outBit, x);

        if (x === 1) {
            this.output = {
                ...this.output,
                out: this.shrEnable.getData(outByte, x),
                carryOut: this.controlledBufferChipLogic(x, outBit)

            }
        }
    }

    private handleShl(input: IAluInputs, x: Bit){
        this.shl.setInputs(input.a, input.carry);
        const [outByte, outBit] = this.shl.getOutput();
        this.shlAnd.setInputs(outBit, x);

        if (x === 1) {
            this.output = {
                ...this.output,
                out: this.shlEnable.getData(outByte, x),
                carryOut: this.controlledBufferChipLogic(x, outBit)

            }
        }
    }

    private handleNot(input: IAluInputs, x: Bit){
        this.not8.setInputs(input.a);
        
        if (x === 1) {
            this.output = {
                ...this.output,
                out: this.not8Enable.getData(this.not8.getOutput(), x),
      

            }
        }
    }

    private handleAnd(input: IAluInputs, x: Bit){
        this.and8.setInputs(input.a, input.b);
        
        if (x === 1) {
            this.output = {
                ...this.output,
                out: this.and8Enable.getData(this.and8.getOutput(), x),
      

            }
        }
    }

    private handleOr(input: IAluInputs, x: Bit){
        this.or8.setInputs(input.a, input.b);
        
        if (x === 1) {
            this.output = {
                ...this.output,
                out: this.or8Enable.getData(this.or8.getOutput(), x),
      

            }
        }
    }

    private handleCmp(input: IAluInputs, x: Bit){
        this.cmp.setInputs(input.a, input.b);
        const [greater, equal, result] = this.cmp.getOutput();
        
        if (x === 1) {
            this.output = {
                ...this.output,
                out: this.cmpEnable.getData(result, x),
                aLarger: greater,
                equal: equal
            }
        }
        else 
        {
            this.output = {
                ...this.output,
                aLarger: greater,
                equal: equal
            }
        }

       
    }
}