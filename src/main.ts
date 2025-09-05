// // import { byteToNumber, numberToByte } from "./constants/byte-conversion";
// // import { Computer } from "./CPU8/computer";
// // import { Decoder3x8 } from "./CPU8/logic/decoder3x8";
// // import type { Byte } from "./interface/interfaces";

// import { byteToNumber, numberToByte } from "./constants/byte-conversion";
// import { Computer } from "./CPU8/computer";
// import { Comparator8 } from "./CPU8/logic/comparator8";
// import type { RamCell } from "./CPU8/memory/ram-cell";
// import type { Byte } from "./interface/interfaces";











// // // const decoder3x8 = new Decoder3x8();

// // // decoder3x8.setInputs(
// // //   1,1,0
// // // );

// // // const [a, b, c, d, e, f, g, j] = decoder3x8.getOutput()
// // // console.log([a, b, c, d, e, f, g, j])


// // // const computer = new Computer();

// // // const start = 5;
// // // const program = [
// // //     [1, 0, 1, 1, 0, 0, 1, 0],
// // //     [0, 1, 1, 0, 1, 0, 0, 1],
// // //     [1, 1, 0, 0, 0, 1, 1, 0],
// // //     [0, 0, 1, 1, 1, 0, 0, 1],
// // //     [1, 0, 0, 0, 1, 1, 0, 1],
// // //     [0, 1, 0, 1, 1, 1, 1, 0],
// // //     [1, 1, 1, 0, 0, 0, 1, 1],
// // //     [0, 0, 0, 1, 1, 1, 0, 0],
// // //     [1, 0, 1, 0, 1, 1, 0, 0],
// // //     [0, 1, 0, 0, 0, 1, 0, 1],
// // //     [1, 0, 1, 1, 0, 0, 1, 0],
// // //     // [0, 1, 1, 0, 1, 0, 0, 1],
// // //     // [1, 1, 0, 0, 0, 1, 1, 0],
// // //     // [0, 0, 1, 1, 1, 0, 0, 1],
// // //     // [1, 0, 0, 0, 1, 1, 0, 1],
// // //     // [0, 1, 0, 1, 1, 1, 1, 0],
// // //     // [1, 1, 1, 0, 0, 0, 1, 1],
// // //     // [0, 0, 0, 1, 1, 1, 0, 0],
// // //     // [1, 0, 1, 0, 1, 1, 0, 0],
// // //     // [1, 0, 1, 1, 0, 0, 1, 0],
// // //     // [0, 1, 1, 0, 1, 0, 0, 1],
// // //     // [1, 1, 0, 0, 0, 1, 1, 0],
// // //     // [0, 0, 1, 1, 1, 0, 0, 1],
// // //     // [1, 0, 0, 0, 1, 1, 0, 1],
// // //     // [0, 1, 0, 1, 1, 1, 1, 0],
// // //     // [1, 1, 1, 0, 0, 0, 1, 1],
// // //     // [0, 0, 0, 1, 1, 1, 0, 0],
// // //     // [1, 0, 1, 0, 1, 1, 0, 0],
// // //     // [1, 0, 1, 1, 0, 0, 1, 0],
// // //     // [0, 1, 1, 0, 1, 0, 0, 1],
// // //     // [1, 1, 0, 0, 0, 1, 1, 0],
// // //     // [0, 0, 1, 1, 1, 0, 0, 1],
// // //     // [1, 0, 0, 0, 1, 1, 0, 1],
// // //     // [0, 1, 0, 1, 1, 1, 1, 0],
// // //     // [1, 1, 1, 0, 0, 0, 1, 1],
// // //     // [0, 0, 0, 1, 1, 1, 0, 0],
// // //     // [1, 0, 1, 0, 1, 1, 0, 0],
// // //     // [1, 0, 1, 1, 0, 0, 1, 0],
// // //     // [0, 1, 1, 0, 1, 0, 0, 1],
// // //     // [1, 1, 0, 0, 0, 1, 1, 0],
// // //     // [0, 0, 1, 1, 1, 0, 0, 1],
// // //     // [1, 0, 0, 0, 1, 1, 0, 1],
// // //     // [0, 1, 0, 1, 1, 1, 1, 0],
// // //     // [1, 1, 1, 0, 0, 0, 1, 1],
// // //     // [0, 0, 0, 1, 1, 1, 0, 0],
// // //     // [1, 0, 1, 0, 1, 1, 0, 0]
// // // ]

// // // computer.insertProgramIntoRAM(start, program as Byte[]);

// // // console.log(computer.ram)

