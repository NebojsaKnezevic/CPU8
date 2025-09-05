import type { Bit, Byte } from "../../interface/interfaces";
import { Bus } from "../bus/bus";
import { AndGate, OrGate } from "../logic/logic-gates";
import { Register } from "./register";

/**
 * Interface representing a single RAM cell.
 */
export interface IRamCell {
    /**
     * Sets the inputs for the RAM cell.
     * @param h - Horizontal select bit.
     * @param v - Vertical select bit.
     * @param s - Set bit.
     * @param e - Enable bit.
     * @param reset - Reset bit.
     */
    setInputs(h: Bit, v: Bit, s: Bit, e: Bit, reset: Bit): void;

    /**
     * Retrieves the data stored in the RAM cell.
     * @returns The current stored byte.
     */
    getData(): Byte;
}

export class RamCell implements IRamCell {
    private h: Bit = 0;
    private v: Bit = 0;
    private s: Bit = 0;
    private e: Bit = 0;

    private reset: Bit = 0;

    private ands: AndGate[];
    private or: OrGate;

    public register: Register;

    constructor(bus: Bus){
        this.ands = Array.from({length:3}, () => new AndGate())
        this.or = new OrGate();
        this.register = new Register(bus);
    }

    public setInputs(h: Bit, v: Bit, s: Bit, e: Bit, reset: Bit): void {
        this.h = h;
        this.v = v;
        this.s = s;
        this.e = e;
        this.reset = reset;
    
        this.ands[0].setInputs(this.h, this.v);
        const hv = this.ands[0].getOutput();
    
        this.ands[1].setInputs(hv, this.s);
        const hvs = this.ands[1].getOutput();
    
        this.ands[2].setInputs(hv, this.e);
        const hve = this.ands[2].getOutput();
    
        this.or.setInputs(this.reset, hvs);
        const resetHVS = this.or.getOutput();

        this.register.setInputs(resetHVS);
        this.register.getDataOnBus(hve);

        this.h = 0;
        this.v = 0;
        this.s = 0;
        this.e = 0;
        this.reset = 0;
    }

    public getData(): Byte {
        return this.register.getDataOnBus(0);
    }
}
