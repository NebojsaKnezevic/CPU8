// import './style.css'
// import { setupCounter } from './counter.ts'
import { ActiveLowSRLatch } from './counter.ts'
import { Bus } from './CPU8/bus/bus.ts';
import { BitMemory } from './CPU8/memory/bit-memory.ts';
import { ByteMemory } from './CPU8/memory/byte-memory.ts';


// PLAN...

// /cpu8
//   /bus
//     bus.ts 
//   /logic
//     logicGates.ts
//   /alu
//     alu.ts
//   /memory
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

// new Counter(document.querySelector<HTMLButtonElement>('#counter')!)

// const sr = new ActiveLowSRLatch();
// sr.setInputs(0,0);
// console.log(sr.getQ(), sr.getNotQ());

// sr.setInputs(0,1);
// console.log(sr.getQ(), sr.getNotQ());

// sr.setInputs(1,1);
// console.log(sr.getQ(), sr.getNotQ());

// sr.setInputs(1,0);
// console.log(sr.getQ(), sr.getNotQ());

const srLatch = new BitMemory();
srLatch.setInputs(0,0); // treba 0
console.log(srLatch.getOutput());

srLatch.setInputs(0,1); // treba 0
console.log(srLatch.getOutput());

srLatch.setInputs(1,1); // treba 1
console.log(srLatch.getOutput());

srLatch.setInputs(0,0); // treba 0
console.log(srLatch.getOutput());

srLatch.setInputs(0,1); // treba 0
console.log(srLatch.getOutput());

srLatch.setInputs(1,1); // treba 1
console.log(srLatch.getOutput());

srLatch.setInputs(1,0); // treba 0
console.log(srLatch.getOutput());

srLatch.setInputs(0,1); // treba 0
console.log(srLatch.getOutput());



srLatch.setInputs(1,1); // treba 1
console.log(srLatch.getOutput());
srLatch.setInputs(1,0); // treba 0
console.log(srLatch.getOutput());
srLatch.setInputs(0,1); // treba 0
console.log(srLatch.getOutput());
srLatch.setInputs(0,0); // treba 0
console.log(srLatch.getOutput());
srLatch.setInputs(1,1); // treba 1
console.log(srLatch.getOutput());


const bus = new Bus();
bus.setInputs([1,1,1,0,0,0,0,0]);
console.log(bus.getOutput())

const byteMemory = new ByteMemory(bus);
byteMemory.setInputs(0);
byteMemory.getData();
console.log(byteMemory.getData()); // Nista, nema efekta...

byteMemory.setInputs(1);
byteMemory.getData();
console.log(byteMemory.getData()); // Prima input iz bus-a.


bus.setInputs([1,1,1,1,1,1,1,1]);
// console.log(bus.getOutput())
byteMemory.setInputs(1);
byteMemory.getData();
console.log(byteMemory.getData()); // Prima input iz bus-a.

bus.setInputs([1,1,1,0,0,0,0,0]); // setujem bus ponovo na tu vrednost
console.log(bus.getOutput())

byteMemory.getDataOnBus(1); // sada sacuvanu vrednost pustam na bus
console.log(bus.getOutput()) // sada bus mora imati vrednost iz bute memory gate-a.