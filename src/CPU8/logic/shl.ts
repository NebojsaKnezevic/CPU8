import type { Bit, Byte } from "../../interface/interfaces";
import { Bus } from "../bus/bus";
import { Register } from "../memory/register";

/**
 * Interface for 8-bit shift-left (SHL) operation
 */
export interface IShl {
  /**
   * Sets the inputs for the shift-left operation
   * @param a - 8-bit input byte
   * @param carryIn - carry-in bit (default 0)
   */
  setInputs(a: Byte, carryIn?: Bit): void;

  /**
   * Returns the result of the shift-left and the carry-out
   * @returns tuple [shifted byte, carry-out bit]
   */
  getOutput(): [Byte, Bit];
}

/**
 * 8-bit shift-left (SHL) logic unit
 */
export class Shl implements IShl {
  private r1: Register;
  private r2: Register;
  private carryOut: Bit = 0;
  private bus: Bus;

  constructor() {
    this.bus = new Bus();
    this.r1 = new Register(this.bus);
    this.r2 = new Register(this.bus);
  }

 
  setInputs(a: Byte, carryIn: Bit = 0) {
    this.r1.setInputsFromNonBus(a);
    const r1Output = this.r1.getData();

    const result: Byte = Array(8).fill(0) as Byte;
    this.carryOut = r1Output[0];

    for (let i = 0; i < 7; i++) {
      result[i] = r1Output[i + 1];
    }

    result[7] = carryIn;
    this.r2.setInputsFromNonBus(result);
  }

  
  getOutput(): [Byte, Bit] {
    return [this.r2.getData(), this.carryOut];
  }
}
