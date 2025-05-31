import { NandGate, type Bit } from "../logic/logic-gates";

export class BitMemory {
  private q: Bit = 0;
  private notQ: Bit = 1;

  public setInputs(s: Bit, enable: Bit): void {
    // First 2 Nands
    const nand1 = new NandGate();
    nand1.setInputs(s, enable);
    const sBar = nand1.getOutput();

    const nand2 = new NandGate();
    nand2.setInputs(enable, this.q);
    const rBar = nand2.getOutput();

    // Last 2 Nands
    const nand3 = new NandGate();
    nand3.setInputs(sBar, this.notQ);
    const qNew = nand3.getOutput();

    const nand4 = new NandGate();
    nand4.setInputs(rBar, qNew);
    const notQNew = nand4.getOutput();

    
    this.q = qNew;
    this.notQ = notQNew;
  }

  public getQ(): Bit {
    return this.q;
  }

  public getNotQ(): Bit {
    return this.notQ;
  }
}