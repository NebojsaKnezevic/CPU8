import { describe, it , expect } from "vitest";
import { Counter } from "../../CPU8/logic/control-unit/counter";



describe("Coutner", () => {
    const counter = new Counter();
    it("It should count xD", () => {

        expect(counter.getOutput()).toEqual([0,0,0,0,0,0])

        counter.setInputs(0)
        counter.setInputs(1)
        expect(counter.getOutput()).toEqual([1,0,0,0,0,0])


        counter.setInputs(0)
        expect(counter.getOutput()).toEqual([1,0,0,0,0,0])
        counter.setInputs(1)
        expect(counter.getOutput()).toEqual([1,1,0,0,0,0])

        counter.setInputs(0)
        expect(counter.getOutput()).toEqual([1,1,0,0,0,0])
        counter.setInputs(1)
        expect(counter.getOutput()).toEqual([1,1,1,0,0,0])

        counter.setInputs(0)
        expect(counter.getOutput()).toEqual([1,1,1,0,0,0])
        counter.setInputs(1)
        expect(counter.getOutput()).toEqual([1,1,1,1,0,0])

        counter.setInputs(0)
        expect(counter.getOutput()).toEqual([1,1,1,1,0,0])
        counter.setInputs(1)
        expect(counter.getOutput()).toEqual([1,1,1,1,1,0])

        counter.setInputs(1)
        expect(counter.getOutput()).toEqual([1,1,1,1,1,0]) // here at the end is different, check implementation or schema.
        
        counter.setInputs(0)
        counter.setInputs(1)
        expect(counter.getOutput()).toEqual([1,1,1,1,1,1])
    })
});