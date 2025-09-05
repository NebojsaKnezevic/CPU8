import type { Bit } from "../../interface/interfaces";
import { AndGate, NotGate } from "./logic-gates";

/**
 * Interface for a 1-to-2 demultiplexer.
 * @deprecated do not use.
 */
export interface IDMux {
  /**
   * Sets the input and select signal for the demux.
   *
   * @param input - The data input bit
   * @param s - The select bit
   */
  setInputs(input: Bit, s: Bit): void;

  /**
   * Returns the two output bits based on the select signal.
   *
   * @returns [Bit, Bit] - Tuple representing [output0, output1]
   */
  getOutput(): [Bit, Bit];
}

/**
 * 1-to-2 demultiplexer using AND and NOT gates.
 */
export class DMux implements IDMux {
  private input: Bit = 0;
  private s: Bit = 0;

  private not: NotGate;
  private and1: AndGate;
  private and2: AndGate;

  constructor() {
    this.not = new NotGate();
    this.and1 = new AndGate();
    this.and2 = new AndGate();
  }

  setInputs(input: Bit, s: Bit) {
    this.input = input;
    this.s = s;
  }

  getOutput(): [Bit, Bit] {
    this.not.setInputs(this.s);
    const notS = this.not.getOutput();

    this.and1.setInputs(this.input, notS);
    const a = this.and1.getOutput();

    this.and2.setInputs(this.s, this.input);
    const b = this.and2.getOutput();

    return [a, b];
  }
}
