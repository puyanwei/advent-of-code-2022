// import { resolveHeadPosition, resolveMove } from "../day09-p1-rope-bridge"

import { calculateNextMove, resolveData } from "../day09-p1-rope-bridge"

describe(`resolveData()`, () => {
  it(`translates the data into tuples of x/y coordinates`, () => {
    // prettier-ignore
    const data = 
    `R 4
    U 4
    L 3
    D 1
    R 4
    D 1
    L 5
    R 2`
    // prettier-ignore
    const result = [ 
      [1, 0], [1, 0], [1, 0], [1, 0], [0, 1], [0, 1], [0, 1], [0, 1], [-1, 0], [-1, 0], [-1, 0], [0, -1], [1, 0], [1, 0], [1, 0], [1, 0], [0, -1], [-1, 0], [-1, 0], [-1, 0], [-1, 0], [-1, 0], [1, 0], [1, 0],
    ]
    expect(resolveData(data)).toEqual(result)
  })
})

// describe.only(`resolveMoveObject()`, () => {
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

describe(`calculateNextMove()`, () => {
  it(`adds or subtracts the tuple coordinates`, () => {
    expect(calculateNextMove([0, 1], [1, 2])).toEqual([1, 3])
    expect(calculateNextMove([1, 0], [6, 8])).toEqual([7, 8])
    expect(calculateNextMove([0, -1], [4, 4])).toEqual([4, 3])
    expect(calculateNextMove([-1, 0], [-2, 2])).toEqual([-3, 2])
  })
})
