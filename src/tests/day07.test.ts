import { commands } from '../consts'
import { daySevenPartOne } from '../day07-no-space-left'

describe(`getFileSizes()`, () => {
  it(`adds up the size of the files that are under 100k`, () => {
    expect(daySevenPartOne(commands)).toEqual(94853)
  })
})
