import { tailsToHeadsCoordsMap } from "../consts/maps"
import {
  calculateNextMove,
  getRelativeCoordinates,
  resolveTailPosition,
} from "../day09-p1-rope-bridge"

describe.only(`tailsToHeadsCoordsMap`, () => {
  it(`the tail does not need to move as it is touching the head`, () => {
    expect(tailsToHeadsCoordsMap[`[-1,-1]`]).toEqual([0, 0])
    expect(tailsToHeadsCoordsMap[`[-1,0]`]).toEqual([0, 0])
    expect(tailsToHeadsCoordsMap[`[-1,1]`]).toEqual([0, 0])
    expect(tailsToHeadsCoordsMap[`[0,-1]`]).toEqual([0, 0])
    expect(tailsToHeadsCoordsMap[`[0,0]`]).toEqual([0, 0])
    expect(tailsToHeadsCoordsMap[`[0,1]`]).toEqual([0, 0])
    expect(tailsToHeadsCoordsMap[`[1,-1]`]).toEqual([0, 0])
    expect(tailsToHeadsCoordsMap[`[1,0]`]).toEqual([0, 0])
    expect(tailsToHeadsCoordsMap[`[1,1]`]).toEqual([0, 0])
  })
  it(`returns the move coordinates for the tail after the head has moved`, () => {
    expect(tailsToHeadsCoordsMap[`[-2,-2]`]).toEqual([-1, -1])
    expect(tailsToHeadsCoordsMap[`[-1,-2]`]).toEqual([-1, -1])
    expect(tailsToHeadsCoordsMap[`[0,-2]`]).toEqual([0, -1])
    expect(tailsToHeadsCoordsMap[`[1,-2]`]).toEqual([1, -1])
    expect(tailsToHeadsCoordsMap[`[2,-2]`]).toEqual([1, -1])
    expect(tailsToHeadsCoordsMap[`[-2,-1]`]).toEqual([-1, -1])
    expect(tailsToHeadsCoordsMap[`[2,-1]`]).toEqual([1, -1])
    expect(tailsToHeadsCoordsMap[`[-2,0]`]).toEqual([-1, 0])
    expect(tailsToHeadsCoordsMap[`[2,0]`]).toEqual([1, 0])
    expect(tailsToHeadsCoordsMap[`[2,1]`]).toEqual([1, 1])
    expect(tailsToHeadsCoordsMap[`[-2,2]`]).toEqual([-1, 1])
    expect(tailsToHeadsCoordsMap[`[-1,2]`]).toEqual([-1, 1])
    expect(tailsToHeadsCoordsMap[`[0,2]`]).toEqual([0, 1])
    expect(tailsToHeadsCoordsMap[`[1,2]`]).toEqual([1, 1])
    expect(tailsToHeadsCoordsMap[`[2,2]`]).toEqual([1, 1])
  })
})

describe(`calculateNextMove()`, () => {
  it(`adds up the tuple coordinates`, () => {
    expect(calculateNextMove([0, 1], [1, 2])).toEqual([1, 3])
    expect(calculateNextMove([1, 0], [6, 8])).toEqual([7, 8])
    expect(calculateNextMove([0, -1], [4, 4])).toEqual([4, 3])
    expect(calculateNextMove([-1, 0], [-2, 2])).toEqual([-3, 2])
  })
})

describe(`resolveMoveObject()`, () => {
  it.todo(`returns the move object based on the head & tail position`)
})

// describe(`resolveTailPosition`, () => {
//   it(`returns the tail's position in relation to head's position`, () => {
//     expect(resolveTailPosition([0, 0], [0, 0])).toEqual([0, 0])
//     expect(resolveTailPosition([2, 2], [3, 3])).toEqual([2, 2])
//     expect(resolveTailPosition([5, 5], [4, 4])).toEqual([5, 5])
//     expect(resolveTailPosition([1, -2], [0, 0])).toEqual([1, -1])
//   })
// })

describe(`getRelativeCoordinates()`, () => {
  it(`substracts the tuple coordinates`, () => {
    expect(getRelativeCoordinates([0, 0], [0, 0])).toEqual([0, 0])
    expect(getRelativeCoordinates([0, 1], [1, 2])).toEqual([-1, -1])
    expect(getRelativeCoordinates([1, 0], [6, 8])).toEqual([-5, -8])
    expect(getRelativeCoordinates([0, -1], [4, 4])).toEqual([-4, -5])
    expect(getRelativeCoordinates([-1, 0], [-2, 2])).toEqual([1, -2])
    expect(getRelativeCoordinates([-1, 0], [-2, 2])).toEqual([1, -2])
    expect(getRelativeCoordinates([2, 2], [3, 3])).toEqual([-1, -1])
    expect(getRelativeCoordinates([2, 2], [4, 4])).toEqual([-2, -2])
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
