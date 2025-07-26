import { byteToNumber, numberToByte } from "../constants/byte-conversion";
import type { Byte } from "../interface/interfaces";
import { Bus } from "./bus/bus";
import { Bus1 } from "./bus/bus1";
import { Clock } from "./clock/clock";
import { Alu } from "./logic/alu";
import { ControlUnit } from "./logic/control-unit/control-unit";
import { BitMemory } from "./memory/bit-memory";
import { ByteMemory } from "./memory/byte-memory";
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
    public flags = new ByteMemory(new Bus);

    public controlUnit = new ControlUnit(this.alu, this.ram, this.registers, this.tmp, this.bus1, this.acc, this.iar, this.ir, this.flags);
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
        this.pc = startAddress;
        this.programEndAddress = this.programStartAddress + program.length;

    }

    public run(userInputCycleNum?: number) {
        const val = userInputCycleNum ? this.pc + userInputCycleNum : this.programEndAddress;
        //first cycle is always 23 the rest are 24
        // if (this.pc > this.programEndAddress + 1) throw new Error("Stack overflow! The real thing xD");
        // if (userInputCycleNum !== undefined && userInputCycleNum > this.programEndAddress + 1) throw new Error("Stack overflow! The real thing xD");

        while (this.pc < val) {
            if (this.isFirstRun) {
                this.runCycle(23);
                this.isFirstRun = false;
                // console.log(this.iar.getData());
            } else {
                this.runCycle(24);
         
            }
            this.pc++;
            // console.log("RUN");
                   console.log(this.iar.getData());
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

    public assembler(program: string): Byte[] {
        const lines: string[] = program.split(";");
        lines.pop();


        const result: Byte[] = [];

        for (let line of lines) {
            line = line.replace("  ","").trim();
            const byte: Byte = [0, 0, 0, 0, 0, 0, 0, 0];
            if (line.startsWith("ADD")) { // ADD = 1000
                line = line.replace("ADD", "").trim();
                byte[0] = 1; byte[1] = 0; byte[2] = 0; byte[3] = 0;
            }
            else if (line.startsWith("SHR")) { // SHR = 1001
                line = line.replace("SHR", "").trim();
                byte[0] = 1; byte[1] = 0; byte[2] = 0; byte[3] = 1;
            }
            else if (line.startsWith("SHL")) { // SHL = 1010
                line = line.replace("SHL", "").trim();
                byte[0] = 1; byte[1] = 0; byte[2] = 1; byte[3] = 0;
            }
            else if (line.startsWith("NOT")) { // NOT = 1011
                line = line.replace("NOT", "").trim();
                byte[0] = 1; byte[1] = 0; byte[2] = 1; byte[3] = 1;
            }
            else if (line.startsWith("AND")) { // AND = 1100
                line = line.replace("AND", "").trim();
                byte[0] = 1; byte[1] = 1; byte[2] = 0; byte[3] = 0;
            }
           
            else if (line.startsWith("OR")) { // OR = 1101
                line = line.replace("OR", "").trim();
                byte[0] = 1; byte[1] = 1; byte[2] = 0; byte[3] = 1;
            }
            else if (line.startsWith("XOR")) { // XOR = 1110
                line = line.replace("XOR", "").trim();
                byte[0] = 1; byte[1] = 1; byte[2] = 1; byte[3] = 0;
            }
           
            else if (line.startsWith("CMP")) { // CMP = 1111
                line = line.replace("CMP", "").trim();
                byte[0] = 1; byte[1] = 1; byte[2] = 1; byte[3] = 1;
            }
            else if (line.startsWith("LD")) { // LD = 0000
                line = line.replace("LD", "").trim();
                byte[0] = 0; byte[1] = 0; byte[2] = 0; byte[3] = 0;
            }
            else if (line.startsWith("ST")) { // ST = 0001
                line = line.replace("ST", "").trim();
                byte[0] = 0; byte[1] = 0; byte[2] = 0; byte[3] = 1;
            }
            else if (line.startsWith("DATA")) { // DATA = 0010
                line = line.replace("DATA", "").trim();
                byte[0] = 0; byte[1] = 0; byte[2] = 1; byte[3] = 0;

                //IF RB in this case is a value instead of register
                
                const [a,b] = line.split(",");
                const cleaned = b.replace(/\s+/g, "");
                const parsed = parseInt(cleaned, 10);

                if (!isNaN(parsed)) {
                    this.setRB(a, byte);
                    result.push(byte);
                    const byte1: Byte = numberToByte(parsed);
                    result.push(byte1);
                } else
                {
                    throw new Error("Data instruction error");
                }
                continue;
            }
            else if (line.startsWith("JMPR")) { // JMPR = 0011
                line = line.replace("JMPR", "").trim();
                byte[0] = 0; byte[1] = 0; byte[2] = 1; byte[3] = 1;
                
            }
            else if (line.startsWith("JMP")) { // JMP = 0100
                line = line.replace("JMP", "").trim();
                byte[0] = 0; byte[1] = 1; byte[2] = 0; byte[3] = 0;

                const digits = line.match(/\d+/g) ?? "";

                if (digits && !isNaN(Number(digits[0]))) {
                    result.push(byte);
                    const byte1: Byte = numberToByte(Number(digits[0]));
                    result.push(byte1);
                } else
                {
                    throw new Error("JMP instruction error");
                }
                continue;
            }
            else if (line.startsWith("J")) { // JCAEZ = 0101
                line = line.replace("J", "").trim();
                byte[0] = 0; byte[1] = 1; byte[2] = 0; byte[3] = 1;

                let RB = 'R0';
               
                if(line.includes('E')) RB = 'R2';
                if(line.includes('Z')) RB = 'R1';
                if(line.includes('E') && line.includes('Z')) RB = 'R3';
                let RA = 'R0';
           
                if(line.includes('C')) RA = 'R2';
                if(line.includes('A')) RA = 'R1';
                if(line.includes('C') && line.includes('A')) RA = 'R3';
                this.setRA(RA, byte);
                this.setRB(RB, byte);
                
                // result.push(byte);

                // const cleaned = line.replace(/\s+/g, "");
                // const parsed = parseInt(cleaned, 10);
                const digits = line.match(/\d+/g) ?? "";
                if (digits && !isNaN(Number(digits[0]))) {
                    result.push(byte);
                    const byte1: Byte = numberToByte(Number(digits[0]));
                    result.push(byte1);
                } else
                {
                    throw new Error("JIF instruction error");
                }
                continue;

            }
            else if (line.startsWith("CLF")) { // CLF = 0110
                line = line.replace("CLF", "").trim();
                byte[0] = 0; byte[1] = 1; byte[2] = 1; byte[3] = 0;
            }


            const [RA, RB] = line.split(",");
            this.setRA(RA, byte);
            this.setRB(RB, byte);

            result.push(byte);
        }


        return result;

    }

    private setRA(RA: string, byte: Byte){
        if (RA.includes("R0")) {
            byte[4] = 0;
            byte[5] = 0;
        }
        else if (RA.includes("R1")) {
            byte[4] = 0;
            byte[5] = 1;
        }
        else if (RA.includes("R2")) {
            byte[4] = 1;
            byte[5] = 0;
        }
        else if (RA.includes("R3")) {
            byte[4] = 1;
            byte[5] = 1;
        }
        else {
            byte[4] = 0;
            byte[5] = 0;
        }
    }

    private setRB(RB: string, byte: Byte){
        if (RB.includes("R0")) {
            byte[6] = 0;
            byte[7] = 0;
        }
        else if (RB.includes("R1")) {
            byte[6] = 0;
            byte[7] = 1;
        }
        else if (RB.includes("R2")) {
            byte[6] = 1;
            byte[7] = 0;
        }
        else if (RB.includes("R3")) {
            byte[6] = 1;
            byte[7] = 1;
        }
        else {

            byte[6] = 0;
            byte[7] = 0;
        }
    }
}