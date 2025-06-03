import type { Bus, Byte } from "../bus/bus";
import type { Bit } from "../logic/logic-gates";
import { ByteMemory } from "./byte-memory";
import { EnableGate } from "./enable-gate";




export class Register{
    private byteGate: ByteMemory;
    private enableGate: EnableGate;
    private bus: Bus;

    constructor(bus: Bus){
        this.bus = bus;

        this.byteGate = new ByteMemory(bus);
        this.enableGate = new EnableGate(this.bus);
    }

    setInputs(s: Bit){
        if(s){
            this.byteGate.setInputs(s); 
        }
    }

    getDataOnBus(e: Bit){
        if(e){
            this.enableGate.getDataOnBus(this.byteGate.getData(), e);
        }
        return this.byteGate.getData() as Byte;
        
    }
}