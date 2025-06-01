import { NandGate, type Bit } from "../logic/logic-gates";

export class BitMemory {
  private q: Bit = 0;
  private notQ: Bit = 1;

  public setInputs(s: Bit, enable: Bit): BitMemory {
    // First 2 Nands
    const nand1 = new NandGate();
    nand1.setInputs(s, enable);
    const nand1Output = nand1.getOutput();

    const nand2 = new NandGate();
    nand2.setInputs(nand1Output, enable);
    const nand2Output = nand2.getOutput();

    // Last 2 Nands
    const nand3 = new NandGate();
    const nand4 = new NandGate();

    nand3.setInputs(nand1Output, nand4.getOutput());
    nand4.setInputs(nand2Output, nand3.getOutput());

    this.q = nand3.getOutput();
    this.notQ = nand4.getOutput();

    return this;
  }

  public getOutput(): Bit {
    return this.q;
  }
  //Irrelevant actually
  private getNotQ(): Bit {
    return this.notQ;
  }
}