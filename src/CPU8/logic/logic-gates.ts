import type { Bit, IBasic1, IBasic1M } from "../../interface/interfaces";

//you can build entire CPU with NAND OR NOR



// NAND Gate
export class NandGate implements IBasic1 {
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

  evaluate(): void {
    this.output = this.inputs.every(bit => bit === 1) ? 0 : 1;
  }

  getOutput(): Bit {
    return this.output;
  }
}


// NOT Gate
export class NotGate implements IBasic1  {
  private input: Bit = 0;

  setInputs(a: Bit): void {
    this.input = a;
  }

  getOutput(): Bit {
    return this.input ? 0 : 1 as Bit;
  }
}

// AND Gate
export class AndGate implements IBasic1  {
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

export class AndGateM implements IBasic1M  {
  private inputs: Bit[] = [];

  setInputs(inputs: Bit[]): void {
    this.inputs = inputs;
  }

  getOutput(): Bit {
    return this.inputs.every(input => input === 1) ? 1 : 0;
  }
}


// OR Gate
export class OrGate implements IBasic1  {
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

export class OrGateM implements IBasic1M  {
  private inputs: Bit[] = [];

  setInputs(inputs: Bit[]): void {
    this.inputs = inputs;
  }

  getOutput(): Bit {
    return this.inputs.some(input => input === 1) ? 1 : 0;
  }
}


// NOR Gate
export class NorGate implements IBasic1  {
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

// XOR Gate
export class XorGate implements IBasic1  {
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

// XNOR Gate
export class XnorGate implements IBasic1  {
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


