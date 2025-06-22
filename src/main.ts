// import './style.css'
// import { setupCounter } from './counter.ts'

import { byteToNumber, numberToByte } from "./constants/byte-conversion";
import { Bus } from "./CPU8/bus/bus";
import { Bus1 } from "./CPU8/bus/bus1";
import { Clock } from "./CPU8/clock/clock";
import { Alu } from "./CPU8/logic/alu";
import { Counter } from "./CPU8/logic/control-unit/counter";
import { Counter2 } from "./CPU8/logic/control-unit/counter2";
import { Stepper } from "./CPU8/logic/control-unit/stepper";
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



// const alu1 = new Alu();
// const ram = new Ram(new Bus);

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



// const counter = new Counter2();

// counter.setInputs(1)
// counter.setInputs(0)

// console.log(counter.getOutput())


const stepper = new Stepper();







// stepper.setInputs(0)
// stepper.setInputs(1)


    //in    0101 0101 
        //clk   0110 0110
        //clke  1110 1110
        //clks  0100 0100
//         console.log(stepper.getOutput())
// stepper.setInputs(0)
// console.log(stepper.getOutput())
// stepper.setInputs(1)
// console.log(stepper.getOutput())
// stepper.setInputs(1)
// console.log(stepper.getOutput())
// stepper.setInputs(0)
// console.log(stepper.getOutput())
// stepper.setInputs(0)
// console.log(stepper.getOutput())
// stepper.setInputs(1)
// console.log(stepper.getOutput())
// stepper.setInputs(1)
// console.log(stepper.getOutput())
// stepper.setInputs(0)
// console.log(stepper.getOutput())

// stepper.setInputs(0)
// stepper.setInputs(1)
// stepper.setInputs(1)
// stepper.setInputs(0)

// console.log(stepper.getOutput())

// stepper.setInputs(0)
// stepper.setInputs(1)
// stepper.setInputs(1)
// stepper.setInputs(0)

// console.log(stepper.getOutput())

// stepper.setInputs(0)
// stepper.setInputs(1)
// stepper.setInputs(1)
// stepper.setInputs(0)

// console.log(stepper.getOutput())

// stepper.setInputs(0)
// stepper.setInputs(1)
// stepper.setInputs(1)
// stepper.setInputs(0)

// console.log(stepper.getOutput())

// stepper.setInputs(0)
// stepper.setInputs(1)
// stepper.setInputs(1)
// stepper.setInputs(0)

// console.log(stepper.getOutput())

// stepper.setInputs(0)
// stepper.setInputs(1)
// stepper.setInputs(1)
// stepper.setInputs(0)

// console.log(stepper.getOutput())

// stepper.setInputs(0)
// stepper.setInputs(1)
// stepper.setInputs(1)
// stepper.setInputs(0)

// console.log(stepper.getOutput())


const bus = new Bus()
const ram = new Ram(bus);

bus.setInputs([1,1,1,1,0,0,0,0]);
ram.setMarInputs(1);
bus.setInputs(numberToByte(133));
ram.setInputs(1,0);
console.log(ram)


const bus1 = new Bus1();
bus1.setInputs([1, 0, 1, 1, 0, 0, 1, 1], 1)
console.log(bus1.getOutput())




