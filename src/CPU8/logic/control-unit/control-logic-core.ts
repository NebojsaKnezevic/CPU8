import { AndGate, AndGateM, NotGate, OrGateM } from "../logic-gates";
import { Not8 } from "../not8";



export class ControlLogicCore {
    // ORM gates
    public bus1_OrmE: OrGateM;
    public iar_OrmE: OrGateM;
    public iar_OrmS: OrGateM;
    public mar_OrmGate: OrGateM;
    public acc_OrmGateE: OrGateM;
    public acc_OrmGateS: OrGateM;
    public ram_OrmGate: OrGateM;
    public ir_OrmGate: OrGateM;
    public ra_OrmgatE: OrGateM;
    public ra_OrmgatS: OrGateM;
  
    // AND gates
    public iar_andGateE: AndGate;
    public iar_andGateS: AndGate;
    public mar_andGateS: AndGate;
    public acc_andGateE: AndGate;
    public acc_andGateS: AndGate;
    public ram_andGateE: AndGate;
    public ir_andGateS: AndGate;
    public tmp_andGateE: AndGate;
    public tmp_andGateS: AndGate;

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
      this.ram_OrmGate = new OrGateM();
      this.ir_OrmGate = new OrGateM();
      this.ra_OrmgatE = new OrGateM();
      this.ra_OrmgatS = new OrGateM();
  
      // AND gates
      this.iar_andGateE = new AndGate();
      this.iar_andGateS = new AndGate();
      this.mar_andGateS = new AndGate();
      this.acc_andGateE = new AndGate();
      this.acc_andGateS = new AndGate();
      this.ram_andGateE = new AndGate();
      this.ir_andGateS = new AndGate();
      this.tmp_andGateE = new AndGate();
      this.tmp_andGateS = new AndGate();
      

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
  