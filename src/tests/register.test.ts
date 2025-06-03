import { describe, expect, it } from "vitest";
import { Bus, type Byte } from "../CPU8/bus/bus";
import { Register } from "../CPU8/memory/register";
import type { Bit } from "../CPU8/logic/logic-gates";




describe("Register", () => {
    it("Should save inputs from the bus and flush data on the the bus depending which flag is active", () => {
        const bus: Bus = new Bus();
        const register: Register = new Register(bus);
        let s: Bit;
        let e: Bit;

        bus.setInputs([1,1,1,0,0,0,0,1]);
        s = 0;
        e = 0;
        register.setInputs(s)
        expect( register.getDataOnBus(e)).not.toEqual(bus.getOutput());

        s = 1;
        e = 1;
        register.setInputs(s)
        expect( register.getDataOnBus(e)).toEqual(bus.getOutput());

        bus.setInputs([1,0,1,0,1,0,1,1]);
        s = 0;
        e = 0;
        register.setInputs(s)
        expect( register.getDataOnBus(e)).not.toEqual(bus.getOutput());

        s = 1;
        e = 1;
        register.setInputs(s)
        expect( register.getDataOnBus(e)).toEqual(bus.getOutput());

        
    })
});