// // //     for (let i = start; i < program.length + start; i++) {
// // //         // 
// // //         computer.run(1);
// // //         console.log(byteToNumber(computer.iar.getData()))
// // //         console.log(byteToNumber(computer.ram.getMarOutput()))



// // //     }




// // // const computer = new Computer();
// // // computer.insertProgramIntoRAM(0, [
// // //     [0, 0, 0, 1, 1, 1, 1, 0],

// // // ]);


// // //     computer.registers[3].setInputsFromNonBus(numberToByte(5)); //address where to store
// // //     computer.registers[2].setInputsFromNonBus([1,1,1,1,1,1,1,0]); //value to store
// // //     computer.run(1)

// // //     console.log(computer.ram)
// // //     computer.ram.ramList()


// // const computer = new Computer();
// // computer.insertProgramIntoRAM(0, [
// //     [0, 0, 0, 1, 1, 1, 1, 0], //STORE
// //     [0, 0, 0, 0, 1, 1, 1, 0], //LOAD

// //     // [0, 0, 0, 1, 0, 0, 0, 1],
// //     // [0, 0, 0, 0, 0, 0, 0, 1],

// //     // [0, 0, 0, 1, 1, 0, 1, 1],
// //     // [0, 0, 0, 0, 1, 1, 0, 1],

// //     // [0, 0, 0, 1, 0, 0, 0, 1],
// //     // [0, 0, 0, 0, 1, 0, 1, 1],

// //     // [0, 0, 0, 1, 1, 1, 0, 0], 
// //     // [0, 0, 0, 1, 1, 1, 1, 0], 
// // ]);

// // const tests: { RA: number, RA_VAL: number, RB: number, RB_VAL: number }[] = [
// //     { RA: 3, RA_VAL: 10, RB: 2, RB_VAL: 100 }, //STORE 100 into RAM address 10
// //     // { RA: 3, RA_VAL: 10, RB: 2, RB_VAL: 100}, //LOAD RAM address 10 into RB
// //     // { RA: 0, RA_VAL: 101, RB: 1, RB_VAL: 111 },
// //     // { RA: 0, RA_VAL: 101, RB: 1, RB_VAL: 111 },
// //     // { RA: 2, RA_VAL: 11, RB: 3, RB_VAL: 166 },
// //     // { RA: 3, RA_VAL: 11, RB: 1, RB_VAL: 166 },
// //     // { RA: 0, RA_VAL: 171, RB: 1, RB_VAL: 131 },
// //     // { RA: 2, RA_VAL: 171, RB: 3, RB_VAL: 131 },
// //     // { RA: 3, RA_VAL: 55,  RB: 0, RB_VAL: 77 },
// //     // { RA: 3, RA_VAL: 99,  RB: 2, RB_VAL: 88 },

// // ]


// // for (let i = 0; i < tests.length; i++) { 
// //     console.log('ir ', computer.ir.getData()[3])
// //     if(i %){

// //             computer.registers[test.RA].setInputsFromNonBus(numberToByte(test.RA_VAL)); //address where to store    REG A
// //             computer.registers[test.RB].setInputsFromNonBus(numberToByte(test.RB_VAL)); //value to store            REG B
// //             computer.run(1)

// //             // expect(byteToNumber(computer.ram.getRamCellManually(test.RA_VAL).register.getData())).toEqual(test.RB_VAL);


// //     } else {

// //             computer.registers[test.RA].setInputsFromNonBus(numberToByte(test.RA_VAL)); //address from where to load    REG A
// //             computer.run(1)
// //              //BEcause we insert LOAD instruction and a value, we have to do 2 fetch execute cycles instead of 1

// //             // console.log(computer.ram.getRamCellManually(test.RA_VAL).register.getData(), computer.registers[test.RB].getData())
// //             // expect(computer.ram.getRamCellManually(test.RA_VAL).register.getData()).toEqual( computer.registers[test.RB].getData());


// //     }




// // }
// // console.log(computer.ram.ramList())



// // const computer = new Computer();
// // const program = computer.assembler(

// //     "DATA R3, 115;"
// //     +"DATA R1, 116;"
// //     +"XOR R3, R1;"

// //     // +"JMP 210, R0;"
// //     // ""
// // )
// // console.log(program)
// // computer.insertProgramIntoRAM(0, program);
// // computer.run(3);
// // console.log(computer.registers[1].getData());
// // console.log(computer.iar.getData())
// // console.log(computer.ram.getMarOutput())
// // computer.insertProgramIntoRAM(0, [
// //     [0, 0, 0, 1, 1, 1, 1, 0], //STORE
// //     [0, 0, 0, 0, 1, 1, 1, 0], //LOAD

