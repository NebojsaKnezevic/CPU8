import type { Bus } from "../bus/bus";
import type { Bit, Byte } from "../../interface/interfaces";
import { ByteMemory } from "./byte-memory";
import { EnableGate } from "./enable-gate";
import type { Alu } from "../logic/alu";




export class Register{
    private byteGate: ByteMemory;
    private enableGate: EnableGate;
    private bus: Bus;

    private alu?: Alu;

    constructor(bus: Bus){
        this.bus = bus;

        this.byteGate = new ByteMemory(bus);
        this.enableGate = new EnableGate(this.bus);
    }

    setInputs(s: Bit){
        if(s === 1){
            this.byteGate.setInputs(s); 
        }
    }

    // Use carefully and only when needed!!!!!!!
    setInputsFromNonBus(a: Byte){
        this.byteGate.setInputsFromNonBus(a);
    }

    getDataOnBus(e: Bit){
        if(e === 1){
            // console.log('SET REG')
            this.enableGate.getDataOnBus(this.byteGate.getData(), e);
        }
        return [...this.byteGate.getData()] as Byte;
        
    }

    getData(){
        return [...this.byteGate.getData()] as Byte;
    }

    initAluConnection(alu: Alu){
        this.alu = alu;
    }

    setInputsFromAlu(s: Bit){
        if(s === 1){
            if(this.alu)
                this.setInputsFromNonBus(this.alu?.getOutput().out)
            else
                throw new Error("alu not defined! Check register.ts class")
        }
    }
}