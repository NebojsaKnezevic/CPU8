import { WORD_WIDTH } from "../../constants/config";
import type { Bit, Byte } from "../../interface/interfaces";
import { OrGate } from "./logic-gates";

/**
 * Interface for 8-bit OR gate
 */
export interface IOr8 {
  /**
   * Sets the inputs for each bit
   * @param a - first 8-bit input
   * @param b - second 8-bit input
   */
  setInputs(a: Byte, b: Byte): void;

  /**
   * Returns the 8-bit OR result
   */
  getOutput(): Byte;
}

/**
 * 8-bit OR gate
 */
export class Or8 implements IOr8 {
  private out: OrGate[];

  constructor() {
    this.out = Array.from({ length: WORD_WIDTH }, () => new OrGate());
  }


  setInputs(a: Byte, b: Byte) {
    for (let i = this.out.length - 1; i >= 0; i--) {
      this.out[i].setInputs(a[i], b[i]);
    }
  }

  getOutput(): Byte {
    return this.out.map(or => or.getOutput()) as Byte;
  }
}
