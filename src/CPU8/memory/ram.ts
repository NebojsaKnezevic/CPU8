import { numberToByte } from "../../constants/byte-conversion";
import type { Bit, Byte, Word } from "../../interface/interfaces";
import { Bus } from "../bus/bus";
import { Decoder4x16 } from "../logic/decoder4x16";
import { RamCell } from "./ram-cell";
import { Register } from "./register";
// import { Register } from "./register";

/**
 * Interface for Ram class
 */
export interface IRam {
    /** MAR register */
    mar: Register;

    /** Row decoder */
    rowDecoder: Decoder4x16;

    /** Column decoder */
    columnDecoder: Decoder4x16;

    /** 16x16 RAM cell grid */
    dataGrid: RamCell[][];

    /** Set MAR inputs from system bus 
    * @param s - Set signal
    */
    setMarInputs(s: Bit): void;

    /** Get MAR output as Byte */
    getMarOutput(): Byte;

    /** Set inputs to RAM cell addressed by MAR 
    * @param s - Set signal
    * @param e - Enable signal
    */
    setInputs(s: Bit, e: Bit): RamCell;

    /** Set value in RAM (internal write) */
    setInRam(x: Bit): RamCell;

    /** Set value on bus from RAM (read) */
    setOnBus(x: Bit): RamCell;

    /** Set multiple bytes in RAM manually starting from an address */
    setDataManually(startAddress: number, data: Byte[]): void;

    /** Get a RAM cell manually by address */
    getRamCellManually(startAddress: number): RamCell;

    /** Flatten the RAM grid into a list of bytes 
    * @deprecated Dangerous to use! Avoid at all costs. 
    */
    ramList(): Byte[];
}


export class Ram implements IRam {
    public mar: Register;

    public rowDecoder: Decoder4x16;
    public columnDecoder: Decoder4x16;

    public dataGrid: RamCell[][];

    constructor(bus: Bus) {
        this.mar = new Register(bus);

        this.rowDecoder = new Decoder4x16();
        this.columnDecoder = new Decoder4x16();

        this.dataGrid = Array.from({ length: 16 }, () =>
            Array.from({ length: 16 }, () => new RamCell(bus))
        );

    }

    setMarInputs(s: Bit) {
        if (s === 1) {
            this.mar.setInputs(s);
        }

    }

    getMarOutput() {
        return [...this.mar.getData()] as Byte
    }

    setInputs(s: Bit, e: Bit) {

        const ramCell = this.pickRamCell(this.mar.getData());
        // console.log(ramCell)
        ramCell.setInputs(1, 1, s, e, 0);
        // console.log(ramCell)
        return ramCell;
    }

    setInRam(x: Bit) {

        const ramCell = this.pickRamCell(this.mar.getData());
        // console.log(ramCell)
        ramCell.setInputs(1, 1, x, 0, 0);
        // console.log(ramCell)
        return ramCell;
    }

    setOnBus(x: Bit) {

        const ramCell = this.pickRamCell(this.mar.getData());
        // console.log(ramCell)
        ramCell.setInputs(1, 1, 0, x, 0);
        // console.log(ramCell)
        return ramCell;
    }

    setDataManually(startAddress: number, data: Byte[]) {
        if (startAddress > 255) throw new Error("Address excedes size of the ram! Avaiable addresses 0 - 255");

        if (startAddress + data.length - 1 > 255) throw new Error("Not enough address space/memory");

        for (let i = 0; i < data.length; i++) {
            this.pickRamCell(numberToByte(startAddress + i)).register.setInputsFromNonBus(data[i]);
        }
    }

    getRamCellManually(startAddress: number) {
        if (startAddress > 255) throw new Error("Address excedes size of the ram! Avaiable addresses 0 - 255");
        return this.pickRamCell(numberToByte(startAddress));

    }

    private pickRamCell(address: Byte) {
        let input = address;

        this.columnDecoder.setInputs(input[4], input[5], input[6], input[7]);
        this.rowDecoder.setInputs(input[0], input[1], input[2], input[3]);

        let column = this.columnDecoder.getOutput();
        let row = this.rowDecoder.getOutput();

        // let x = this.rowColumn(column.reverse() as Word)
        let x = this.rowColumn(column)
        let y = this.rowColumn(row)
        // console.log(row, column)
        // console.log(y,x)
        return this.dataGrid[y][x];
    }

    public ramList(): Byte[] {
        const result: Byte[] = [];
        const rows: any[] = this.dataGrid.map(row => {
            return row.reverse().map(item => item.register.getData()) as Byte[]
        })

        for (let row in rows) {

            for (let byte of rows[row]) {
                // console.log(byte)
                result.push(byte)
            }
        }

        // return this.dataGrid.map(row => {
        //     return row.reverse().map(item => item.getData())
        // }) 

        return result;
    }

    private rowColumn(x: Word): number {
        let res = 0;
        for (let i = 0; i < x.length; i++) {
            if (x[i] === 1) break;
            res++;
        }
        return res;
    }
}