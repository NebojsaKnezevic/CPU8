import { WORD_WIDTH } from "../../constants/config";
import type { Bus } from "../bus/bus";
import { AndGate } from "../logic/logic-gates"
import {type Bit, type Byte} from "../../interface/interfaces.ts"


export class EnableGate {
    private data: AndGate[];
    private bus: Bus

    constructor(bus: Bus) {
        this.data = Array.from({ length: WORD_WIDTH }, () => new AndGate());
        this.bus = bus;
    }

    //We just get/pass new data on the BUS
    getDataOnBus(inputs: Byte, e: Bit) {
        if (e) {

            let results: Byte = inputs.map((input, i) => {
                this.data[i].setInputs(input, e);
                return this.data[i].getOutput()
            }) as Byte;

            this.bus.setInputs(results);
        }
    }
}