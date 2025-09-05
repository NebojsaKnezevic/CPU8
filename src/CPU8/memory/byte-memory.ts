import { WORD_WIDTH } from "../../constants/config";
import type { Bus } from "../bus/bus";
import type { Bit, Byte } from "../../interface/interfaces";
import { BitMemory } from "./bit-memory";

/**
 * Interface for a byte-sized memory element.
 * Represents 1 word of memory composed of multiple BitMemory cells.
 */
export interface IByteMemory {
  /**
   * Set inputs from the connected bus.
   *
   * @param {Bit} s - Enable signal (1 = write from bus).
   */
  setInputs(s: Bit): void;

  /**
   * Set inputs directly without using the bus.
   * When you want to manually alter the data.
   * 
   * @param {Byte} a - Byte value to write.
   * @param {Bit} [s=1] - Set signal (default 1).
   */
  setInputsFromNonBus(a: Byte, s?: Bit): void;

  /**
   * Get the stored byte as an array of bits.
   *
   * @returns {Byte} The current data stored in this byte memory.
   */
  getData(): Byte;
}

/**
 * Implementation of a byte memory, built from BitMemory cells.
 */
export class ByteMemory implements IByteMemory {
  private byte: BitMemory[];
  private bus: Bus;

  constructor(bus: Bus) {
    this.bus = bus;
    this.byte = Array.from({ length: WORD_WIDTH }, () => new BitMemory());
  }

  public setInputs(s: Bit): void {
    if (s) {
      const output: Byte = this.bus.getOutput();
      // console.log(this.bus)
      for (let i = 0; i < output.length; i++) {
        this.byte[i].setInputs(s, output[i]);
      }
    }
  }

  // Use carefully and only when needed!!!!!!!
  public setInputsFromNonBus(a: Byte, s: Bit = 1): void {
    if (s) {
      const output: Byte = a;
      for (let i = 0; i < output.length; i++) {
        this.byte[i].setInputs(1, output[i]);
      }
    }
  }

  // SHOULD NOT BE USED, ONLY FOR TESTING PURPOSES!!!!!!
  // getDataOnBus(e: Bit) {
  //     if(e === 1){
  //         this.bus
  //         .setInputs(this.byte.map(bit => bit.getOutput()) as Byte);
  //     }
  // }

  public getData(): Byte {
    return this.byte.map(bit => bit.getOutput()) as Byte;
  }
}
