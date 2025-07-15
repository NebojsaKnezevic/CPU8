import { AndGate, AndGateM, NotGate, OrGate, OrGateM } from "../logic-gates";
import { Not8 } from "../not8";



export class ControlLogicCore {
    // ORM gates
    public bus1_OrmE: OrGateM;
    public iar_OrmE: OrGateM;
    public iar_OrmS: OrGateM;
    public mar_OrmGate: OrGateM;
    public acc_OrmGateE: OrGateM;
    public acc_OrmGateS: OrGateM;
    public ram_OrmGateE: OrGateM;
    public ir_OrmGate: OrGateM;
    public rA_OrmgatE: OrGateM;
    public rB_OrmgatE: OrGateM;
    public rB_OrmgatS: OrGateM;
    public ram_OrmGateS: OrGateM;
    

    // AND gates
    public iar_andGateE: AndGate;
    public iar_andGateS: AndGate;
    public mar_andGateS: AndGate;
    public acc_andGateE: AndGate;
    public acc_andGateS: AndGate;
    public ram_andGateE: AndGate;
    public ram_andGateS: AndGate;
    public ir_andGateS: AndGate;
    public tmp_andGateE: AndGate;
    public tmp_andGateS: AndGate;
    public inner_decoder3x8_and0: AndGate;
    public inner_decoder3x8_and1: AndGate;
    public inner_decoder3x8_and2: AndGate;
    public inner_decoder3x8_and3: AndGate;
    public data_instruction_and0: AndGate;
    public data_instruction_and1: AndGate;
    public data_instruction_and2: AndGate;

    //OR gates
    public inner_decoder3x8_or: OrGate;

    //REGISTER And gates
    public regA_enable_r0_andM: AndGateM;
    public regA_enable_r1_andM: AndGateM;
    public regA_enable_r2_andM: AndGateM;
    public regA_enable_r3_andM: AndGateM;

    public regB_enable_r0_andM: AndGateM;
    public regB_enable_r1_andM: AndGateM;
    public regB_enable_r2_andM: AndGateM;
    public regB_enable_r3_andM: AndGateM;

    public regB_set_r0_andM: AndGateM;
    public regB_set_r1_andM: AndGateM;
    public regB_set_r2_andM: AndGateM;
    public regB_set_r3_andM: AndGateM;

    //OP CODE 

    public alu_0_andM: AndGateM;
    public alu_1_andM: AndGateM;
    public alu_2_andM: AndGateM;

    //ALU instruction
    public aluInstruction_step4_andGate: AndGate;
    public aluInstruction_step5_andGate: AndGate;
    public aluInstruction_step6_andGateM: AndGateM;
    public aluInstruction_step6_andGateM_opCode: AndGateM;
    public aluInstruction_step6_not: NotGate;




    constructor() {
        // ORM  gates
        this.bus1_OrmE = new OrGateM();
        this.iar_OrmE = new OrGateM();
        this.iar_OrmS = new OrGateM();
        this.mar_OrmGate = new OrGateM();
        this.acc_OrmGateE = new OrGateM();
        this.acc_OrmGateS = new OrGateM();
        this.ram_OrmGateE = new OrGateM();
        this.ram_OrmGateS = new OrGateM();
        this.ir_OrmGate = new OrGateM();
        this.rA_OrmgatE = new OrGateM();
        this.rB_OrmgatE = new OrGateM();
        this.rB_OrmgatS = new OrGateM();


        // AND gates
        this.iar_andGateE = new AndGate();
        this.iar_andGateS = new AndGate();
        this.mar_andGateS = new AndGate();
        this.acc_andGateE = new AndGate();
        this.acc_andGateS = new AndGate();
        this.ram_andGateE = new AndGate();
        this.ram_andGateS = new AndGate();
        this.ir_andGateS = new AndGate();
        this.tmp_andGateE = new AndGate();
        this.tmp_andGateS = new AndGate();
        this.inner_decoder3x8_and0 = new AndGate();
        this.inner_decoder3x8_and1 = new AndGate();
        this.inner_decoder3x8_and2 = new AndGate();
        this.inner_decoder3x8_and3 = new AndGate();
        this.data_instruction_and0 = new AndGate();
        this.data_instruction_and1 = new AndGate();
        this.data_instruction_and2 = new AndGate();
        
    
        //OR gates
        this.inner_decoder3x8_or = new OrGate();


        this.regA_enable_r0_andM = new AndGateM();
        this.regA_enable_r1_andM = new AndGateM();
        this.regA_enable_r2_andM = new AndGateM();
        this.regA_enable_r3_andM = new AndGateM();

        this.regB_enable_r0_andM = new AndGateM();
        this.regB_enable_r1_andM = new AndGateM();
        this.regB_enable_r2_andM = new AndGateM();
        this.regB_enable_r3_andM = new AndGateM();

        this.regB_set_r0_andM = new AndGateM();
        this.regB_set_r1_andM = new AndGateM();
        this.regB_set_r2_andM = new AndGateM();
        this.regB_set_r3_andM = new AndGateM();

        this.alu_0_andM = new AndGateM();
        this.alu_1_andM = new AndGateM();
        this.alu_2_andM = new AndGateM();

        this.aluInstruction_step4_andGate = new AndGate();
        this.aluInstruction_step5_andGate = new AndGate();
        this.aluInstruction_step6_andGateM = new AndGateM();
        this.aluInstruction_step6_andGateM_opCode = new AndGateM();
        this.aluInstruction_step6_not = new NotGate();

    }
}
