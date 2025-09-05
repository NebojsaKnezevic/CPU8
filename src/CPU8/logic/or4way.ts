import type { Bit, Nibble } from "../../interface/interfaces";
import { OrGate } from "./logic-gates";

/**
 * Interface for 4-way OR gate
 */
export interface IOr4Way {
  /**
   * Sets 4 input bits
   * @param input - 4-bit input (Nibble)
   */
  setInputs(input: Nibble): void;

  /**
   * Returns the result of OR-ing all 4 input bits
   */
  getOutput(): Bit;
}

/**
 * 4-way OR gate
 */
export class Or4Way implements IOr4Way {
  private or: OrGate[];

  constructor() {
    this.or = Array.from({ length: 3 }, () => new OrGate());
  }


  setInputs(input: Nibble) {
    this.or[2].setInputs(input[3], input[2]);
    const orOut = this.or[2].getOutput();

    this.or[1].setInputs(orOut, input[1]);
    const orOut1 = this.or[1].getOutput();

    this.or[0].setInputs(orOut1, input[0]);
  }

  getOutput(): Bit {
    return this.or[0].getOutput();
  }
}
