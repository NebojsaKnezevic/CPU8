import type { Bit } from "../../interface/interfaces";
import { NandGate, NotGate } from "../logic/logic-gates";
import { JKFF } from "../memory/jk-flipflop";





export class Clock {
    private clk: Bit = 0;     
    private clks: Bit = 0;    
    private clke: Bit = 0;   



    setInputs() {
        const next: Bit = this.clk === 0 ? 1 : 0;

        // edge detection
        // this.clks = this.clk === 1 && next === 0 ? 1 : 0; // falling edge
        // this.clke = this.clk === 0 && next === 1 ? 1 : 0; // rising edge

        this.clk = next;
        this.clks = next;    
        this.clke = next;  

    }

    getOutput(){
        return [
            this.clk, this.clks, this.clke
        ];
    }
}