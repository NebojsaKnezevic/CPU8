import { WORD_WIDTH } from "../../constants/config";
import type { Bit, Byte } from "../../interface/interfaces";
import { NotGate } from "./logic-gates";

/**
 * Interface for 8-bit NOT gate
 */
export interface INot8 {
  /**
   * Sets the 8-bit input
   * @param a - Input byte
   */
  setInputs(a: Byte): void;

  /**
   * Returns the 8-bit output
   */
  getOutput(): Byte;
}

/**
 * 8-bit NOT gate
 */
export class Not8 implements INot8 {
  private not: NotGate[];

  constructor() {
    this.not = Array.from({ length: WORD_WIDTH }, () => new NotGate());
  }

  setInputs(a: Byte) {
    for (let i = this.not.length - 1; i >= 0; i--) {
      this.not[i].setInputs(a[i]);
    }
  }


  getOutput(): Byte {
    return this.not.map(not => not.getOutput()) as Byte;
  }
}
