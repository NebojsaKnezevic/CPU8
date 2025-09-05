import type { Bus } from "../bus/bus";
import type { Bit, Byte } from "../../interface/interfaces";
import { ByteMemory } from "./byte-memory";
import { EnableGate } from "./enable-gate";
import type { Alu } from "../logic/alu";

/**
 * Interface representing a CPU register.
 */
export interface IRegister {
    /**
     * Sets inputs from the system bus.
     * @param s - Set signal bit.
     */
    setInputs(s: Bit): void;

    /**
     * Sets inputs directly from a byte (bypassing the bus).
     * For manual data altering.
     * @param a - Byte to load into the register.
     */
    setInputsFromNonBus(a: Byte): void;

    /**
     * Places the register's data on the bus if enabled.
     * @param e - Enable signal bit.
     * @returns The current byte stored in the register.
     */
    getDataOnBus(e: Bit): Byte;

    /**
     * Retrieves the current data stored in the register (without using the bus).
     * @returns The current byte stored in the register.
     */
    getData(): Byte;

    /**
     * Initializes a connection to the ALU for direct data transfer.
     * @param alu - The ALU instance to connect.
     */
    initAluConnection(alu: Alu): void;

    /**
     * Sets inputs from the connected ALU.
     * Throws error if ALU is not connected.
     * @param s - Store signal bit.
     */
    setInputsFromAlu(s: Bit): void;
}

export class Register implements IRegister {
    private byteGate: ByteMemory;
    private enableGate: EnableGate;
    private bus: Bus;

    private alu?: Alu;

    constructor(bus: Bus){
        this.bus = bus;

        this.byteGate = new ByteMemory(bus);
        this.enableGate = new EnableGate(this.bus);
    }

    public setInputs(s: Bit): void {
        if(s === 1){
            this.byteGate.setInputs(s); 
        }
    }

    // Use carefully and only when needed!!!!!!!
    public setInputsFromNonBus(a: Byte): void {
        this.byteGate.setInputsFromNonBus(a);
    }

    public getDataOnBus(e: Bit): Byte {
        if(e === 1){
            // console.log('SET REG')
            this.enableGate.getDataOnBus(this.byteGate.getData(), e);
        }
        return [...this.byteGate.getData()] as Byte;
    }

    public getData(): Byte {
        return [...this.byteGate.getData()] as Byte;
    }

    public initAluConnection(alu: Alu): void {
        this.alu = alu;
    }

    public setInputsFromAlu(s: Bit): void {
        if(s === 1){
            if(this.alu)
                this.setInputsFromNonBus(this.alu?.getOutput().out)
            else
                throw new Error("alu not defined! Check register.ts class")
        }
    }
}
