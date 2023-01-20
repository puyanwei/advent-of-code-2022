import { program, programSmall } from "../consts"
import { resolveCycleData } from "../day10-p1-cathode-ray-tube"

describe(`resolveCycleData`, () => {
  describe(`takes in a string of commands and returns an array of cycle objects`, () => {
    it.only(`initial example`, () => {
      const result = [
        { cycle: 1, command: "noop", x: 1 },
        { cycle: 2, command: "addx 3", x: 1 },
        { cycle: 3, command: "addx 3", x: 1 },
        { cycle: 4, command: "addx -5", x: 4 },
        { cycle: 5, command: "addx -5", x: 4 },
      ]

      expect(resolveCycleData(programSmall)).toEqual(result)
    })
    it(`medium example`, () => {
      const result = [
        {
          cycle: 1,
          command: "addx 15",
          x: 1,
        },
        {
          cycle: 2,
          command: "",
          x: 1,
        },
        {
          cycle: 3,
          command: "",
          x: 16,
        },
      ]
      expect(resolveCycleData(program)).toEqual(result)
    })
  })
})
