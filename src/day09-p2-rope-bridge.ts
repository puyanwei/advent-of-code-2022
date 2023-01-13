import { directions } from "./consts"
import { coordsToDirMap, tailsToHeadsCoordsMap } from "./consts/maps"
import { data } from "./data/directions"
import {
  calculateNewTailPosition,
  calculateNextMove,
  getRelativeCoordinates,
  resolveIntoSingleSteps,
  resolveTailPosition,
} from "./day09-p1-rope-bridge"
import { MoveDirection, Position, ResolvePosition, Step, TailsToHeadsCoordsMapKey } from "./types"

export function dayNinePartTwo(dataSet = data) {
  const ropeLength = 6

  // return array of arrays by a single step at a time representing the movement of the head
  const resolvedDirections = resolveIntoSingleSteps(`L 3`)

  let knotPositions: number[][] = []
  for (let index = 0; index < ropeLength; index++) knotPositions.push([0, 0])

  // const tailMoves: string[] = []

  resolvedDirections.map((direction) => {
    const step = resolveStepObject({ moveDirection: direction, knotPositions })
    return step
  })
  // const uniqueTailMoves = new Set(tailMoves)
  // return uniqueTailMoves.size
  return 999
}

interface RopeStep {
  headMoveDirection: MoveDirection
  knotPositions: number[][]
}

interface ResolveRopeStepObject {
  knotPositions: number[][]
  moveDirection: Position
}

export interface ResolveNextPosition {
  currentPosition: Position
  nextPosition: Position
}

export function resolveStepObject({
  moveDirection,
  knotPositions,
}: ResolveRopeStepObject): RopeStep {
  const direction = coordsToDirMap[`[${moveDirection}]`] as MoveDirection
  let newKnotPositions: number[][] = knotPositions
  let currentKnotPosition = knotPositions[0]

  console.log({ currentKnotPosition })

  for (let index = 0; index < knotPositions.length; index++) {
    if (index === 0) {
      const newCurrentPosition = calculateNextMove({
        relativeCoords: moveDirection,
        currentCoords: currentKnotPosition as Position,
      })
      newKnotPositions.unshift(newCurrentPosition)
      newKnotPositions.pop()

      currentKnotPosition = newCurrentPosition
      break
    }

    const nextPosition = resolveNextKnotPosition({
      nextPosition: knotPositions[index + 1] as Position,
      currentPosition: currentKnotPosition as Position,
    })
    newKnotPositions.unshift(nextPosition)
    newKnotPositions.pop()
  }

  console.log({ newKnotPositions })

  return {
    headMoveDirection: direction,
    knotPositions: newKnotPositions,
  }
}

export function resolveNextKnotPosition({
  nextPosition,
  currentPosition,
}: ResolveNextPosition): Position {
  // returns the move of the tail in relation to the head
  const relativeCoords = getRelativeCoordinates(nextPosition, currentPosition) as Position
  const stringifiedCoords = `[${relativeCoords}]` as TailsToHeadsCoordsMapKey

  if (!(stringifiedCoords in tailsToHeadsCoordsMap)) {
    throw new Error(`key of tailsToHeadsCoordsMap does not exist`)
  }
  const relativeTailCoords = tailsToHeadsCoordsMap[stringifiedCoords] as Position
  return calculateNewTailPosition({ relativeTailCoords, currentCoords: nextPosition })
}
