import { tailsToHeadsCoordsMap } from "../consts/maps"
import {
  calculateNextMove,
  getRelativeCoordinates,
  resolveDiagonalTailPosition,
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

describe(`resolveDiagonalTailPosition()`, () => {
  it.only(`moves the tail next to or behind the head`, () => {
    // bottom right of head, head went up, tail goes right
    const bottomRightHeadUp = resolveDiagonalTailPosition({
      relativeCoords: [1, -1],
      headMoveDirection: [0, 1],
    })
    expect(bottomRightHeadUp).toEqual([-1, 0])

    // bottom right of head, head went left, tail goes up
    const bottomRightHeadLeft = resolveDiagonalTailPosition({
      relativeCoords: [1, -1],
      headMoveDirection: [-1, 0],
    })
    expect(bottomRightHeadLeft).toEqual([0, 1])

    // bottom left of head, head went up, tail goes right
    const bottomLeftHeadUp = resolveDiagonalTailPosition({
      relativeCoords: [-1, -1],
      headMoveDirection: [0, 1],
    })
    expect(bottomLeftHeadUp).toEqual([1, 0])

    // bottom left of head, head went right, tail goes up
    const bottomLeftHeadRight = resolveDiagonalTailPosition({
      relativeCoords: [-1, -1],
      headMoveDirection: [1, 0],
    })
    expect(bottomLeftHeadRight).toEqual([0, 1])

    // top left of head, head went down, tail goes right
    const topLeftHeadDown = resolveDiagonalTailPosition({
      relativeCoords: [-1, 1],
      headMoveDirection: [0, -1],
    })
    expect(topLeftHeadDown).toEqual([1, 0])
  })

  // top left of head, head went right, tail goes down
  const topLeftHeadRight = resolveDiagonalTailPosition({
    relativeCoords: [-1, 1],
    headMoveDirection: [1, 0],
  })
  expect(topLeftHeadRight).toEqual([0, -1])

  // top right of head, head went down, tail goes left
  const topRightHeadDown = resolveDiagonalTailPosition({
    relativeCoords: [1, 1],
    headMoveDirection: [0, -1],
  })
  expect(topRightHeadDown).toEqual([-1, 0])

  // top right of head, head went left, tail goes down
  const topRightHeadLeft = resolveDiagonalTailPosition({
    relativeCoords: [1, 1],
    headMoveDirection: [-1, 0],
  })
  expect(topRightHeadLeft).toEqual([0, -1])
})

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
