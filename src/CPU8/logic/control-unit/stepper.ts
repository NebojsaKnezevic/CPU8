import type { Bit } from "../../../interface/interfaces";
import { AndGate, NotGate, OrGate } from "../logic-gates";
import { Counter2 } from "./counter2";



export class Stepper {
    private or: OrGate;
    private ands: AndGate[];
    private nots: NotGate[];
    private counter: Counter2;

    constructor() {
        this.or = new OrGate();
        this.ands = Array.from({ length: 5 }, () => new AndGate());
        this.nots = Array.from({ length: 6 }, () => new NotGate());
        this.counter = new Counter2();
        // this.counter.setInputs(0)
        this.or.setInputs(1,1);
    }

    setInputs(cklin: Bit ) {
        //stage 1 
        this.counter.setInputs(cklin);
        const counterOut = this.counter.getOutput();
        const counterLenght = this.counter.getOutput().length - 1;

        // console.log("counter: ",this.counter.getOutput())

        this.nots[0].setInputs(counterOut[0])
        this.or.setInputs(counterOut[counterLenght], this.nots[0].getOutput());

        this.nots[1].setInputs(counterOut[1])
        this.ands[0].setInputs(counterOut[0], this.nots[1].getOutput());

        this.nots[2].setInputs(counterOut[2])
        this.ands[1].setInputs(counterOut[1], this.nots[2].getOutput());

        this.nots[3].setInputs(counterOut[3])
        this.ands[2].setInputs(counterOut[2], this.nots[3].getOutput());

        this.nots[4].setInputs(counterOut[4])
        this.ands[3].setInputs(counterOut[3], this.nots[4].getOutput());

        this.nots[5].setInputs(counterOut[5])
        this.ands[4].setInputs(counterOut[4], this.nots[5].getOutput());


        //stage 2
        // this.counter.setInputs();
    }

    getOutput(): [Bit, Bit, Bit, Bit, Bit, Bit] {
        return [
            this.or.getOutput(),
            this.ands[0].getOutput(),
            this.ands[1].getOutput(),
            this.ands[2].getOutput(),
            this.ands[3].getOutput(),
            this.ands[4].getOutput(),
        ];
    }
}