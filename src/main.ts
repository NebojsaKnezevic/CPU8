// import { byteToNumber, numberToByte } from "./constants/byte-conversion";
// import { Computer } from "./CPU8/computer";
// import { Decoder3x8 } from "./CPU8/logic/decoder3x8";
// import type { Byte } from "./interface/interfaces";

import { byteToNumber, numberToByte } from "./constants/byte-conversion";
import { Computer } from "./CPU8/computer";
import { Comparator8 } from "./CPU8/logic/comparator8";











// // const decoder3x8 = new Decoder3x8();

// // decoder3x8.setInputs(
// //   1,1,0
// // );

// // const [a, b, c, d, e, f, g, j] = decoder3x8.getOutput()
// // console.log([a, b, c, d, e, f, g, j])


// // const computer = new Computer();

// // const start = 5;
// // const program = [
// //     [1, 0, 1, 1, 0, 0, 1, 0],
// //     [0, 1, 1, 0, 1, 0, 0, 1],
// //     [1, 1, 0, 0, 0, 1, 1, 0],
// //     [0, 0, 1, 1, 1, 0, 0, 1],
// //     [1, 0, 0, 0, 1, 1, 0, 1],
// //     [0, 1, 0, 1, 1, 1, 1, 0],
// //     [1, 1, 1, 0, 0, 0, 1, 1],
// //     [0, 0, 0, 1, 1, 1, 0, 0],
// //     [1, 0, 1, 0, 1, 1, 0, 0],
// //     [0, 1, 0, 0, 0, 1, 0, 1],
// //     [1, 0, 1, 1, 0, 0, 1, 0],
// //     // [0, 1, 1, 0, 1, 0, 0, 1],
// //     // [1, 1, 0, 0, 0, 1, 1, 0],
// //     // [0, 0, 1, 1, 1, 0, 0, 1],
// //     // [1, 0, 0, 0, 1, 1, 0, 1],
// //     // [0, 1, 0, 1, 1, 1, 1, 0],
// //     // [1, 1, 1, 0, 0, 0, 1, 1],
// //     // [0, 0, 0, 1, 1, 1, 0, 0],
// //     // [1, 0, 1, 0, 1, 1, 0, 0],
// //     // [1, 0, 1, 1, 0, 0, 1, 0],
// //     // [0, 1, 1, 0, 1, 0, 0, 1],
// //     // [1, 1, 0, 0, 0, 1, 1, 0],
// //     // [0, 0, 1, 1, 1, 0, 0, 1],
// //     // [1, 0, 0, 0, 1, 1, 0, 1],
// //     // [0, 1, 0, 1, 1, 1, 1, 0],
// //     // [1, 1, 1, 0, 0, 0, 1, 1],
// //     // [0, 0, 0, 1, 1, 1, 0, 0],
// //     // [1, 0, 1, 0, 1, 1, 0, 0],
// //     // [1, 0, 1, 1, 0, 0, 1, 0],
// //     // [0, 1, 1, 0, 1, 0, 0, 1],
// //     // [1, 1, 0, 0, 0, 1, 1, 0],
// //     // [0, 0, 1, 1, 1, 0, 0, 1],
// //     // [1, 0, 0, 0, 1, 1, 0, 1],
// //     // [0, 1, 0, 1, 1, 1, 1, 0],
// //     // [1, 1, 1, 0, 0, 0, 1, 1],
// //     // [0, 0, 0, 1, 1, 1, 0, 0],
// //     // [1, 0, 1, 0, 1, 1, 0, 0],
// //     // [1, 0, 1, 1, 0, 0, 1, 0],
// //     // [0, 1, 1, 0, 1, 0, 0, 1],
// //     // [1, 1, 0, 0, 0, 1, 1, 0],
// //     // [0, 0, 1, 1, 1, 0, 0, 1],
// //     // [1, 0, 0, 0, 1, 1, 0, 1],
// //     // [0, 1, 0, 1, 1, 1, 1, 0],
// //     // [1, 1, 1, 0, 0, 0, 1, 1],
// //     // [0, 0, 0, 1, 1, 1, 0, 0],
// //     // [1, 0, 1, 0, 1, 1, 0, 0]
// // ]

// // computer.insertProgramIntoRAM(start, program as Byte[]);

// // console.log(computer.ram)

// //     for (let i = start; i < program.length + start; i++) {
// //         // 
// //         computer.run(1);
// //         console.log(byteToNumber(computer.iar.getData()))
// //         console.log(byteToNumber(computer.ram.getMarOutput()))



