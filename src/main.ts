// import './style.css'
// import { setupCounter } from './counter.ts'

import { byteToNumber, numberToByte } from "./constants/byte-conversion";
import { Bus } from "./CPU8/bus/bus";
import { Ram } from "./CPU8/memory/ram";

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


const bus = new Bus();
const ram = new Ram(bus);

bus.setInputs([0,0,0,0,0,0,0,0]);
ram.setMarInputs(1);
bus.setInputs([0,0,0,0,0,0,0,1]);
ram.setInputs(1,0)

bus.setInputs([0,0,0,0,0,0,0,1]);
ram.setMarInputs(1);
bus.setInputs([0,0,0,0,0,0,1,1]);
ram.setInputs(1,0)

bus.setInputs([0,0,0,0,0,0,1,0]);
ram.setMarInputs(1);
bus.setInputs([0,0,0,0,0,1,1,1]);
ram.setInputs(1,0)

bus.setInputs([0,0,0,1,0,0,0,0]);
ram.setMarInputs(1);
bus.setInputs([0,0,0,0,1,1,1,1]);
ram.setInputs(1,0)

console.log(ram)

console.log(numberToByte(3))
console.log(byteToNumber(numberToByte(3)))

// ram.setInputs(1,0)
// bus.setInputs([1,1,1,1,1,1,1,1]);
// ram.setInputs(0,0)
// console.log(bus.getOutput())
