import { commands } from '../consts'
import { getFileSizes } from '../day07-no-space-left'

describe(`getFileSizes()`, () => {
  it.only(`adds up the size of the files that are under 100k`, () => {
    expect(getFileSizes(commands)).toEqual(95437)
  })
})
