import { WORD_WIDTH } from "../../constants/config";
import type { Byte } from "../../interface/interfaces";
import { AndGate } from "./logic-gates";

/**
 * Interface for an 8-bit AND gate.
 */
export interface IAnd8 {
  /**
   * Sets the input bytes for the AND operation.
   * Each bit in `a` is ANDed with the corresponding bit in `b`.
   *
   * @param a - First input byte (array of 8 bits)
   * @param b - Second input byte (array of 8 bits)
   */
  setInputs(a: Byte, b: Byte): void;

  /**
   * Returns the output byte after ANDing the inputs.
   *
   * @returns Byte (array of 8 bits)
   */
  getOutput(): Byte;
}

/**
 * 8-bit AND gate.
 */
export class And8 implements IAnd8 {
  private out: AndGate[];

  constructor() {
    this.out = Array.from({ length: WORD_WIDTH }, () => new AndGate());
  }

  setInputs(a: Byte, b: Byte) {
    for (let i = this.out.length - 1; i >= 0; i--) {
      this.out[i].setInputs(a[i], b[i]);
    }
  }

  getOutput(): Byte {
    return this.out.map((and) => and.getOutput()) as Byte;
  }
}
