// import './style.css'
// import { setupCounter } from './counter.ts'

import { byteToNumber, numberToByte } from "./constants/byte-conversion";
import { Bus } from "./CPU8/bus/bus";
import { Bus1 } from "./CPU8/bus/bus1";
import { Clock } from "./CPU8/clock/clock";
import { Alu } from "./CPU8/logic/alu";
import { ControlUnit } from "./CPU8/logic/control-unit/control-unit";
import { Counter } from "./CPU8/logic/control-unit/counter";
import { Counter2 } from "./CPU8/logic/control-unit/counter2";
import { Stepper } from "./CPU8/logic/control-unit/stepper";
import { NandGate } from "./CPU8/logic/logic-gates";
import { BitMemory } from "./CPU8/memory/bit-memory";
import { ByteMemory } from "./CPU8/memory/byte-memory";
import { Ram } from "./CPU8/memory/ram";
import { Register } from "./CPU8/memory/register";
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


// const stepper = new Stepper();







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


// const bus = new Bus()
// const ram = new Ram(bus);

// bus.setInputs([1,1,1,1,0,0,0,0]);
// ram.setMarInputs(1);
// bus.setInputs(numberToByte(133));
// ram.setInputs(1,0);
// console.log(ram)


// const bus1 = new Bus1();
// bus1.setInputs([1, 0, 1, 1, 0, 0, 1, 0], 1)
// console.log(bus1.getOutput())

const bus = new Bus();

const ram = new Ram(bus);
const registers = Array.from({ length: 4 }, () => new Register(bus));
const tmp = new Register(bus);
const bus1 = new Bus1(tmp);
// bus.setInputs(tmp.getData());
const acc = new Register(bus);
const iar = new Register(bus);
const ir = new Register(bus);
const alu = new Alu();
acc.initAluConnection(alu);
const controlUnit = new ControlUnit(alu, ram, registers, tmp, bus1, acc, iar, ir);


const clock = new Clock();

ram.setDataManually(0, [
    [1,0,1,1,0,0,1,0],
    [0,1,1,0,1,0,0,1],
    [1,1,0,0,0,1,1,0],
    [0,0,1,1,1,0,0,1],
    [1,0,0,0,1,1,0,1],
    [0,1,0,1,1,1,1,0],
    [1,1,1,0,0,0,1,1],
    [0,0,0,1,1,1,0,0],
    [1,0,1,0,1,1,0,0],
    [0,1,0,0,0,1,0,1]
  ]);

  console.log(ram)
  console.log("ram",ram.getRamCellManually(0).register.getData())

// export interface IAluInputs{
//     a: Byte,
//     b: Byte,
//     carry: Bit,
//     decoderInputs: {
//         a: Bit, b: Bit, c: Bit
//     }
// }

//STEP 1

for (let i = 0; i < 110; i++) {
    // 1. Prvo neka ALU izračuna na osnovu trenutnog stanja
    alu.setInputs({
        a: bus.getOutput(),
        b: bus1.getOutput(),
        carry: 0,
        decoderInputs: {
            a: 0, b: 0, c: 0 // ADD
        }
    });
    // acc.setInputsFromAlu(alu.getOutput().out)

    // 2. Sada control unit koristi nove izlaze
    controlUnit.setInputs(clock.getOutput());

    // 3. Tek onda menjaš clock za sledeći ciklus
    clock.setInputs();
    // console.log("Step:", i, "IAR:", iar.getData());
}
console.log("x", alu.getOutput(), acc.getData())
console.log("y", controlUnit.getOutput())

// controlUnit.setInputs(clock.getOutput());
// alu.setInputs({
//     a: bus.getOutput(),
//     b: bus1.getOutput(),
//     carry: 0,
//     decoderInputs: {
//         a: 0, b: 0, c: 0
//     }
// })

// clock.setInputs();
// controlUnit.setInputs(clock.getOutput());
// alu.setInputs({
//     a: bus.getOutput(),
//     b: bus1.getOutput(),
//     carry: 0,
//     decoderInputs: {
//         a: 0, b: 0, c: 0
//     }
// })

