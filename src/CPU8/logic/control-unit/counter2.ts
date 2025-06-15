import type { Bit } from "../../../interface/interfaces";
import { BitMemory } from "../../memory/bit-memory";
import { NotGate, OrGate } from "../logic-gates";



export class Counter2{
    private bits: BitMemory[];
    private not: NotGate;
    private not1: NotGate;

    private or: OrGate;
    private or1: OrGate;

    constructor() {
        this.bits = Array.from({ length: 12 }, () => new BitMemory());
        this.not = new NotGate();
        this.not1 = new NotGate();

        this.or = new OrGate();
        this.or1 = new OrGate();

        // this.bits[1].setInputs(1,1)
        // this.bits[0].setInputs(1,1)

    }

    //first cklin then input!!!!
    setInputs(clkin: Bit) {

        
 
        this.not.setInputs(this.bits[11].getOutput());
        const x = this.not.getOutput();

        this.or.setInputs(this.bits[11].getOutput(), clkin);
        const even: Bit = this.or.getOutput();

        this.not1.setInputs(clkin)
        let notclk: Bit = this.not1.getOutput();
        this.or1.setInputs(this.bits[11].getOutput(), notclk);
        const odd: Bit = this.or1.getOutput();

        // console.log(odd, even , x)

        this.bits[0].setInputs(even, x);
        this.bits[1].setInputs(odd, this.bits[0].getOutput());
        this.bits[2].setInputs(even, this.bits[1].getOutput());
        this.bits[3].setInputs(odd, this.bits[2].getOutput());
        this.bits[4].setInputs(even, this.bits[3].getOutput());
        this.bits[5].setInputs(odd, this.bits[4].getOutput());
        this.bits[6].setInputs(even, this.bits[5].getOutput());
        this.bits[7].setInputs(odd, this.bits[6].getOutput());
        this.bits[8].setInputs(even, this.bits[7].getOutput());
        this.bits[9].setInputs(odd, this.bits[8].getOutput());
        this.bits[10].setInputs(even, this.bits[9].getOutput());
        this.bits[11].setInputs(odd, this.bits[10].getOutput());

        if(this.bits[11].getOutput() === 1){
            this.bits[0].setInputs(1, 0);
            this.bits[1].setInputs(1, 0);
            this.bits[2].setInputs(1, 0);
            this.bits[3].setInputs(1, 0);
            this.bits[4].setInputs(1, 0);
            this.bits[5].setInputs(1, 0);
            this.bits[6].setInputs(1, 0);
            this.bits[7].setInputs(1, 0);
            this.bits[8].setInputs(1, 0);
            this.bits[9].setInputs(1, 0);
            this.bits[10].setInputs(1, 0);
            this.bits[11].setInputs(1, 0);
        }

    }

    getOutput(): [Bit, Bit, Bit, Bit, Bit, Bit] {
        
        return [
            this.bits[1].getOutput(),
            this.bits[3].getOutput(),
            this.bits[5].getOutput(),
            this.bits[7].getOutput(),
            this.bits[9].getOutput(),
            this.bits[11].getOutput(),
        ]
    }

    getData(){
        console.log([...this.bits.map(b => b.getOutput())])
    }

}