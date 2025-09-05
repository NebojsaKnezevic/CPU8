import { WORD_WIDTH } from "../../constants/config";
import type { Bus } from "../bus/bus";
import { AndGate } from "../logic/logic-gates";
import { type Bit, type Byte } from "../../interface/interfaces";

/**
 * Interface for an enable gate that controls data flow to/from a bus.
 */
export interface IEnableGate {
  /**
   * Passes new data onto the connected bus when enabled.
   *
   * @param {Byte} inputs - The byte data to send.
   * @param {Bit} e - Enable signal (1 = active).
   */
  getDataOnBus(inputs: Byte, e: Bit): void;

  /**
   * Returns the data if enabled, otherwise returns zeroed byte.
   *
   * @param {Byte} inputs - The byte data to return if enabled.
   * @param {Bit} e - Enable signal.
   * @returns {Byte} The byte if enabled, otherwise [0,0,0,0,0,0,0,0].
   */
  getData(inputs: Byte, e: Bit): Byte;
}

/**
 * Implementation of an enable gate that allows controlled data transfer
 * to the bus or returns data conditionally.
 */
export class EnableGate implements IEnableGate {
  private data: AndGate[];
  private bus: Bus | null;

  constructor(bus: Bus | null) {
    this.data = Array.from({ length: WORD_WIDTH }, () => new AndGate());
    this.bus = bus;
  }

  // We just get/pass new data on the BUS
  public getDataOnBus(inputs: Byte, e: Bit): void {
    if (e) {
      if (this.bus) {
        let results: Byte = inputs.map((input, i) => {
          this.data[i].setInputs(input, e);
          return this.data[i].getOutput();
        }) as Byte;
        this.bus.setInputs(results);
      }
    }
  }

  public getData(inputs: Byte, e: Bit): Byte {
    if (e) {
      return inputs as Byte;
    } else {
      // throw new Error("Check EnableGate getData()");
      return [0, 0, 0, 0, 0, 0, 0, 0];
    }
  }
}
