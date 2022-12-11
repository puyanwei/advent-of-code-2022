import { translateInstructions } from '../day05-supply-stacks'

describe(`translateInstructions()`, () => {
  it(`extracts 3 numbers from the instructions string`, () => {
    const result1 = translateInstructions(`move 5 from 3 to 4`)
    expect(result1).toEqual({
      cratesToMove: 5,
      from: 3,
      target: 4,
    })
    const result2 = translateInstructions(`move 13 from 4 to 8`)
    expect(result2).toEqual({
      cratesToMove: 13,
      from: 4,
      target: 8,
    })
    const result3 = translateInstructions(`move 4 from 7 to 4`)
    expect(result3).toEqual({
      cratesToMove: 4,
      from: 7,
      target: 4,
    })
  })
})
