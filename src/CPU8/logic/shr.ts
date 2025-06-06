

import type { Byte } from "../../interface/interfaces";
import { Bus } from "../bus/bus";
import { Register } from "../memory/register";



export class Shr {
    private r1: Register;
    private r2: Register;

    private bus: Bus;

    constructor() {
        this.bus = new Bus()
        this.r1 = new Register(this.bus);
        this.r2 = new Register(this.bus);
    }

    setInputs(a: Byte) {
        this.r1.setInputsFromNonBus(a);
        let r1Output = this.r1.getData();

        const result: Byte = Array(8).fill(0) as Byte;

        for (let i = a.length - 1; i > 0 ; i--) {
            result[i] = r1Output[i - 1];
        }

        result[0] = 0;

        this.r2.setInputsFromNonBus(result);
    }

    getOutput(): Byte {
        return this.r2.getData();
    }
}