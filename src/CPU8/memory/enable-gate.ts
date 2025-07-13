import { WORD_WIDTH } from "../../constants/config";
import type { Bus } from "../bus/bus";
import { AndGate } from "../logic/logic-gates"
import {type Bit, type Byte} from "../../interface/interfaces.ts"
import { numberToByte } from "../../constants/byte-conversion.ts";


export class EnableGate {
    private data: AndGate[];
    private bus: Bus | null;

    constructor(bus: Bus | null) {
        this.data = Array.from({ length: WORD_WIDTH }, () => new AndGate());
        this.bus = bus;
    }

    //We just get/pass new data on the BUS
    getDataOnBus(inputs: Byte, e: Bit) {
        if (e) {

            if(this.bus){
                let results: Byte = inputs.map((input, i) => {
                    this.data[i].setInputs(input, e);
                    return this.data[i].getOutput()
                }) as Byte;
                this.bus.setInputs(results);
            }
            
        }
    }

    getData(inputs: Byte, e: Bit): Byte{
        if (e) {
            return inputs as Byte
        } else {
            // throw new Error("Check EnableGate getData()");
            return [0,0,0,0,0,0,0,0]
        }
    }

}