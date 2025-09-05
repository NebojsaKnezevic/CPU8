import type { Bit } from "../../interface/interfaces";
import { AndGate, XorGate } from "./logic-gates";

/**
 * Interface for a half-adder.
 */
export interface IHalfAdder {
  /**
   * Sets the two input bits for the half-adder.
   *
   * @param a - First input bit
   * @param b - Second input bit
   */
  setInputs(a: Bit, b: Bit): void;

  /**
   * Returns the sum and carry bits.
   *
   * @returns [Bit, Bit] - Tuple representing [sum, carry]
   */
  getOutput(): [Bit, Bit];
}

/**
 * Half-adder using XOR and AND gates.
 */
export class HalfAdder implements IHalfAdder {
  private xor: XorGate;
  private and: AndGate;

  private sum: Bit = 0;
  private carry: Bit = 0;

  constructor() {
    this.xor = new XorGate();
    this.and = new AndGate();
  }

  setInputs(a: Bit, b: Bit) {
    this.sum = 0;
    this.carry = 0;

    this.xor.setInputs(a, b);
    this.sum = this.xor.getOutput();

    this.and.setInputs(a, b);
    this.carry = this.and.getOutput();
  }

  getOutput(): [Bit, Bit] {
    return [this.sum, this.carry];
  }
}