// //     [0, 0, 0, 1, 0, 0, 0, 1],
// //     [0, 0, 0, 0, 0, 0, 0, 1],

// //     [0, 0, 0, 1, 1, 0, 1, 1],
// //     [0, 0, 0, 0, 1, 1, 0, 1],

// //     [0, 0, 0, 1, 0, 0, 0, 1],
// //     [0, 0, 0, 0, 1, 0, 1, 1],

// //     [0, 0, 0, 1, 1, 1, 0, 0],
// //     [0, 0, 0, 0, 0, 1, 0, 1],

// //     [0, 0, 0, 1, 1, 1, 0, 0],
// //     [0, 0, 0, 0, 0, 1, 0, 1],

// //     [0, 0, 0, 1, 1, 1, 1, 0],
// //     [0, 0, 0, 0, 1, 1, 1, 0],
// // ]);

// // const tests: { RA: number, RA_VAL: number, RB: number, RB_VAL: number }[] = [
// //     { RA: 3, RA_VAL: 110, RB: 2, RB_VAL: 100 }, //STORE 100 into RAM address 10
// //     { RA: 3, RA_VAL: 110, RB: 2, RB_VAL: 100 }, //LOAD RAM address 10 into RB

// //     { RA: 0, RA_VAL: 101, RB: 1, RB_VAL: 111 },
// //     { RA: 0, RA_VAL: 101, RB: 1, RB_VAL: 111 },

// //     { RA: 2, RA_VAL: 111, RB: 3, RB_VAL: 166 },
// //     { RA: 3, RA_VAL: 111, RB: 1, RB_VAL: 166 },

// //     { RA: 0, RA_VAL: 171, RB: 1, RB_VAL: 131 },
// //     { RA: 2, RA_VAL: 171, RB: 3, RB_VAL: 131 },

// //     { RA: 3, RA_VAL: 55, RB: 0, RB_VAL: 77 },
// //     { RA: 1, RA_VAL: 55, RB: 1, RB_VAL: 77 },

// //     { RA: 3, RA_VAL: 55, RB: 0, RB_VAL: 77 },
// //     { RA: 1, RA_VAL: 55, RB: 1, RB_VAL: 77 },

// //     { RA: 3, RA_VAL: 99, RB: 2, RB_VAL: 88 },
// //     { RA: 3, RA_VAL: 99, RB: 2, RB_VAL: 88 },

// // ]

// // for (let i = 0; i <= tests.length - 1; i++) {
// //     if (i % 2 === 0) {

// //         computer.registers[tests[i].RA].setInputsFromNonBus(numberToByte(tests[i].RA_VAL)); //address where to store    REG A
// //         computer.registers[tests[i].RB].setInputsFromNonBus(numberToByte(tests[i].RB_VAL)); //value to store            REG B
// //         computer.run(1)


// //         // console.log("STORE:", {
// //         //     address: tests[i].RA_VAL,
// //         //     expected: tests[i].RB_VAL,
// //         //     actual: byteToNumber(computer.ram.getRamCellManually(tests[i].RA_VAL).register.getData())
// //         // });


// //     } else {

// //         computer.registers[tests[i].RA].setInputsFromNonBus(numberToByte(tests[i].RA_VAL)); //address from where to load    REG A
// //         // console.log(">>> PRE RUN");
// //         // console.log("RA reg (addr):", byteToNumber(computer.registers[tests[i].RA].getData()));
// //         // console.log("RB reg (LOAD target):", byteToNumber(computer.registers[tests[i].RB].getData()));
// //         // console.log("RAM[RA_VAL]:", byteToNumber(computer.ram.getRamCellManually(tests[i].RA_VAL).register.getData()));

// //         computer.run(1);

// //         // console.log(">>> POSLE RUN");
// //         // console.log("RB reg (LOAD target):", byteToNumber(computer.registers[tests[i].RB].getData()));



// //         // expect(byteToNumber(computer.acc.getData())).toEqual(110)
// //         // console.log("LOAD:", {
// //         //     address: tests[i].RA_VAL,
// //         //     expected: tests[i].RB_VAL,
// //         //     actual: byteToNumber(computer.registers[tests[i].RB].getData())
// //         // });



// //     }
// // }

// // computer.ram.ramList();
// // console.log(computer.ram)

// const computer = new Computer();


// //subtract 210-216
// computer.insertProgramIntoRAM(221,
//     computer.assembler(
//         "ST R2, R3;"
//         + "NOT R0,R0;"
//         + "DATA R2, 1;"
//         + "ADD R2, R0;"
//         + "ADD R1, R0;"
//         + "NOT R0, R0;"
//         + "ADD R2, R0;"
//         + "DATA R2, 2;"
//         + "LD R2, R3;"
//         + "JMPR --, R3;"
//     )
// );

