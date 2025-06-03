
import { describe, it, expect } from 'vitest'
import { BitMemory } from '../CPU8/memory/bit-memory'


describe('BitMemory', () => {
    it('should save the data correctly', () => {
        const bitmem = new BitMemory();

        //BitMemoryGate prima 2 inputa tipa bit(0 || 1)
        // set
        // value
        // kada je set 1, onda treba da sacuva vrednost koja je prosledjena u drugom parametru.

        bitmem.setInputs(0,0);
        expect(bitmem.getOutput()).toEqual(0)

        bitmem.setInputs(1,0);
        expect(bitmem.getOutput()).toEqual(0)

        bitmem.setInputs(1,1);
        expect(bitmem.getOutput()).toEqual(1)

        bitmem.setInputs(0,1);
        expect(bitmem.getOutput()).toEqual(1)

        bitmem.setInputs(1,0);
        expect(bitmem.getOutput()).toEqual(0)

        bitmem.setInputs(1,1);
        expect(bitmem.getOutput()).toEqual(1)

        bitmem.setInputs(1,1);
        expect(bitmem.getOutput()).toEqual(1)

        bitmem.setInputs(0,1);
        expect(bitmem.getOutput()).toEqual(1)

        bitmem.setInputs(0,1);
        expect(bitmem.getOutput()).toEqual(1)

    })
  })