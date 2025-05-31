// /cpu8
//   /logic
//     logicGates.js
//   /alu
//     alu.js
//   /registers
//     register.js
//   controlUnit.js
//   cpu.js

//you can build entire CPU with NAND OR NOR

export type Bit = 0 | 1;

// NAND Gate
export class NandGate {
  private inputA: Bit = 0;
  private inputB: Bit = 0;

  setInputs(a: Bit, b: Bit): void {
    this.inputA = a;
    this.inputB = b;
  }

  getOutput(): Bit {
    return !(this.inputA && this.inputB) ? 1 : 0;
  }
}

// NOT Gate
export class NotGate {
  private input: Bit = 0;

  setInput(a: Bit): void {
    this.input = a;
  }

  getOutput(): Bit {
    return this.input ? 0 : 1;
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
