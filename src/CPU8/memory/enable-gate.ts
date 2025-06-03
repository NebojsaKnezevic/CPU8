import { WORD_WIDTH } from "../../constants/config";
import type { Bus, Byte } from "../bus/bus";
import { AndGate, type Bit } from "../logic/logic-gates"


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