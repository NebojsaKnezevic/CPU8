import type { Bit } from "../../interface/interfaces";
import { NandGate} from "../logic/logic-gates";

export class BitMemory {
  private q: Bit = 0;
  private nand: NandGate[];

  constructor(){
    this.nand = Array.from({length: 4}, () => new NandGate());
  }
  // private notQ: Bit = 1;

  public setInputs(s: Bit, enable: Bit): BitMemory {

    if (s) {
      this.nand[0].setInputs(0,0,0);
      this.nand[1].setInputs(0,0,0);
      this.nand[2].setInputs(0,0,0);
      this.nand[3].setInputs(0,0,0);

      this.nand[0].setInputs(s, enable);
      const nand1Output = this.nand[0].getOutput();

      this.nand[1].setInputs(nand1Output, enable);
      const nand2Output = this.nand[1].getOutput();

      // Last 2 Nands

      this.nand[2].setInputs(nand1Output, this.nand[3].getOutput());
      this.nand[3].setInputs(nand2Output, this.nand[2].getOutput());

      this.q = this.nand[2].getOutput();

    }

    return this;
  }


  public getOutput(): Bit {
    return this.q;
  }


  //Irrelevant actually
  // private getNotQ(): Bit {
  //   return this.notQ;
  // }
}