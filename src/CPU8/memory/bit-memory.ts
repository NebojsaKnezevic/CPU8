import type { Bit } from "../../interface/interfaces";
import { NandGate } from "../logic/logic-gates";

/**
 * Interface for a single bit of memory built from NAND gates (SR latch).
 */
export interface IBitMemory {
  /**
   * Sets the inputs for the bit memory.
   *
   * @param {Bit} s - The data input signal (set).
   * @param {Bit} enable - The enable signal (write control).
   * @returns {IBitMemory} Returns the current BitMemory instance (for chaining).
   */
  setInputs(s: Bit, enable: Bit): IBitMemory;

  /**
   * Gets the current stored bit output.
   *
   * @returns {Bit} The stored bit value (0 or 1).
   */
  getOutput(): Bit;
}

/**
 * Implementation of a single bit of memory using 4 NAND gates.
 */
export class BitMemory implements IBitMemory {
  private q: Bit = 0;
  private nand: NandGate[];

  constructor() {
    this.nand = Array.from({ length: 4 }, () => new NandGate());
  }

  public setInputs(s: Bit, enable: Bit): IBitMemory {
    if (s) {
      this.nand[0].setInputs(0, 0, 0);
      this.nand[1].setInputs(0, 0, 0);
      this.nand[2].setInputs(0, 0, 0);
      this.nand[3].setInputs(0, 0, 0);

      this.nand[0].setInputs(s, enable);
      const nand1Output = this.nand[0].getOutput();

      this.nand[1].setInputs(nand1Output, enable);
      const nand2Output = this.nand[1].getOutput();

      this.nand[2].setInputs(nand1Output, this.nand[3].getOutput());
      this.nand[3].setInputs(nand2Output, this.nand[2].getOutput());

      this.q = this.nand[2].getOutput();
    }

    return this;
  }

  public getOutput(): Bit {
    return this.q;
  }
}
