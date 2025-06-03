
import { describe, it, expect } from 'vitest'
import { Bus } from '../CPU8/bus/bus'
import { ByteMemory } from '../CPU8/memory/byte-memory'
import type { Bit, Byte } from '../interface/interfaces'


describe('ByteMemory', () => {
    it('should save and restore data correctly', () => {
      const bus = new Bus()
      bus.setInputs([1,1,1,0,0,0,0,0])
  
      const byteMemory = new ByteMemory(bus)

      bus.setInputs([1,1,1,0,0,0,0,0])
      const testCases = [
        {
          busValue: [1,1,1,0,0,0,0,0],
          s: 0,
          expected: [0,0,0,0,0,0,0,0],
          desc: 'Initial state, load=0, should remain 0',
        },
        {
          s: 1,
          expected: [1,1,1,0,0,0,0,0],
          desc: 'Load=1, should save bus value',
        },
        {
          busValue: [1,1,1,1,1,1,1,1],
          s: 0,
          expected: [1,1,1,0,0,0,0,0],
          desc: 'Bus changed, load=0, should retain old value',
        },
        {
          s: 1,
          expected: [1,1,1,1,1,1,1,1],
          desc: 'Load=1, should update to new bus value',
        }
      ];
  
      for (const tc of testCases) {
        if (tc.busValue) {
          bus.setInputs(tc.busValue as Byte);
        }
        byteMemory.setInputs(tc.s as Bit);
        expect(byteMemory.getData()).toEqual(tc.expected); 
      }
    })
  })