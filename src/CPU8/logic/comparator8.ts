import { WORD_WIDTH } from "../../constants/config";
import type { Bit, Byte } from "../../interface/interfaces";
import { Comparator } from "./comparator";

/**
 * Interface for an 8-bit comparator.
 */
export interface IComparator8 {
  /**
   * Sets the input bytes for the 8-bit comparator.
   * Each bit is compared using a single-bit comparator.
   *
   * @param a - First input byte (array of 8 bits)
   * @param b - Second input byte (array of 8 bits)
   */
  setInputs(a: Byte, b: Byte): void;

  /**
   * Returns the output of the 8-bit comparator.
   *
   * @returns [aLarger, equal, xorRes]
   * - aLarger: 1 if 'a' is larger than 'b'
   * - equal: 1 if all bits are equal
   * - xorRes: array of 8 bits showing per-bit XOR results
   */
  getOutput(): [Bit, Bit, Byte];
}

/**
 * 8-bit comparator using 8 single-bit comparators.
 */
export class Comparator8 implements IComparator8 {
  private comparators: Comparator[];

  constructor() {
    this.comparators = Array.from({ length: WORD_WIDTH }, () => new Comparator());
  }

  setInputs(a: Byte, b: Byte) {
    this.comparators[0].setInputs(a[0], b[0], 1, 0); // MSB = index 0

    for (let i = 1; i < WORD_WIDTH; i++) {
      const [eq, alarger] = this.comparators[i - 1].getOutput();
      this.comparators[i].setInputs(a[i], b[i], eq, alarger);
    }
  }

  getOutput(): [Bit, Bit, Byte] {
    const [eq, alarger] = this.comparators[WORD_WIDTH - 1].getOutput();
    const xorRes: Byte = this.comparators.map(c => c.getOutput()[2]) as Byte;

    return [alarger, eq, xorRes];
  }
}
