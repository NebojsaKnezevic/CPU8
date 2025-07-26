-Had to change comparator logic chips and use some other. 
-Maybe i will have to change opcode logic in ALU, so that 0,0,1 is the first operation(Adder)
-it would be good to add separate inner busses for components such as RAM ALU and CPU. 


# 8-bit CPU Simulation

This is a project for simulating an 8-bit CPU using TypeScript. It will have a user `interface`, a `full CPU8 hardware` simulation, and an `assembler`.

I started this project because I have passion for technology and computers. I am still student and at best medior developer given my years of expirience, so this project helps me to learn as well. It is also my way to show my knowledge about computers and my software engineering skills.

This software is designed as an educational tool intended to teach CS fundamentals to future generations in an intuitive and visual way. It will be free, as I believe that education should be free. Since I myself have benefited greatly from free content made by those before me, this is my way of giving back to the world and honoring all who came before me.

Some design choices maybe look strange from software engineer point of view. But please note, I started this project from hardware engineer point of view. `This is full and true simulation of the CPU and how its innner components work and connect`. `If you follow this design, you can build this whole machine in hardware, given ofcourse that I succed in my endevour and actually build a working CPU`. For example, I started with basic logic gates, and every main part like ALU is built from these small logic parts, like in real life, where they have thousands of them. Also, I use web workers to run inside parts to simulate how CPU works in reality, and other things like that.
> 🛠️ *You can literally build whole CPU using only Nand or Nor gates. I choosed Nand gates as per `How Do It Know?` 📖*

Later, I plan to expand this and build a CPU16 with a simple OOP language and operating system and much more, as a continuation of my effort and quest for knowledge. But that will come later...

> 💡 *Some say that education is expensive... This may be true, but in my opinion and expirience, ignorence is much more expensive.*

## Acknowledgments

This project is inspired by the amazing book *"But How Do It Know?"* by **J. Clark Scott**.  
The book helped me understand how computers really work on a hardware level and gave me the idea for how to build and structure my own CPU simulation.

I also want to thank **Professor Ross McGowan** from [appliedmathematics.co.uk](https://www.appliedmathematics.co.uk),  
whose courses helped me deepen my understanding of computer architecture and digital logic.

<!-- Also, special thanks to Anthony Aliciea from Dont Immitate, understand, whose course on JS was fundamental in enabling me to write this  -->

Finally, I also want to thank all the people who share free educational content online.  
Without that, I would never come this far.  
This project is my way to give back and say thank you.





> 🔧 This structure may evolve as development progresses.
## 🧩 Full CPU8 Architecture (Based on *How Do It Know?*)

To build a fully working 8-bit CPU, the following components are required:

- `Logic Gates` – AND, OR, NOT, XOR gates as building blocks
- `BitMemory` – a single-bit memory cell
- `ByteMemory` – 8-bit memory composed of 8 BitMemory units
- `Bus` – shared 8-bit data path for transferring information
- `EnableGate` – controls whether a byte places its data on the bus
- `Register` – stores a byte of data with load and enable capability
- `RAM` – addressable memory made of many registers
- `ROM` – read-only memory for storing program instructions
- `Instruction Register (IR)` – holds the current instruction
- `Program Counter (PC)` – keeps track of the address of the next instruction
- `ALU (Arithmetic Logic Unit)` – performs math and logic operations (ADD, SUB, AND, OR...)
- `Flags Register` – stores result flags (Zero, Carry, Negative, etc.)
- `Clock` – provides timed pulses for synchronization
- `Control Unit` – sends control signals based on current instruction and clock cycle
- `Instruction Decoder` – decodes instruction bits into control signals
- `Microcode` – for microcoded control unit implementations
- `CPU` – the central processor that ties everything together


---
> 🔧 This structure may evolve as development progresses.
## 🗂️ Project Structure

| Folder         | File(s)                       | Description                      |
|----------------|-------------------------------|----------------------------------|
| `/tests`       | `test...`                     | Vitest test files                |
| `/constants`   | `config.ts`                   | Constants like word width        |
| `/bus`         | `bus.ts`                      | Main data bus logic              |
| `/logic`       | `logic-gates.ts`              | Basic logic gate implementations |
| `/alu`         | `alu.ts`                      | Arithmetic Logic Unit logic      |
| `/memory`      | `bit-memory.ts`<br>`byte-memory.ts`<br>`register.ts`<br>`ram.ts` | Memory-related components        |
| `/workers`     | `clockWorker.ts`<br>`controlUnitWorker.ts`<br>`aluWorker.ts`<br>`ramWorker.ts`<br>`busWorker.ts` | Multi-threading / simulation workers |
| *(root)*       | `controlUnit.ts`<br>`clock.ts`<br>`cpu.ts` | Core CPU control and orchestration |




| Opcode                 | Operands     | Mnemonic     | Description                                                                 |
|------------------------|--------------|--------------|-----------------------------------------------------------------------------|
| 1000 rarb              | RA, RB       | ADD RA,RB    | Adds RA and RB, stores result in RA; updates Carry and Zero flags           |
| 1001 rarb              | RA, RB       | SHR RA,RB    | Shifts RA right by the number of bits in RB                                 |
| 1010 rarb              | RA, RB       | SHL RA,RB    | Shifts RA left by the number of bits in RB                                  |
| 1011 rarb              | RA, RB       | NOT RA,RB    | Inverts (bitwise NOT) the bits in RA                                        |
| 1100 rarb              | RA, RB       | AND RA,RB    | Bitwise AND between RA and RB, result goes to RA                            |
| 1101 rarb              | RA, RB       | OR RA,RB     | Bitwise OR between RA and RB, result goes to RA                             |
| 1110 rarb              | RA, RB       | XOR RA,RB    | Bitwise XOR between RA and RB, result goes to RA                            |
| 1111 rarb              | RA, RB       | CMP RA,RB    | Compares RA and RB, sets CAEZ flags: Carry, Above, Equal, Zero              |
| 0000 rarb              | RA, RB       | LD RA,RB     | Loads value from memory address in RB into RA                               |
| 0001 rarb              | RA, RB       | ST RA,RB     | Stores RA into memory at the address held in RB                             |
| 0010 00rb xxxxxxxx     | RB, Data     | DATA RB,Data | Loads 8-bit immediate value into RB                                         |
| 0011 00rb              | RB           | JMPR RB      | Jumps to the address contained in RB                                        |
| 0100 0000 xxxxxxxx     | Addr         | JMP Addr     | Jumps to absolute memory address                                            |
| 0101 0110 Caez xxxxxxxx| Flags, Addr  | JCAEZ        | Jumps to address if one of CAEZ flags is set                                |
| 0000 (after JCAEZ)     | —            | CLF          | Clears (resets) all flags                                                   |





