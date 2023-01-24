import { programTwo, programOne, programThree, duplicateCycleData } from "../consts"
import { cycleResult } from "../consts/mocks"
import {
  dayTenPartOne,
  resolveAddX,
  resolveCycleData,
  resolveXFromCycle,
} from "../day10-p1-cathode-ray-tube"
import { dayTenPartTwo } from "../day10-p2-cathode-ray-tube"

describe(`integration test`, () => {
  it(`returns a string of hashes and dots`, () => {
    // prettier-ignore
    const result =
    `##..##..##..##..##..##..##..##..##..##..
    ###...###...###...###...###...###...###.
    ####....####....####....####....####....
    #####.....#####.....#####.....#####.....
    ######......######......######......####
    #######.......#######.......#######.....`
    console.log(result)
    expect(dayTenPartTwo(programThree)).toEqual(result)
  })
})
