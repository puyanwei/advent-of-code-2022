import { programThree } from "../consts"
import { dayTenPartTwo } from "../day10-p2-cathode-ray-tube"

describe(`integration test`, () => {
  it(`returns a string of hashes and dots`, () => {
    const result = `\n##..##..##..##..##..##..##..##..##..##..\n###...###...###...###...###...###...###.\n####....####....####....####....####....\n#####.....#####.....#####.....#####.....\n######......######......######......####\n#######.......#######.......#######.....`
    expect(dayTenPartTwo(programThree)).toEqual(result)
  })
})
