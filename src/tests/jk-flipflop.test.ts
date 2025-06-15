



import { describe, it, expect } from "vitest";
import { JKFF } from "../CPU8/memory/jk-flipflop";


describe("JK Master-Slave Flip-Flop - All States", () => {
    it("should SET when J=1, K=0 on falling edge", () => {
      const jk = new JKFF();
  
      jk.setInputs(0, 0, 0); // Initial clock low
      jk.setInputs(1, 0, 1); // Rising edge: master Q = 1
      jk.setInputs(1, 0, 0); // Falling edge: slave Q = 1
  
      const [q, nq] = jk.getOutput();
      expect(q).toBe(1);
      expect(nq).toBe(0);
    });
  
    it("should RESET when J=0, K=1 on falling edge", () => {
      const jk = new JKFF();
  
      jk.setInputs(0, 0, 0); // Initial clock low
      jk.setInputs(1, 0, 1); // Set first
      jk.setInputs(1, 0, 0); // Transfer to slave
      let [q1] = jk.getOutput();
      expect(q1).toBe(1);
  
      jk.setInputs(0, 1, 1); // Rising edge: master Q = 0
      jk.setInputs(0, 1, 0); // Falling edge: slave Q = 0
  
      let [q2, nq2] = jk.getOutput();
      expect(q2).toBe(0);
      expect(nq2).toBe(1);
    });
  
    it("should HOLD when J=0, K=0", () => {
      const jk = new JKFF();
  
      jk.setInputs(0, 0, 0); // Initial
      jk.setInputs(1, 0, 1); // Rising
      jk.setInputs(1, 0, 0); // Falling
      let [q1] = jk.getOutput();
      expect(q1).toBe(1);
  
      // Apply hold
      jk.setInputs(0, 0, 1); // Rising edge: master does nothing
      jk.setInputs(0, 0, 0); // Falling edge: slave should still be 1
      let [q2, nq2] = jk.getOutput();
      expect(q2).toBe(1);
      expect(nq2).toBe(0);
    });
  
    it("should TOGGLE when J=1, K=1 on each falling edge", () => {
      const jk = new JKFF();
  
      jk.setInputs(0, 0, 0); // Init
      jk.setInputs(1, 0, 1); // Rising
      jk.setInputs(1, 0, 0); // Falling
      let [q0] = jk.getOutput();
      expect(q0).toBe(1);
  
      jk.setInputs(1, 1, 1); // Rising: master toggles to 0
      jk.setInputs(1, 1, 0); // Falling: slave becomes 0
      let [q1] = jk.getOutput();
      expect(q1).toBe(0);
  
      jk.setInputs(1, 1, 1); // Rising: master toggles to 1
      jk.setInputs(1, 1, 0); // Falling: slave becomes 1
      let [q2] = jk.getOutput();
      expect(q2).toBe(1);
  
      jk.setInputs(1, 1, 1); // Rising: master toggles to 0
      jk.setInputs(1, 1, 0); // Falling: slave becomes 0
      let [q3, nq3] = jk.getOutput();
      expect(q3).toBe(0);
      expect(nq3).toBe(1);
    });
  });