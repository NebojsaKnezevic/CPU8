import type { Bit } from "../../interface/interfaces";
import { HalfAdder } from "./half-adder";
import  {  OrGate } from "./logic-gates";




export class Adder {
    private sum: Bit = 0;
    private carry: Bit = 0;

    private ha1: HalfAdder;
    private ha2: HalfAdder;
    private or: OrGate;

    constructor() {
        this.ha1 = new HalfAdder();
        this.ha2 = new HalfAdder();
        this.or = new OrGate();
    }

    setInputs(a: Bit, b: Bit, c:Bit = 0) {
        this.sum = 0;
        this.carry = 0;
        this.ha1.setInputs(a, b);
        let [sum1, carry1] = this.ha1.getOutput();

        this.ha2.setInputs(sum1,c);
        let [sum2, carry2] = this.ha2.getOutput();

        this.sum = sum2;
        this.or.setInputs(carry2,carry1);
        this.carry = this.or.getOutput();
    }

    getOutput(): [Bit, Bit]{
        return [this.sum, this.carry]
    }
}