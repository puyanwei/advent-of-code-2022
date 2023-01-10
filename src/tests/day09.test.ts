import { tailsToHeadsCoordsMap } from "../consts/maps"
import {
  calculateNextMove,
  getRelativeCoordinates,
  resolveStepObject,
  resolveTailPosition,
} from "../day09-p1-rope-bridge"

describe(`tailsToHeadsCoordsMap`, () => {
  it(`the tail does not need to move as it is touching the head`, () => {
    // rows from top down, left to right (without corners and diagonals)
    expect(tailsToHeadsCoordsMap[`[-1,2]`]).toEqual([1, -1])
    expect(tailsToHeadsCoordsMap[`[0,2]`]).toEqual([0, -1])
    expect(tailsToHeadsCoordsMap[`[1,2]`]).toEqual([-1, -1])

    expect(tailsToHeadsCoordsMap[`[-2,1]`]).toEqual([1, -1])
    expect(tailsToHeadsCoordsMap[`[0,1]`]).toEqual([0, 0])
    expect(tailsToHeadsCoordsMap[`[2,1]`]).toEqual([-1, -1])

    expect(tailsToHeadsCoordsMap[`[-2,0]`]).toEqual([-1, 0])
    expect(tailsToHeadsCoordsMap[`[-1,0]`]).toEqual([0, 0])
    expect(tailsToHeadsCoordsMap[`[0,0]`]).toEqual([0, 0])
    expect(tailsToHeadsCoordsMap[`[1,0]`]).toEqual([0, 0])
    expect(tailsToHeadsCoordsMap[`[2,0]`]).toEqual([-1, 0])

    expect(tailsToHeadsCoordsMap[`[-2,-1]`]).toEqual([1, -1])
    expect(tailsToHeadsCoordsMap[`[0,-1]`]).toEqual([0, 0])
    expect(tailsToHeadsCoordsMap[`[2,-1]`]).toEqual([-1, -1])

    expect(tailsToHeadsCoordsMap[`[-1,-2]`]).toEqual([1, 1])
    expect(tailsToHeadsCoordsMap[`[0,-2]`]).toEqual([0, 1])
    expect(tailsToHeadsCoordsMap[`[1,-2]`]).toEqual([-1, -1])
  })
})

it.todo(`resolveDiagonals()`)

describe(`calculateNextMove()`, () => {
  it(`adds up the tuple coordinates`, () => {
    expect(calculateNextMove({ relativeCoords: [0, 1], currentCoords: [1, 2] })).toEqual([1, 3])
    expect(calculateNextMove({ relativeCoords: [0, 1], currentCoords: [0, 1] })).toEqual([0, 2])
    expect(calculateNextMove({ relativeCoords: [1, 0], currentCoords: [6, 8] })).toEqual([7, 8])
    expect(calculateNextMove({ relativeCoords: [0, -1], currentCoords: [4, 4] })).toEqual([4, 3])
    expect(calculateNextMove({ relativeCoords: [-1, 0], currentCoords: [-2, 2] })).toEqual([-3, 2])
  })
})

describe(`resolveMoveObject()`, () => {
  it(`returns an object containing move data`, () => {
    const result = {
      moveDirection: "up",
      currentPosition: {
        head: [0, 2],
        tail: [0, 1],
      },
    }

    expect(
      resolveStepObject({ moveDirection: [0, 1], headPosition: [0, 1], tailPosition: [0, 0] })
    ).toEqual(result)
  })
})

describe(`resolveTailPosition`, () => {
  it(`returns the tail's position in relation to head's position`, () => {
    expect(
      resolveTailPosition({ tailPosition: [0, 0], headPosition: [0, 0], moveDirection: [0, 0] })
    ).toEqual([0, 0])
    expect(
      resolveTailPosition({ tailPosition: [2, 2], headPosition: [3, 3], moveDirection: [0, 1] })
    ).toEqual([2, 2])
    expect(
      resolveTailPosition({ tailPosition: [5, 5], headPosition: [4, 4], moveDirection: [-1, 0] })
    ).toEqual([5, 5])
    expect(
      resolveTailPosition({ tailPosition: [1, -2], headPosition: [0, 0], moveDirection: [0, 1] })
    ).toEqual([1, -1])
    expect(
      resolveTailPosition({ tailPosition: [0, 2], headPosition: [2, 2], moveDirection: [1, 0] })
    ).toEqual([1, 2])
  })
})

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
