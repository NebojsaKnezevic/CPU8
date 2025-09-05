import type { Bit } from "../../interface/interfaces";
import { HalfAdder } from "./half-adder";
import { OrGate } from "./logic-gates";

/**
 * Interface for a full adder component.
 */
export interface IAdder {
  /**
   * Sets the input bits for the adder.
   *
   * @param a - First input bit
   * @param b - Second input bit
   * @param c - Carry-in bit (optional, defaults to 0)
   */
  setInputs(a: Bit, b: Bit, c?: Bit): void;

  /**
   * Returns the output of the adder.
   *
   * @returns A tuple [sum, carry]
   * - sum: the resulting bit after addition
   * - carry: the carry-out bit
   */
  getOutput(): [Bit, Bit];
}

/**
 * A full adder implementation using two half-adders and an OR gate.
 * It adds two input bits and a carry-in, producing a sum and carry-out.
 */
export class Adder implements IAdder {
  private sum: Bit = 0;
  private carry: Bit = 0;

  private ha1: HalfAdder;
  private ha2: HalfAdder;
  private or: OrGate;

  constructor() {
    this.ha1 = new HalfAdder();
    this.ha2 = new HalfAdder();
    this.or = new OrGate();
  }

  /**
   * Sets the inputs for the full adder.
   *
   * @param a - First input bit
   * @param b - Second input bit
   * @param c - Carry-in bit (defaults to 0)
   */
  setInputs(a: Bit, b: Bit, c: Bit = 0) {
    this.sum = 0;
    this.carry = 0;

    this.ha1.setInputs(a, b);
    const [sum1, carry1] = this.ha1.getOutput();

    this.ha2.setInputs(sum1, c);
    const [sum2, carry2] = this.ha2.getOutput();

    this.sum = sum2;
    this.or.setInputs(carry2, carry1);
    this.carry = this.or.getOutput();
  }

  /**
   * Gets the output of the full adder.
   *
   * @returns A tuple [sum, carry]
   */
  getOutput(): [Bit, Bit] {
    return [this.sum, this.carry];
  }
}
