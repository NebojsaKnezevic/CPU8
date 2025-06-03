import { describe, it, expect } from 'vitest'
import { Bus } from '../CPU8/bus/bus';
import { EnableGate } from '../CPU8/memory/enable-gate';
import type { Byte } from '../interface/interfaces';



describe("EnableGate", () => {
    it("Should pass the data on the bus once enable flag is lifted", () => {
        const bus: Bus = new Bus();
        const enableDate: EnableGate = new EnableGate(bus);


        let testBusData: Byte = [1,1,1,0,0,0,0,0];

        enableDate.getDataOnBus(testBusData, 0)
        expect(bus.getOutput()).not.toEqual(testBusData)

        enableDate.getDataOnBus(testBusData, 1)
        expect(bus.getOutput()).toEqual(testBusData)


        testBusData = [1,1,0,0,0,0,1,0];

        enableDate.getDataOnBus(testBusData, 0)
        expect(bus.getOutput()).not.toEqual(testBusData)

        enableDate.getDataOnBus(testBusData, 1)
        expect(bus.getOutput()).toEqual(testBusData)


        testBusData = [1,1,0,1,1,0,1,0];

        enableDate.getDataOnBus(testBusData, 0)
        expect(bus.getOutput()).not.toEqual(testBusData)

        enableDate.getDataOnBus(testBusData, 1)
        expect(bus.getOutput()).toEqual(testBusData)

    });
});