// clock.setInputs();
// controlUnit.setInputs(clock.getOutput());
// alu.setInputs({
//     a: bus.getOutput(),
//     b: bus1.getOutput(),
//     carry: 0,
//     decoderInputs: {
//         a: 0, b: 0, c: 0
//     }
// })
// console.log("STEP 1", controlUnit.getOutput())
// //STEP 2
// clock.setInputs();
// controlUnit.setInputs(clock.getOutput());
// alu.setInputs({
//     a: bus.getOutput(),
//     b: bus1.getOutput(),
//     carry: 0,
//     decoderInputs: {
//         a: 0, b: 0, c: 0
//     }
// })

// clock.setInputs();
// controlUnit.setInputs(clock.getOutput());
// alu.setInputs({
//     a: bus.getOutput(),
//     b: bus1.getOutput(),
//     carry: 0,
//     decoderInputs: {
//         a: 0, b: 0, c: 0
//     }
// })

// clock.setInputs();
// controlUnit.setInputs(clock.getOutput());
// alu.setInputs({
//     a: bus.getOutput(),
//     b: bus1.getOutput(),
//     carry: 0,
//     decoderInputs: {
//         a: 0, b: 0, c: 0
//     }
// })

// clock.setInputs();
// controlUnit.setInputs(clock.getOutput());
// alu.setInputs({
//     a: bus.getOutput(),
//     b: bus1.getOutput(),
//     carry: 0,
//     decoderInputs: {
//         a: 0, b: 0, c: 0
//     }
// })
// console.log("STEP 2", controlUnit.getOutput())
// //STEP 3
// clock.setInputs();
// controlUnit.setInputs(clock.getOutput());
// alu.setInputs({
//     a: bus.getOutput(),
//     b: bus1.getOutput(),
//     carry: 0,
//     decoderInputs: {
//         a: 0, b: 0, c: 0
//     }
// })

// clock.setInputs();
// controlUnit.setInputs(clock.getOutput());
// alu.setInputs({
//     a: bus.getOutput(),
//     b: bus1.getOutput(),
//     carry: 0,
//     decoderInputs: {
//         a: 0, b: 0, c: 0
//     }
// })

// clock.setInputs();
// controlUnit.setInputs(clock.getOutput());
// alu.setInputs({
//     a: bus.getOutput(),
//     b: bus1.getOutput(),
//     carry: 0,
//     decoderInputs: {
//         a: 0, b: 0, c: 0
//     }
// })

// clock.setInputs();
// controlUnit.setInputs(clock.getOutput());
// alu.setInputs({
//     a: bus.getOutput(),
//     b: bus1.getOutput(),
//     carry: 0,
//     decoderInputs: {
//         a: 0, b: 0, c: 0
//     }
// })
// console.log("STEP 3", controlUnit.getOutput())

// console.log("GRANICA")

// clock.setInputs();
// controlUnit.setInputs(clock.getOutput());
// console.log(controlUnit.getOutput())

// clock.setInputs();
// controlUnit.setInputs(clock.getOutput());
// console.log(controlUnit.getOutput())

// clock.setInputs();
// controlUnit.setInputs(clock.getOutput());
// console.log(controlUnit.getOutput())

// clock.setInputs();
// controlUnit.setInputs(clock.getOutput());
// console.log(controlUnit.getOutput())

// constructor(
//     alu: Alu,
//     ram: Ram,
//     registers: Register[],
//     tmp: Register,
//     bus1: Bus1,
//     acc: Register,
//     iar: Register,
//     ir: Register,
//     // clock: Clock
// )

//   private R: Register[];
//     private tmp: Register;
//     private bus1: Bus1;

//     private alu: Alu;
//     private acc: Register;

//     private iar: Register;
//     private ir: Register;

//     private ram: Ram;

//     private clock: Clock;
//     private stepper: Stepper;

//     private and: AndGate[] = [];
//     private or: OrGate[] = [];

//     private andm: AndGateM[] = [];
//     private orm: OrGateM[] = [];




