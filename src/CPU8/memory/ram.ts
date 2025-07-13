import { byteToNumber, numberToByte } from "../../constants/byte-conversion";
import type { Bit, Byte, Word } from "../../interface/interfaces";
import { Bus } from "../bus/bus";
import { Decoder4x16 } from "../logic/decoder4x16";
import { RamCell } from "./ram-cell";
import { Register } from "./register";
// import { Register } from "./register";



export class Ram {
    private mar: Register;

    private rowDecoder: Decoder4x16;
    private columnDecoder: Decoder4x16;

    private dataGrid: RamCell[][];

    constructor(bus: Bus) {
        this.mar = new Register(bus);

        this.rowDecoder = new Decoder4x16();
        this.columnDecoder = new Decoder4x16();

        this.dataGrid = Array.from({ length: 16 }, () =>
            Array.from({ length: 16 }, () => new RamCell(bus))
        );

    }

    setMarInputs(s: Bit) {
        if(s === 1){
            this.mar.setInputs(s);
        }
       
    }

    getMarOutput(){
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
        if(startAddress > 255) throw new Error("Address excedes size of the ram! Avaiable addresses 0 - 255");
    
        if(startAddress + data.length > 255) throw new Error("Not enough address space/memory");
        
        for (let i = 0; i < data.length; i++) {
            this.pickRamCell(numberToByte(startAddress + i)).register.setInputsFromNonBus(data[i]);
        }
    }

    getRamCellManually(startAddress: number){
        if(startAddress > 255) throw new Error("Address excedes size of the ram! Avaiable addresses 0 - 255");
        return this.pickRamCell(numberToByte(startAddress));

    }

    private pickRamCell(address: Byte) {
        let input = address;

        this.columnDecoder.setInputs(input[4], input[5], input[6], input[7]);
        this.rowDecoder.setInputs( input[0], input[1], input[2], input[3]);

        let column = this.columnDecoder.getOutput();
        let row = this.rowDecoder.getOutput();

        let x = this.rowColumn(column.reverse() as Word)
        let y = this.rowColumn(row)
        // console.log(row, column)
        // console.log(y,x)
        return this.dataGrid[y][x];
    }

    public ramList(){
        this.dataGrid.map(row => {
            row.map(item => console.log(byteToNumber(item.register.getData())))
        })
    }

    // private pickRamCellTest(address: Byte) {
    //     let input = address;

    //     this.columnDecoder.setInputs(input[4], input[5], input[6], input[7]);
    //     this.rowDecoder.setInputs( input[0], input[1], input[2], input[3]);

    //     let column = this.columnDecoder.getOutput();
    //     let row = this.rowDecoder.getOutput();

    //     let x = this.rowColumn(column.reverse() as Word)
    //     let y = this.rowColumn(row)
    //     console.log(row, column)
    //     // console.log(y,x)
    //     return this.dataGrid[y][x];
    // }

    private rowColumn(x: Word): number {
        let res = 0;
        for (let i = 0; i < x.length; i++) {
            if (x[i] === 1) break;
            res++;
        }
        return res;
    }

   
}