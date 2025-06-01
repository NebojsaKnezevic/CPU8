import type { Bus, Byte } from "../bus/bus";
import type { Bit } from "../logic/logic-gates";
import { BitMemory } from "./bit-memory";


type BitMemoryByte = [
    BitMemory, BitMemory, BitMemory, BitMemory,
    BitMemory, BitMemory, BitMemory, BitMemory
];

export class ByteMemory {
    private byte: BitMemoryByte;
    private bus: Bus;

    constructor(bus: Bus) {
        this.bus = bus;
        this.byte =
            Array.from({ length: 8 }, () => new BitMemory()) as BitMemoryByte;
    }

    setInputs(s: Bit) {
        console.log(s)
        if (s === 1) {
            const output: Byte = this.bus.getOutput();
            // console.log(this.bus)
            for (let i = 0; i < output.length; i++) {
                this.byte[i].setInputs(s, output[i]);
            }
        }

    }

    getDataOnBus(e: Bit) {
        if(e === 1){
            this.bus
            .setInputs(this.byte.map(bit => bit.getOutput()) as Byte);
        }
    }

    getData() {
        return this.byte.map(bit => bit.getOutput()) as Byte;
    }
}
