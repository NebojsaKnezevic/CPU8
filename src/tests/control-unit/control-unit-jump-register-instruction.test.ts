import { describe, it , expect } from "vitest";
import { Computer } from "../../CPU8/computer";
import type { Byte } from "../../interface/interfaces";
import { byteToNumber, numberToByte } from "../../constants/byte-conversion";


//ALU 1                                     1 XXX - XX - XX

//Store is from REG to RAM, Store from RB to RAM address in RA
//Load is from RAM to REG, Load RB from RAM address in RA
//Store is from REG to RAM                  0 001 00 00
//Load is from RAM to REG                   0 000 00 00
//STORE: 1 LOAD: 0
//LOAD from next RAM address into RB,       0 010 -- 00
//Jump Register: jumps to address in RB     0 011 -- 00

describe("JUMP REGISTER INSTRUCTION", () => {
    const computer = new Computer();

    for (let I = 0; I < 100; I++) {
        it("Insert value into R[0]", () => {
            const rb = Math.floor(Math.random() * 3) + 0;
            const [a1,a2,a3,a4,a5,a6,a7,a8] = numberToByte(rb);
            const randomValue = Math.floor(Math.random() * 255) + 0;
    
            const program: Byte[] = [
                [0,0,1,0,0,0,a7,a8] //LOAD from next RAM address to RB
                ,numberToByte(randomValue) 
                ,[0,0,1,1,0,0,a7,a8]
            ];
            computer.insertProgramIntoRAM(0, program);
    
            computer.run(2);
    
            expect(byteToNumber(computer.iar.getData())).toEqual(randomValue);
        })
        
    }
  
});