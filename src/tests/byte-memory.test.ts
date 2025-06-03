
import { describe, it, expect } from 'vitest'
import { Bus } from '../CPU8/bus/bus'
import { ByteMemory } from '../CPU8/memory/byte-memory'


describe('ByteMemory', () => {
    it('should save and restore data correctly', () => {
      const bus = new Bus()
      bus.setInputs([1,1,1,0,0,0,0,0])
  
      const byteMemory = new ByteMemory(bus)
  
      byteMemory.setInputs(0) // ne upisuje
      expect(byteMemory.getData()).toEqual([0,0,0,0,0,0,0,0])
  
      byteMemory.setInputs(1) // upisuje
      expect(byteMemory.getData()).toEqual([1,1,1,0,0,0,0,0])
  
      bus.setInputs([1,1,1,1,1,1,1,1]) // BUS PROMENA VREDNOSTI
      
      byteMemory.setInputs(0) // ne upisuje
      expect(byteMemory.getData()).toEqual([1,1,1,0,0,0,0,0]) // stara vrednost ostaje
  
      byteMemory.setInputs(1) // upisuje
      expect(byteMemory.getData()).toEqual([1,1,1,1,1,1,1,1])
  
      bus.setInputs([1,1,1,0,0,0,0,0])
      byteMemory.getDataOnBus(1)
      expect(bus.getOutput()).toEqual([1,1,1,1,1,1,1,1]) // poslednja zapamćena vrednost ide na bus
    })
  })