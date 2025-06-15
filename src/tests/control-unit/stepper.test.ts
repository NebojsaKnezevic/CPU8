import { describe, it, expect } from "vitest";
import { Stepper } from "../../CPU8/logic/control-unit/stepper";

describe("Stepper", () => {
    const stepper = new Stepper();
    it("should cycle through output bits and reset", () => {
       
        const expectedSteps = [
            [1, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0], // Reset 
            [0, 1, 0, 0, 0, 0], // Continue
            [0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0], // Reset 
            [0, 1, 0, 0, 0, 0], // Continue
            [0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0], // Reset 
            [0, 1, 0, 0, 0, 0], // Continue
            [0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0], // Reset 
            [0, 1, 0, 0, 0, 0], // Continue
            [0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 1],
        ];
        //in    0101 0101 
        //clk   0110 0110
        //clke  1110 1110
        //clks  0100 0100
        for (const expected of expectedSteps) {
            stepper.setInputs(0);
            stepper.setInputs(1);
            expect(stepper.getOutput()).toEqual(expected);
          
        }
    });
});
