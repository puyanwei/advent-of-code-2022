import { directions, moveDirectoryResult } from "../consts"
import { tailsToHeadsCoordsMap } from "../consts/maps"
import {
  calculateNextMove,
  dayNinePartOne,
  getRelativeCoordinates,
  resolveIntoSingleSteps,
  resolveStepObject,
  resolveTailPosition,
} from "../day09-p1-rope-bridge"
import { Position } from "../types"

describe(`tailsToHeadsCoordsMap`, () => {
  it(`the tail does not need to move as it is touching the head`, () => {
    // rows from top down, left to right (without corners and diagonals)
    expect(tailsToHeadsCoordsMap[`[-1,2]`]).toEqual([1, -1])
    expect(tailsToHeadsCoordsMap[`[0,2]`]).toEqual([0, -1])
    expect(tailsToHeadsCoordsMap[`[1,2]`]).toEqual([-1, -1])

    expect(tailsToHeadsCoordsMap[`[-2,1]`]).toEqual([1, -1])
    expect(tailsToHeadsCoordsMap[`[0,1]`]).toEqual([0, 0])
    expect(tailsToHeadsCoordsMap[`[2,1]`]).toEqual([-1, -1])

    expect(tailsToHeadsCoordsMap[`[-2,0]`]).toEqual([1, 0])
    expect(tailsToHeadsCoordsMap[`[-1,0]`]).toEqual([0, 0])
    expect(tailsToHeadsCoordsMap[`[0,0]`]).toEqual([0, 0])
    expect(tailsToHeadsCoordsMap[`[1,0]`]).toEqual([0, 0])
    expect(tailsToHeadsCoordsMap[`[2,0]`]).toEqual([-1, 0])

    expect(tailsToHeadsCoordsMap[`[-2,-1]`]).toEqual([1, 1])
    expect(tailsToHeadsCoordsMap[`[0,-1]`]).toEqual([0, 0])
    expect(tailsToHeadsCoordsMap[`[2,-1]`]).toEqual([-1, 1])

    expect(tailsToHeadsCoordsMap[`[-1,-2]`]).toEqual([1, 1])
    expect(tailsToHeadsCoordsMap[`[0,-2]`]).toEqual([0, 1])
    expect(tailsToHeadsCoordsMap[`[1,-2]`]).toEqual([-1, 1])
  })
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

describe(`resolveTailPosition`, () => {
  it(`if the tail is one step away from the head, it does not move`, () => {
    expect(resolveTailPosition({ tailPosition: [0, 0], headPosition: [0, 0] })).toEqual([0, 0])
    expect(resolveTailPosition({ tailPosition: [2, 2], headPosition: [3, 3] })).toEqual([2, 2])
    expect(
      resolveTailPosition({
        tailPosition: [5, 5],
        headPosition: [4, 4],
      })
    ).toEqual([5, 5])
  })

  it(`if the tail is one chess knight's move away from the head, it moves diagonally towards the head so it becomes beside it`, () => {
    expect(
      resolveTailPosition({
        tailPosition: [1, -2],
        headPosition: [0, 0],
      })
    ).toEqual([0, -1])
    expect(resolveTailPosition({ tailPosition: [0, 2], headPosition: [2, 2] })).toEqual([1, 2])
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

describe(`integration tests`, () => {
  it(`outputs the correct object using the example dataset`, () => {
    const resolvedDirections = resolveIntoSingleSteps(directions)
    let headPosition: Position = [0, 0]
    let tailPosition: Position = [0, 0]
    const tailMoves: string[] = []

    const arr = resolvedDirections.map((direction) => {
      const step = resolveStepObject({ moveDirection: direction, headPosition, tailPosition })
      const { head, tail } = step.currentPosition

      headPosition = head
      tailPosition = tail
      tailMoves.push(`${tailPosition}`)
      return step
    })
    expect(JSON.stringify(arr)).toEqual(JSON.stringify(moveDirectoryResult))
  })
  it(`returns 13 as the result to represent the number of positions the tail had visited once`, () => {
    expect(dayNinePartOne(directions)).toEqual(13)
  })
})