// //     }




// // const computer = new Computer();
// // computer.insertProgramIntoRAM(0, [
// //     [0, 0, 0, 1, 1, 1, 1, 0],

// // ]);


// //     computer.registers[3].setInputsFromNonBus(numberToByte(5)); //address where to store
// //     computer.registers[2].setInputsFromNonBus([1,1,1,1,1,1,1,0]); //value to store
// //     computer.run(1)

// //     console.log(computer.ram)
// //     computer.ram.ramList()


// const computer = new Computer();
// computer.insertProgramIntoRAM(0, [
//     [0, 0, 0, 1, 1, 1, 1, 0], //STORE
//     [0, 0, 0, 0, 1, 1, 1, 0], //LOAD

//     // [0, 0, 0, 1, 0, 0, 0, 1],
//     // [0, 0, 0, 0, 0, 0, 0, 1],

//     // [0, 0, 0, 1, 1, 0, 1, 1],
//     // [0, 0, 0, 0, 1, 1, 0, 1],

//     // [0, 0, 0, 1, 0, 0, 0, 1],
//     // [0, 0, 0, 0, 1, 0, 1, 1],

//     // [0, 0, 0, 1, 1, 1, 0, 0], 
//     // [0, 0, 0, 1, 1, 1, 1, 0], 
// ]);

// const tests: { RA: number, RA_VAL: number, RB: number, RB_VAL: number }[] = [
//     { RA: 3, RA_VAL: 10, RB: 2, RB_VAL: 100 }, //STORE 100 into RAM address 10
//     // { RA: 3, RA_VAL: 10, RB: 2, RB_VAL: 100}, //LOAD RAM address 10 into RB
//     // { RA: 0, RA_VAL: 101, RB: 1, RB_VAL: 111 },
//     // { RA: 0, RA_VAL: 101, RB: 1, RB_VAL: 111 },
//     // { RA: 2, RA_VAL: 11, RB: 3, RB_VAL: 166 },
//     // { RA: 3, RA_VAL: 11, RB: 1, RB_VAL: 166 },
//     // { RA: 0, RA_VAL: 171, RB: 1, RB_VAL: 131 },
//     // { RA: 2, RA_VAL: 171, RB: 3, RB_VAL: 131 },
//     // { RA: 3, RA_VAL: 55,  RB: 0, RB_VAL: 77 },
//     // { RA: 3, RA_VAL: 99,  RB: 2, RB_VAL: 88 },

// ]


// for (let i = 0; i < tests.length; i++) { 
//     console.log('ir ', computer.ir.getData()[3])
//     if(i %){

//             computer.registers[test.RA].setInputsFromNonBus(numberToByte(test.RA_VAL)); //address where to store    REG A
//             computer.registers[test.RB].setInputsFromNonBus(numberToByte(test.RB_VAL)); //value to store            REG B
//             computer.run(1)

//             // expect(byteToNumber(computer.ram.getRamCellManually(test.RA_VAL).register.getData())).toEqual(test.RB_VAL);


//     } else {

//             computer.registers[test.RA].setInputsFromNonBus(numberToByte(test.RA_VAL)); //address from where to load    REG A
//             computer.run(1)
//              //BEcause we insert LOAD instruction and a value, we have to do 2 fetch execute cycles instead of 1

//             // console.log(computer.ram.getRamCellManually(test.RA_VAL).register.getData(), computer.registers[test.RB].getData())
//             // expect(computer.ram.getRamCellManually(test.RA_VAL).register.getData()).toEqual( computer.registers[test.RB].getData());


//     }




// }
// console.log(computer.ram.ramList())



// const computer = new Computer();
// const program = computer.assembler(
    
//     "DATA R3, 115;"
//     +"DATA R1, 116;"
//     +"XOR R3, R1;"

//     // +"JMP 210, R0;"
//     // ""
// )
// console.log(program)
// computer.insertProgramIntoRAM(0, program);
// computer.run(3);
// console.log(computer.registers[1].getData());
// console.log(computer.iar.getData())
// console.log(computer.ram.getMarOutput())
// computer.insertProgramIntoRAM(0, [
//     [0, 0, 0, 1, 1, 1, 1, 0], //STORE
//     [0, 0, 0, 0, 1, 1, 1, 0], //LOAD

//     [0, 0, 0, 1, 0, 0, 0, 1],
//     [0, 0, 0, 0, 0, 0, 0, 1],

//     [0, 0, 0, 1, 1, 0, 1, 1],
//     [0, 0, 0, 0, 1, 1, 0, 1],

