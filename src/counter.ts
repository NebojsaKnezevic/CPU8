// // export function setupCounter(element: HTMLButtonElement) {
// //   let counter = 0
// //   const setCounter = (count: number) => {
// //     counter = count
// //     element.innerHTML = `count is ${counter}`
// //   }
// //   element.addEventListener('click', () => setCounter(counter + 1))
// //   setCounter(0)
// // }


// // export class Counter {
// //   private counter: number = 0
// //   private element: HTMLButtonElement
  
// //   constructor(element: HTMLButtonElement) {
// //     this.element = element
// //     this.element.addEventListener('click', () => this.increment())
// //     this.render()
// //   }

// //   private setCounter(count: number) {
// //     this.counter = count
// //     this.render()
// //   }

// //   private increment() {
// //     this.setCounter(this.counter + 1)
// //   }

// //   private render() {
// //     this.element.innerHTML = `count is ${this.counter}`
// //   }
// // }
// import { NandGate, type Bit } from "./CPU8/logic/logic-gates";

// export class ActiveLowSRLatch {
//   private sBar: Bit = 1;
//   private rBar: Bit = 1;
//   private q: Bit = 0;
//   private notQ: Bit = 1;

//   public setInputs(sBar: Bit, rBar: Bit): void {
//     this.sBar = sBar;
//     this.rBar = rBar;

//     const nand1 = new NandGate();
//     const nand2 = new NandGate();

//     // iterativno izračunavanje stabilnog stanja
//     let tempQ: Bit = this.q;
//     let tempNotQ: Bit = this.notQ;

//     // pokušaj da se stabilizuje stanje
//     for (let i = 0; i < 3; i++) {
//       nand1.setInputs(this.sBar, tempNotQ);
//       nand2.setInputs(this.rBar, tempQ);
//       const newQ = nand1.getOutput();
//       const newNotQ = nand2.getOutput();

//       if (newQ === tempQ && newNotQ === tempNotQ) break;

//       tempQ = newQ;
//       tempNotQ = newNotQ;
//     }

//     this.q = tempQ;
//     this.notQ = tempNotQ;
//   }

//   public getQ(): Bit {
//     return this.q;
//   }

//   public getNotQ(): Bit {
//     return this.notQ;
//   }
// }


