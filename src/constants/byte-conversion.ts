import type { Bit, Byte } from "../interface/interfaces";
import { NUM_MAP, WORD_WIDTH } from "./config";



export function byteToNumber(byte: Byte): number {
    let value = 0;
    for (let i = 0; i < WORD_WIDTH; i++) {
        value += byte[i] * NUM_MAP[i];
    }
    return value;
}

export function numberToByte(num: number): Byte {
    const byte: Bit[] = [];
    for (let i = 0; i < WORD_WIDTH; i++) {
        byte.push((num & (1 << i)) ? 1 : 0);
    }
    return byte as Byte;
}