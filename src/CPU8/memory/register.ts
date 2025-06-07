import type { Bus } from "../bus/bus";
import type { Bit, Byte } from "../../interface/interfaces";
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
        // if(s){
            this.byteGate.setInputs(s); 
        // }
    }

    // Use carefully and only when needed!!!!!!!
    setInputsFromNonBus(a: Byte){
        this.byteGate.setInputsFromNonBus(a);
    }

    getDataOnBus(e: Bit){
        if(e){
            this.enableGate.getDataOnBus(this.byteGate.getData(), e);
        }
        return this.byteGate.getData() as Byte;
        
    }

    getData(){
        return [...this.byteGate.getData()] as Byte;
    }
}