import { resolveHeadPosition, resolveMove } from "../day09-p1-rope-bridge"

describe(`resolveMoveInstructions()`, () {
  it(`translates the data into tuples of x/y coordinates`,() => {
    const data = `R 4 
U 4
L 3
D 1
R 4
D 1
L 5
R 2`
const result = [[0,1], [0,1], [0,1], [0,1],[-1,0],[-1,0],[-1,0],[0,-1],[1,0], [1,0],[1,0],[1,0],[0,-1],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[1,0],[1,0]]
  })
})

// describe.only(`resolveMove()`, () => {
//   it(`returns an object containing move data`, () => {
//     const result = {
//       name: `R 1`,
//       prevPosition: {
//         head: [0, 0],
//         tail: [0, 0],
//       },
//       currentPosition: {
//         head: [1, 0],
//         tail: [0, 0],
//       },
//     }

//     expect(resolveMove(`R 1`, [0, 0])).toEqual(result)
//   })
// })

describe(`resolvePosition()`, () => {
  it(`returns a tuple containing the move data`, () => {
    expect(resolveHeadPosition(`L 1`, [0, 0])).toEqual([-1, 0])
    expect(resolveHeadPosition(`R 1`, [0, 0])).toEqual([1, 0])
    expect(resolveHeadPosition(`U 1`, [0, 0])).toEqual([0, 1])
    expect(resolveHeadPosition(`D 1`, [0, 0])).toEqual([0, -1])
    expect(resolveHeadPosition(`L 6`, [2, 7])).toEqual([-4, 7])
    expect(resolveHeadPosition(`U 8`, [4, 4])).toEqual([4, 12])
    expect(resolveHeadPosition(`R 33`, [-12, 6])).toEqual([21, 6])
    expect(resolveHeadPosition(`D 12`, [-3, 8])).toEqual([-3, -4])
  })
  it(`throws an error if the first split string is not a direction`, () => {
    try {
      resolveHeadPosition(`X 1`, [0, 0])
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error).toHaveProperty("message", "Split word does not contain direction command")
    }
  })
})
