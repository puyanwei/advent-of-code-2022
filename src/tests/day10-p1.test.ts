import { programTwo, programOne, programThree, duplicateCycleData } from "../consts"
import { cycleResult } from "../consts/mocks"
import {
  dayTenPartOne,
  resolveAddX,
  resolveCycleData,
  resolveXFromCycle,
} from "../day10-p1-cathode-ray-tube"

describe(`resolveCycleData()`, () => {
  describe(`takes in a string of commands and returns an array of cycle objects`, () => {
    it(`initial example`, () => {
      const result = [
        { cycle: 1, command: "noop", x: 1 },
        { cycle: 2, command: "addx 3", x: 1 },
        { cycle: 3, command: "[pending]", x: 1 },
        { cycle: 4, command: "addx -5", x: 4 },
        { cycle: 5, command: "[pending]", x: 4 },
      ]

      expect(resolveCycleData(programOne)).toEqual(result)
    })
    it(`throws an error if the command is not 'addx' or 'noop' `, () => {
      try {
        resolveCycleData(`start20`)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error).toHaveProperty("message", "Command not recognized")
      }
    })

    it(`second dataset`, () => {
      expect(resolveCycleData(programTwo)).toEqual(cycleResult)
    })
  })
  describe(`resolveXFromCycle()`, () => {
    it(`check values of x using the medium example dataset`, () => {
      const data = resolveCycleData(programThree)
      expect(resolveXFromCycle(data, 20)).toEqual(21)
      expect(resolveXFromCycle(data, 60)).toEqual(19)
      expect(resolveXFromCycle(data, 100)).toEqual(18)
      expect(resolveXFromCycle(data, 140)).toEqual(21)
      expect(resolveXFromCycle(data, 180)).toEqual(16)
      expect(resolveXFromCycle(data, 220)).toEqual(18)
    })
    it(`throws an error if no cycle number is found`, () => {
      const data2 = resolveCycleData(programThree)
      try {
        resolveXFromCycle(data2, -62)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error).toHaveProperty("message", "Cycle number does not exist")
      }
    })
    it(`throws an error if multiple cycle numbers are found`, () => {
      try {
        resolveXFromCycle(duplicateCycleData, -62)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error).toHaveProperty("message", "Cycle number does not exist")
      }
    })
  })
})

describe(`resolveAddX()`, () => {
  it(`throws an error if there is no number`, () => {
    try {
      resolveAddX({ command: `addx`, cycle: 2, x: 2 })
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error).toHaveProperty("message", "No addX number found")
    }
  })
})

describe(`integration test`, () => {
  it(`returns the sum of the six signal strengths`, () => {
    expect(dayTenPartOne(programThree)).toEqual(13140)
  })
})
