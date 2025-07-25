import type { Bit, Byte } from "../../interface/interfaces";


export class Bus{
    private data: Byte = [0,0,0,0,0,0,0,0];

    public setInputs(byte: Byte): void {
        this.data = [...byte];
    }

    public getOutput(): Byte {
        return [...this.data];
    }
}

export class BitBus{
    private data: Bit = 0;

    public setInputs(bit: Bit): void {
        this.data = bit;
    }

    public getOutput(): Bit {
        return this.data;
    }
}