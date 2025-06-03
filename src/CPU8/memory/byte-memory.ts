import { WORD_WIDTH } from "../../constants/config";
import type { Bus, Byte } from "../bus/bus";
import type { Bit } from "../logic/logic-gates";
import { BitMemory } from "./bit-memory";


export class ByteMemory {
    private byte: BitMemory[];
    private bus: Bus;

    constructor(bus: Bus) {
        this.bus = bus;
        this.byte =
            Array.from({ length: WORD_WIDTH }, () => new BitMemory());
    }

    setInputs(s: Bit) {
        if (s) {
            const output: Byte = this.bus.getOutput();
            // console.log(this.bus)
            for (let i = 0; i < output.length; i++) {
                this.byte[i].setInputs(s, output[i]);
            }
        }

    }

    //SHOULD NOT BE USED, ONLY FOR TESTING PURPOSES!!!!!!
    // getDataOnBus(e: Bit) {
    //     if(e === 1){
    //         this.bus
    //         .setInputs(this.byte.map(bit => bit.getOutput()) as Byte);
    //     }
    // }

    getData() {
        return this.byte.map(bit => bit.getOutput()) as Byte;
    }
}