// // //increment R0 227-230
// // computer.insertProgramIntoRAM(227,
// //     computer.assembler(
// //         "DATA R2, 1;"
// //         + "ADD R2, R0;"
// //         + "ADD R2, R3;"
// //         + "JMPR --, R3;"
// //     )
// // );

// // computer.insertProgramIntoRAM(245,
// //     computer.assembler(

// //         "CLF;"
// //         +"ADD R0, R2;"
// //         +"JMPR, R3;"
// //     )
// // );

// //Znaci SHL na R0 I SHR na R1 se rade svaki put, stim sto se vrednost R0 dodaje u rezultat kad je R1 neparan
// //mul R1 241
// computer.insertProgramIntoRAM(233,
//     computer.assembler(
//         "ST R2, R3;"
//         + "DATA R2, 0;" //234, 235 
//         +"SHR R1, R1;" //236 Check if R1 is uneven
//         +"JC, 240;" //237, 238 If carry, that means its uneven, then jump to 240
//         +"JMP, 243;" //239, 240
//         +"CLF;" //241
//         +"ADD R0, R2;" //242
//         +"SHL R0, R0;" //243
//         +"AND R1,R1;" //244
//         +"JZ, 248;" //245, 246
//         +"JMP, 236;" //247, 248
//         +"XOR R2, R0;" //249 R0 = A XOR B
//         +"XOR R0, R2;" //250 R1 = B XOR (A XOR B) = A
//         +"XOR R2, R0;" //251 R0 = (A XOR B) XOR A = B
//         +"DATA R2, 2;" //252, 253
//         +"LD R2, R3;" //254, 255
//         +"JMPR --,R3;" //256
//     )
// );

// computer.insertProgramIntoRAM(0,
//     computer.assembler(
//         "JMP, 0;"
//     )
// );


// computer.insertProgramIntoRAM(10,
//     computer.assembler(
//         "DATA R0, 27;" //10, 11
//         + "DATA R1, 7;" //12, 13
//         + "DATA R2, 2;" //14, 15
//         + "DATA R3, 20;" //16, 17
//         + "JMP, 221;" //18, 19
//         + "DATA R2, 2;" //20, 21
//         + "DATA R3, 26;" //22, 23
//         + "JMP, 233;" //24, 25
//         + "JMP, 0;" 
//         // + "CMP R1, R0;"
//         // + "JA, 210;"
//     )
// );
// computer.run(127)
//  // 3, 37; 6, 16; 12, 8; 24, 4, 48, 2, 96, 0

// // console.log(computer.assembler(
// //     "DATA R0, 152;"
// //     +"DATA R1, 51;"
// //     +"ADD R0, R1;"
// //     +"ADD R0, R1;"
// //     // +"JC, 111;"
// //     // // +"DATA R2, 16;"
// //     +"CLF;"

// // ))

// // setInterval(() => computer.run(1), 1);

// console.log("R0 ", byteToNumber(computer.registers[0].getData()), computer.registers[0].getData())
// console.log("R1 ", byteToNumber(computer.registers[1].getData()), computer.registers[1].getData())
// console.log("R2 ", byteToNumber(computer.registers[2].getData()), computer.registers[2].getData())
// console.log("R3 ", byteToNumber(computer.registers[3].getData()), computer.registers[3].getData())
// console.log("IAR ", byteToNumber(computer.iar.getData()), computer.iar.getData())
// console.log("FLAGS ", byteToNumber(computer.flags.getData()), computer.flags.getData())

// const ramContent: Byte[] = computer.ram.ramList();

// const app = document.getElementById("ram")
// for (let i = 0; i < ramContent.length; i++) {
//     const div = document.createElement('div')
//     const isIAR = i === byteToNumber(computer.iar.getData()) ;
//     const isIR = i === byteToNumber(computer.ram.getMarOutput());

//     if (isIAR) div.classList.add('iar');
//     if (isIR) div.classList.add('ir');
//     div.innerText = `${i} - ${byteToNumber(ramContent[i])} - ${ramContent[i]}`
//     app?.appendChild(div);
// }

// console.log(app)


// // setInterval(() => computer.run(11), 1000)


// const emulator = new Worker("emulatorWorker.js");
// emulator.postMessage({ cmd: "LOAD", program: "print('hi')" });
// emulator.postMessage({ cmd: "STEP" });
// emulator.postMessage({ cmd: "STEP" });
// emulator.postMessage({ cmd: "GET_STATE" })


// emulator.onmessage = (e) => {
//     console.log("Main got:", e.data);
//   };