//     [0, 0, 0, 1, 0, 0, 0, 1],
//     [0, 0, 0, 0, 1, 0, 1, 1],

//     [0, 0, 0, 1, 1, 1, 0, 0],
//     [0, 0, 0, 0, 0, 1, 0, 1],

//     [0, 0, 0, 1, 1, 1, 0, 0],
//     [0, 0, 0, 0, 0, 1, 0, 1],

//     [0, 0, 0, 1, 1, 1, 1, 0],
//     [0, 0, 0, 0, 1, 1, 1, 0],
// ]);

// const tests: { RA: number, RA_VAL: number, RB: number, RB_VAL: number }[] = [
//     { RA: 3, RA_VAL: 110, RB: 2, RB_VAL: 100 }, //STORE 100 into RAM address 10
//     { RA: 3, RA_VAL: 110, RB: 2, RB_VAL: 100 }, //LOAD RAM address 10 into RB

//     { RA: 0, RA_VAL: 101, RB: 1, RB_VAL: 111 },
//     { RA: 0, RA_VAL: 101, RB: 1, RB_VAL: 111 },

//     { RA: 2, RA_VAL: 111, RB: 3, RB_VAL: 166 },
//     { RA: 3, RA_VAL: 111, RB: 1, RB_VAL: 166 },

//     { RA: 0, RA_VAL: 171, RB: 1, RB_VAL: 131 },
//     { RA: 2, RA_VAL: 171, RB: 3, RB_VAL: 131 },

//     { RA: 3, RA_VAL: 55, RB: 0, RB_VAL: 77 },
//     { RA: 1, RA_VAL: 55, RB: 1, RB_VAL: 77 },

//     { RA: 3, RA_VAL: 55, RB: 0, RB_VAL: 77 },
//     { RA: 1, RA_VAL: 55, RB: 1, RB_VAL: 77 },

//     { RA: 3, RA_VAL: 99, RB: 2, RB_VAL: 88 },
//     { RA: 3, RA_VAL: 99, RB: 2, RB_VAL: 88 },

// ]

// for (let i = 0; i <= tests.length - 1; i++) {
//     if (i % 2 === 0) {

//         computer.registers[tests[i].RA].setInputsFromNonBus(numberToByte(tests[i].RA_VAL)); //address where to store    REG A
//         computer.registers[tests[i].RB].setInputsFromNonBus(numberToByte(tests[i].RB_VAL)); //value to store            REG B
//         computer.run(1)
        

//         // console.log("STORE:", {
//         //     address: tests[i].RA_VAL,
//         //     expected: tests[i].RB_VAL,
//         //     actual: byteToNumber(computer.ram.getRamCellManually(tests[i].RA_VAL).register.getData())
//         // });


//     } else {

//         computer.registers[tests[i].RA].setInputsFromNonBus(numberToByte(tests[i].RA_VAL)); //address from where to load    REG A
//         // console.log(">>> PRE RUN");
//         // console.log("RA reg (addr):", byteToNumber(computer.registers[tests[i].RA].getData()));
//         // console.log("RB reg (LOAD target):", byteToNumber(computer.registers[tests[i].RB].getData()));
//         // console.log("RAM[RA_VAL]:", byteToNumber(computer.ram.getRamCellManually(tests[i].RA_VAL).register.getData()));

//         computer.run(1);

//         // console.log(">>> POSLE RUN");
//         // console.log("RB reg (LOAD target):", byteToNumber(computer.registers[tests[i].RB].getData()));



//         // expect(byteToNumber(computer.acc.getData())).toEqual(110)
//         // console.log("LOAD:", {
//         //     address: tests[i].RA_VAL,
//         //     expected: tests[i].RB_VAL,
//         //     actual: byteToNumber(computer.registers[tests[i].RB].getData())
//         // });



//     }
// }

// computer.ram.ramList();
// console.log(computer.ram)

const computer = new Computer();

computer.insertProgramIntoRAM(111,
    computer.assembler(

        "DATA R1, 51;"
        +"DATA R0, 51;"
        +"XOR R1, R0;"
        +"JCAEZ, 0;"
    )
);
computer.insertProgramIntoRAM(0,
    computer.assembler(
        "DATA R0, 152;"
        +"DATA R1, 51;"
        +"ADD R0, R1;"
        +"ADD R0, R1;"
        +"JC, 111;"
        // +"DATA R2, 16;"

 
    )
);





// setInterval(() => computer.run(1), 1);
computer.run(27)
console.log(byteToNumber(computer.iar.getData()))