// import './style.css'
// import { setupCounter } from './counter.ts'

import { byteToNumber, numberToByte } from "./constants/byte-conversion";
import { Bus } from "./CPU8/bus/bus";
import { Clock } from "./CPU8/clock/clock";
import { Alu } from "./CPU8/logic/alu";
import { NandGate } from "./CPU8/logic/logic-gates";
import { BitMemory } from "./CPU8/memory/bit-memory";
import { ByteMemory } from "./CPU8/memory/byte-memory";
import { Ram } from "./CPU8/memory/ram";
import type { Bit, IAluInputs, IAluOutputs } from "./interface/interfaces";

// import { BitMemory } from './CPU8/memory/bit-memory.ts';

// console.log("dsa")
//dsa
// PLAN...

// /cpu8
//   /tests/test...
//   /constants/config....
//   /bus
//     bus.ts 
//   /logic
//     logic-gates.ts
//   /alu
//     alu.ts
//   /memory
// bit-memory.ts
// byte-memory.ts
//     register.ts
//     ram.ts
//   controlUnit.ts
//   clock.ts
//   cpu.ts
//   workers/
//     clockWorker.ts
//     controlUnitWorker.ts
//     aluWorker.ts
//     ramWorker.ts
//     busWorker.ts

//you can build entire CPU with NAND OR NOR


// const bus = new Bus();
// const ram = new Ram(bus);

// bus.setInputs([0,0,0,0,0,0,0,0]);
// ram.setMarInputs(1);
// bus.setInputs([0,0,0,0,0,0,0,1]);
// ram.setInputs(1,0)

// bus.setInputs([0,0,0,0,0,0,0,1]);
// ram.setMarInputs(1);
// bus.setInputs([0,0,0,0,0,0,1,1]);
// ram.setInputs(1,0)

// bus.setInputs([0,0,0,0,0,0,1,0]);
// ram.setMarInputs(1);
// bus.setInputs([0,0,0,0,0,1,1,1]);
// ram.setInputs(1,0)

// bus.setInputs([0,0,0,1,0,0,0,0]);
// ram.setMarInputs(1);
// bus.setInputs([0,0,0,0,1,1,1,1]);
// ram.setInputs(1,0)

// console.log(ram)

// console.log(numberToByte(3))
// console.log(byteToNumber(numberToByte(3)))
// console.log(NandGate.counter)



const alu1 = new Alu();
const ram = new Ram(new Bus);

// alu.setInputs({
//         a: numberToByte(1),
//         b: numberToByte(0),
//         carry: 0,
//         decoderInputs: {
//                 a: 0, b: 1, c: 0
//         }
// })

// console.log(numberToByte(1))
// console.log(numberToByte(0))
// console.log(alu.getOutput())
// ram.setInputs(1,0)
// bus.setInputs([1,1,1,1,1,1,1,1]);
// ram.setInputs(0,0)
// console.log(bus.getOutput())



const aluInput: IAluInputs = {
        a: numberToByte(204),
        b: numberToByte(51),
        carry: 0,
        decoderInputs: { a: 0, b: 1, c: 1 }
};
alu1.setInputs(aluInput);
const aluOutput = alu1.getOutput();

const expectedOutput: IAluOutputs = {
        aLarger: 1,
        equal: 0,
        zero: 0,
        out: numberToByte(4),
        carryOut: 0
};
//     console.log(aluOutput, expectedOutput)


const clock = new Clock();
let cklin: Bit = 0;
for (let i = 0; i < 11; i++) {
        
        if (cklin) {
                cklin = 0;
        } else {
                cklin = 1;
        }
        
        clock.setInputs();
        console.log(cklin, clock.getOutput());
        
}










