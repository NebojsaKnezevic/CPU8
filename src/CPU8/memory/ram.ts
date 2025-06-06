import type { Bit, Word } from "../../interface/interfaces";
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
        this.mar.setInputs(s);
    }

    setInputs(s: Bit, e: Bit) {
    
        const ramCell = this.pickRamCell();
        // console.log(ramCell)
        ramCell.setInputs(1, 1, s, e, 0);
        // console.log(ramCell)
        return ramCell;
    }

    private pickRamCell() {
        let input = this.mar.getData();

        this.columnDecoder.setInputs(input[4], input[5], input[6], input[7]);
        this.rowDecoder.setInputs( input[0], input[1], input[2], input[3]);

        let column = this.columnDecoder.getOutput();
        let row = this.rowDecoder.getOutput();

        let x = this.rowColumn(row)
        let y = this.rowColumn(column)
        // console.log(row, column)
        // console.log(x, y)
        return this.dataGrid[x][y];
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