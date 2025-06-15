import { describe, it , expect } from "vitest";
import { Counter2 } from "../../CPU8/logic/control-unit/counter2";



describe("Coutner", () => {
    const counter = new Counter2();
    it("It should count xD", () => {

        expect(counter.getOutput()).toEqual([0,0,0,0,0,0])
       
        counter.setInputs(1)
        counter.setInputs(0)
        expect(counter.getOutput()).toEqual([1,0,0,0,0,0])

        counter.setInputs(1)
        counter.setInputs(0)
        expect(counter.getOutput()).toEqual([1,1,0,0,0,0])

        counter.setInputs(1)
        counter.setInputs(0)
        expect(counter.getOutput()).toEqual([1,1,1,0,0,0])

        counter.setInputs(1)
        counter.setInputs(0)
        expect(counter.getOutput()).toEqual([1,1,1,1,0,0])

        counter.setInputs(1)
        counter.setInputs(0)
        expect(counter.getOutput()).toEqual([1,1,1,1,1,0])

        counter.setInputs(1)
        counter.setInputs(0)
        expect(counter.getOutput()).toEqual([0,0,0,0,0,0])







        //round 2

        expect(counter.getOutput()).toEqual([0,0,0,0,0,0])
       
        counter.setInputs(1)
        counter.setInputs(0)
        expect(counter.getOutput()).toEqual([1,0,0,0,0,0])

        counter.setInputs(1)
        counter.setInputs(0)
        expect(counter.getOutput()).toEqual([1,1,0,0,0,0])

        counter.setInputs(1)
        counter.setInputs(0)
        expect(counter.getOutput()).toEqual([1,1,1,0,0,0])

        counter.setInputs(1)
        counter.setInputs(0)
        expect(counter.getOutput()).toEqual([1,1,1,1,0,0])

        counter.setInputs(1)
        counter.setInputs(0)
        expect(counter.getOutput()).toEqual([1,1,1,1,1,0])

        counter.setInputs(1)
        counter.setInputs(0)
        expect(counter.getOutput()).toEqual([0,0,0,0,0,0])

    })
});