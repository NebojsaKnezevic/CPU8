import type { Bit, Word } from "../../interface/interfaces";
import { Decoder3x8 } from "./decoder3x8";
import { AndGate, NotGate } from "./logic-gates";

/**
 * Interface for a 4-to-16 line decoder.
 */
export interface IDecoder4x16 {
  /**
   * Sets the 4-bit input for the decoder.
   *
   * @param a - Most significant input bit
   * @param b - 2nd MSB input bit
   * @param c - 3rd bit
   * @param d - Least significant input bit
   */
  setInputs(a: Bit, b: Bit, c: Bit, d: Bit): void;

  /**
   * Returns the 16-bit decoded output.
   *
   * @returns Word - array of 16 bits representing decoder outputs
   */
  getOutput(): Word;
}

/**
 * 4-to-16 line decoder using two 3-to-8 decoders and AND gates.
 */
export class Decoder4x16 implements IDecoder4x16 {
  private a: Bit = 0;
  private b: Bit = 0;
  private c: Bit = 0;
  private d: Bit = 0;

  private notA: Bit = 0;

  private decoderLow: Decoder3x8;
  private decoderHigh: Decoder3x8;

  constructor() {
    this.decoderLow = new Decoder3x8();
    this.decoderHigh = new Decoder3x8();
  }

  setInputs(a: Bit, b: Bit, c: Bit, d: Bit) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;

    const notGate = new NotGate();
    notGate.setInputs(this.a);
    this.notA = notGate.getOutput();

    this.decoderLow.setInputs(this.b, this.c, this.d);
    this.decoderHigh.setInputs(this.b, this.c, this.d);
  }

  getOutput(): Word {
    const lowOutputs = this.decoderLow.getOutput();  // Y0–Y7
    const highOutputs = this.decoderHigh.getOutput(); // Y8–Y15

    const result: Word = Array(16).fill(0) as Word;

    for (let i = 0; i < 8; i++) {
      const andLow = new AndGate();
      andLow.setInputs(this.notA, lowOutputs[i]);
      result[i] = andLow.getOutput();

      const andHigh = new AndGate();
      andHigh.setInputs(this.a, highOutputs[i]);
      result[i + 8] = andHigh.getOutput();
    }

    return result;
  }
}
