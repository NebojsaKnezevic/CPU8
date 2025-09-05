import type { Bit } from "../../interface/interfaces";
import { AndGate, AndGateM, NotGate, OrGate, XorGate } from "./logic-gates";

/**
 * Interface for a single-bit comparator.
 */
export interface IComparator {
  /**
   * Sets the inputs for the comparator.
   *
   * @param a - First input bit
   * @param b - Second input bit
   * @param aboveEqual - Input indicating whether previous bits were equal (default: 1)
   * @param aLarger - Input indicating whether previous bits determined 'a' as larger (default: 0)
   */
  setInputs(a: Bit, b: Bit, aboveEqual?: Bit, aLarger?: Bit): void;

  /**
   * Returns the comparator outputs as a tuple.
   *
   * @returns [equal, aLarger, xor] 
   * - equal: 1 if bits are equal and aboveEqual was 1
   * - aLarger: 1 if 'a' is larger than 'b'
   * - xor: 1 if 'a' and 'b' differ
   */
  getOutput(): [Bit, Bit, Bit];
}

/**
 * Single-bit comparator using basic logic gates.
 */
export class Comparator implements IComparator {
  private xor: XorGate;
  private not: NotGate;
  private andm: AndGateM;
  private and: AndGate;
  private or: OrGate;

  constructor() {
    this.not = new NotGate();
    this.and = new AndGate();
    this.xor = new XorGate();
    this.andm = new AndGateM();
    this.or = new OrGate();
  }

  setInputs(a: Bit, b: Bit, aboveEqual: Bit = 1, aLarger: Bit = 0) {
    this.xor.setInputs(a, b);
    const xorOutput = this.xor.getOutput(); // c

    this.not.setInputs(xorOutput);
    const noXorOutput = this.not.getOutput();

    this.and.setInputs(aboveEqual, noXorOutput); // equal

    this.andm.setInputs([aboveEqual, xorOutput, a]);
    const andmOutput = this.andm.getOutput();

    this.or.setInputs(andmOutput, aLarger); // a larger
  }

  getOutput(): [Bit, Bit, Bit] {
    return [
      this.and.getOutput(),  // equal
      this.or.getOutput(),   // a larger
      this.xor.getOutput(),  // xor
    ];
  }
}
