import type { Bit } from "../../interface/interfaces";

//you can build entire CPU with NAND OR NOR



// NAND Gate
export class NandGate {
  private inputA: Bit = 0;
  private inputB: Bit = 0;

  setInputs(a: Bit, b: Bit): void {
    this.inputA = a;
    this.inputB = b;
  }

  getOutput(): Bit {
    let x = !(this.inputA && this.inputB) ? 1 : 0;
    return x as Bit;
  }
}

// NOT Gate
export class NotGate {
  private input: Bit = 0;

  setInputs(a: Bit): void {
    this.input = a;
  }

  getOutput(): Bit {
    return this.input ? 0 : 1 as Bit;
  }
}

// AND Gate
export class AndGate {
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

// OR Gate
export class OrGate {
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

// NOR Gate
export class NorGate {
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
export class XorGate {
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
export class XnorGate {
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


