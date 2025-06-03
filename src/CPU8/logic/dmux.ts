import type { Bit } from "../../interface/interfaces";
import { AndGate, NotGate } from "./logic-gates";

//Demux Gate
export class DMux {
    private input: Bit = 0;
    private s: Bit = 0;
    
    private not: NotGate;
    private and1: AndGate;
    private and2: AndGate;
  
    constructor() {
      this.not = new NotGate();
      this.and1 = new AndGate();
      this.and2 = new AndGate();
    }
  
    setInputs(input: Bit, s: Bit){
      this.input = input;
      this.s = s;
    }
  
    getOutput(): [Bit, Bit]{
  
      this.not.setInputs(this.s);
      const notS = this.not.getOutput();
  
      this.and1.setInputs(this.input,notS);
      const a = this.and1.getOutput();
  
      this.and2.setInputs(this.s, this.input);
      const b = this.and2.getOutput();
  
      return [a,b]
    }
  }