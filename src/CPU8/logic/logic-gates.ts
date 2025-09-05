import type { Bit } from "../../interface/interfaces";

/**
 * Interface for basic 1-bit gates with variable inputs.
 */
export interface IBasicGate {
  /**
   * Sets the inputs of the gate.
   * @param bits - Input bits
   */
  setInputs(...bits: Bit[]): void;

  /**
   * Returns the output of the gate.
   */
  getOutput(): Bit;
}

/**
 * Interface for basic 1-bit gates that take an array of bits.
 */
export interface IBasicGateM {
  /**
   * Sets the inputs as an array of bits.
   * @param inputs - Array of input bits
   */
  setInputs(inputs: Bit[]): void;

  /**
   * Returns the output of the gate.
   */
  getOutput(): Bit;
}

/** NAND Gate */
export class NandGate implements IBasicGate {
  private inputs: Bit[] = [];
  private output: Bit = 0;
  private autoEvaluate: boolean;

  constructor(autoEvaluate: boolean = true) {
    this.autoEvaluate = autoEvaluate;
  }

  setInputs(...bits: Bit[]): void {
    this.inputs = bits;
    if (this.autoEvaluate) this.evaluate();
  }

  /** Evaluates the NAND output */
  evaluate(): void {
    this.output = this.inputs.every(bit => bit === 1) ? 0 : 1;
  }

  getOutput(): Bit {
    return this.output;
  }
}

/** NOT Gate */
export class NotGate implements IBasicGate {
  private input: Bit = 0;

  setInputs(a: Bit): void {
    this.input = a;
  }

  getOutput(): Bit {
    return this.input ? 0 : 1;
  }
}

/** AND Gate */
export class AndGate implements IBasicGate {
  private inputA: Bit = 0;
  private inputB: Bit = 0;

  setInputs(a: Bit, b: Bit): void {
    this.inputA = a;
    this.inputB = b;
  }

  getOutput(): Bit {
    return this.inputA && this.inputB ? 1 : 0;
  }
}

/** AND Gate for multiple inputs */
export class AndGateM implements IBasicGateM {
  private inputs: Bit[] = [];

  setInputs(inputs: Bit[]): void {
    this.inputs = inputs;
  }

  getOutput(): Bit {
    return this.inputs.every(input => input === 1) ? 1 : 0;
  }
}

/** OR Gate */
export class OrGate implements IBasicGate {
  private inputA: Bit = 0;
  private inputB: Bit = 0;

  setInputs(a: Bit, b: Bit): void {
    this.inputA = a;
    this.inputB = b;
  }

  getOutput(): Bit {
    return this.inputA || this.inputB ? 1 : 0;
  }
}

/** OR Gate for multiple inputs */
export class OrGateM implements IBasicGateM {
  private inputs: Bit[] = [];

  setInputs(inputs: Bit[]): void {
    this.inputs = inputs;
  }

  getOutput(): Bit {
    return this.inputs.some(input => input === 1) ? 1 : 0;
  }
}

/** NOR Gate */
export class NorGate implements IBasicGate {
  private inputA: Bit = 0;
  private inputB: Bit = 0;

  setInputs(a: Bit, b: Bit): void {
    this.inputA = a;
    this.inputB = b;
  }

  getOutput(): Bit {
    return !(this.inputA || this.inputB) ? 1 : 0;
  }
}

/** XOR Gate */
export class XorGate implements IBasicGate {
  private inputA: Bit = 0;
  private inputB: Bit = 0;

  setInputs(a: Bit, b: Bit): void {
    this.inputA = a;
    this.inputB = b;
  }

  getOutput(): Bit {
    return this.inputA !== this.inputB ? 1 : 0;
  }
}

/** XNOR Gate */
export class XnorGate implements IBasicGate {
  private inputA: Bit = 0;
  private inputB: Bit = 0;

  setInputs(a: Bit, b: Bit): void {
    this.inputA = a;
    this.inputB = b;
  }

  getOutput(): Bit {
    return this.inputA === this.inputB ? 1 : 0;
  }
}
