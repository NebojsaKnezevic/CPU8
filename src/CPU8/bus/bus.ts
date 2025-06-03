import type { Byte } from "../../interface/interfaces";


export class Bus{
    private data: Byte = [0,0,0,0,0,0,0,0];

    public setInputs(byte: Byte): void {
        this.data = [...byte];
    }

    public getOutput(): Byte {
        return [...this.data];
    }
}