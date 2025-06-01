import type { Bit } from "../logic/logic-gates";


export type Byte = [Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit];


export class Bus{
    private data: Byte = [0,0,0,0,0,0,0,0];

    public setInputs(byte: Byte): void {
        this.data = [...byte];
    }

    public getOutput(): Byte {
        return [...this.data];
    }
}