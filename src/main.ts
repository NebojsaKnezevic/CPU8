// import './style.css'
// import { setupCounter } from './counter.ts'
import { ActiveLowSRLatch } from './counter.ts'
import { BitMemory } from './CPU8/memory/bit-memory.ts';


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
srLatch.setInputs(0,0);
console.log(srLatch.getQ());

srLatch.setInputs(0,1);
console.log(srLatch.getQ());

srLatch.setInputs(1,1);
console.log(srLatch.getQ());

srLatch.setInputs(1,0);
console.log(srLatch.getQ());

