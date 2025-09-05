import { WORD_WIDTH } from "../../constants/config";
import type { Bit, Byte } from "../../interface/interfaces";
import { Adder } from "./adder";

/**
 * Interface for an 8-bit adder.
 */
export interface IAdder8 {
  /**
   * Sets the input bytes and optional carry-in for the adder.
   *
   * @param a - First input byte (array of 8 bits)
   * @param b - Second input byte (array of 8 bits)
   * @param c - Carry-in bit (optional, defaults to 0)
   */
  setInputs(a: Byte, b: Byte, c?: Bit): void;

  /**
   * Returns the output of the 8-bit adder.
   *
   * @returns A tuple [sum, carry]
   * - sum: Byte (array of 8 bits) representing the sum
   * - carry: Bit representing the final carry-out
   */
  getOutput(): [Byte, Bit];
}

/**
 * 8-bit adder implementation using 8 instances of a full Adder.
 */
export class Adder8 implements IAdder8 {
  private out: Byte;
  private carry: Bit;

  private adders: Adder[];

  constructor() {
    this.out = [0, 0, 0, 0, 0, 0, 0, 0];
    this.carry = 0;

    // Initialize 8 full adders (for each bit)
    this.adders = Array.from({ length: WORD_WIDTH }, () => new Adder());
  }

  /**
   * Sets the input bytes and optional carry-in.
   *
   * @param a - First input byte
   * @param b - Second input byte
   * @param c - Carry-in bit (default 0)
   */
  setInputs(a: Byte, b: Byte, c: Bit = 0): void {
    this.out = [0, 0, 0, 0, 0, 0, 0, 0];
    let currentCarry: Bit = c;

    for (let i = this.adders.length - 1; i >= 0; i--) {
      this.adders[i].setInputs(a[i], b[i], currentCarry);
      const [sum, newCarry] = this.adders[i].getOutput();
      this.out[i] = sum;
      currentCarry = newCarry;
    }

    this.carry = currentCarry;
  }

  /**
   * Gets the output of the 8-bit adder.
   *
   * @returns A tuple [sum, carry]
   * - sum: Byte (array of 8 bits)
   * - carry: Bit (final carry-out)
   */
  getOutput(): [Byte, Bit] {
    return [this.out, this.carry];
  }
}
