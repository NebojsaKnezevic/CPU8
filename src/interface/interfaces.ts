

export type Bit = 0 | 1;
export type Nibble = [Bit, Bit, Bit, Bit];
export type Byte = [Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit];
export type Word = [Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit]

export interface IAluInputs{
    a: Byte,
    b: Byte,
    carry: Bit,
    decoderInputs: {
        a: Bit, b: Bit, c: Bit
    }
}

export interface IAluOutputs{
    aLarger: Bit,
    equal: Bit,
    zero: Bit,
    out: Byte,
    carryOut: Bit
}


export interface IBasic1 {
    setInputs(a: Bit, b?: Bit): void;
    getOutput(): Bit;
}

export interface IBasic1M {
    setInputs(a: Bit[]): void;
    getOutput(): Bit;
}

export interface IBasic8 {
    setInputs(a: Byte, b?: Byte): void;
    getOutput(): Byte;
}

export interface IAdder1{
    setInputs(a: Bit, b: Bit, c: Bit): void;
    getOutput(): [Bit, Bit];
}



