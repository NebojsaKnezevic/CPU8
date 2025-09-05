import type { Bit, Byte } from "../../interface/interfaces";
import { NotGate, OrGateM } from "./logic-gates";

/**
 * Interface for 8-bit zero detection
 */
export interface IZeroDetector8 {
  /**
   * Sets the 8-bit input to check if all bits are zero
   * @param input - 8-bit input byte
   */
  setInput(input: Byte): void;

  /**
   * Returns 1 if input is zero, otherwise 0
   */
  getOutput(): Bit;
}

/**
 * Detects if an 8-bit byte is zero
 */
export class ZeroDetector8 implements IZeroDetector8 {
  private or: OrGateM;
  private not: NotGate;

  constructor() {
    this.or = new OrGateM();
    this.not = new NotGate();
  }

  setInput(input: Byte) {
    this.or.setInputs(input);
    this.not.setInputs(this.or.getOutput());
  }

  getOutput(): Bit {
    return this.not.getOutput(); 
  }
}
