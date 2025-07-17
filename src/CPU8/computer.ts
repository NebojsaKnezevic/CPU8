import { byteToNumber, numberToByte } from "../constants/byte-conversion";
import type { Byte } from "../interface/interfaces";
import { Bus } from "./bus/bus";
import { Bus1 } from "./bus/bus1";
import { Clock } from "./clock/clock";
import { Alu } from "./logic/alu";
import { ControlUnit } from "./logic/control-unit/control-unit";
import { Ram } from "./memory/ram";
import { Register } from "./memory/register";



export class Computer {
    public bus = new Bus();
    public ram = new Ram(this.bus);
    public registers = Array.from({ length: 4 }, () => new Register(this.bus));
    public tmp = new Register(this.bus);
    public bus1 = new Bus1(this.tmp);
    public acc = new Register(this.bus);
    public iar = new Register(this.bus);
    public ir = new Register(this.bus);
    public alu = new Alu();
    public controlUnit = new ControlUnit(this.alu, this.ram, this.registers, this.tmp, this.bus1, this.acc, this.iar, this.ir);
    public clock = new Clock();


    private programStartAddress: number = 0;
    private programEndAddress: number = 0;
    private isFirstRun: boolean = true;
    private pc: number = 0;

    constructor() {
        this.acc.initAluConnection(this.alu);
    }

    public insertProgramIntoRAM(startAddress: number, program: Byte[]) {

        const isValidProgram: boolean = program.every(byte =>
            Array.isArray(byte) &&
            byte.length <= 8 &&
            byte.every(bit => bit === 0 || bit === 1)
        );

        if (!isValidProgram) throw new Error('Not a valid program');

        this.ram.setDataManually(startAddress, program);

        this.programStartAddress = startAddress;
        this.iar.setInputsFromNonBus(numberToByte(startAddress));
        this.pc = startAddress ;
        this.programEndAddress = this.programStartAddress + program.length ;

    }

    public run(userInputCycleNum?: number) {
        const val = userInputCycleNum ? this.pc + userInputCycleNum : this.programEndAddress  ;
        //first cycle is always 23 the rest are 24
        if(this.pc > this.programEndAddress + 1) throw new Error("Stack overflow! The real thing xD");
        if(userInputCycleNum !== undefined && userInputCycleNum > this.programEndAddress + 1) throw new Error("Stack overflow! The real thing xD");

        while (this.pc < val) {
            if (this.isFirstRun) {
                this.runCycle(23);
                this.isFirstRun = false;
                // console.log(this.iar.getData());
            } else {
                this.runCycle(24);
                // console.log(this.iar.getData());
            }
            this.pc++;
        }
        
        

    }

    private runCycle(clockTicks: number) {
        for (let i = 0; i < clockTicks; i++) {
            this.alu.setInputs({
                a: this.bus.getOutput(),
                b: this.bus1.getOutput(),
                carry: 0,
                decoderInputs: {
                    a: 0, b: 0, c: 0 // ADD
                }
            });

            this.controlUnit.setInputs(this.clock.getOutput());
            this.clock.setInputs();
        }
    }
}