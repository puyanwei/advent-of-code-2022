import { directions } from "./consts"
import { coordsToDirMap, tailsToHeadsCoordsMap } from "./consts/maps"
import { data } from "./data/directions"
import {
  calculateNewTailPosition,
  calculateNextMove,
  getRelativeCoordinates,
  resolveIntoSingleSteps,
} from "./day09-p1-rope-bridge"
import { logObject } from "./helpers"
import {
  MoveDirection,
  Position,
  ResolveNextPosition,
  ResolveRopeStepObject,
  RopeStep,
  TailsToHeadsCoordsMapKey,
} from "./types"

export function dayNinePartTwo(dataSet = data) {
  const ropeLength = 6

  // return array of arrays by a single step at a time representing the movement of the head
  const resolvedDirections = resolveIntoSingleSteps(`R 1`)
  // const resolvedDirections = resolveIntoSingleSteps(directions)

  let knotPositions: number[][] = []
  for (let index = 0; index < ropeLength; index++) knotPositions.push([0, 0])

  const tailMoves: number[][] = []

  resolvedDirections.map((direction) => {
    const step = resolveStepObject({ moveDirection: direction, knotPositions })
    const tail = step.knotPositions.at(-1)
    if (!tail) throw new Error(`no tail found`)
    tailMoves.push(tail)
    // logObject(step)
    return step
  })

  // const uniqueTailMoves = new Set(tailMoves)
  // return uniqueTailMoves.size
  return 99
}

export function resolveStepObject({
  moveDirection,
  knotPositions,
}: ResolveRopeStepObject): RopeStep {
  const direction = coordsToDirMap[`[${moveDirection}]`] as MoveDirection
  let prevKnot = [] as Position | []

  const newKnotPositions = knotPositions.map((knot, index) => {
    if (index === 0) {
      const head = calculateNextMove({
        relativeCoords: moveDirection,
        currentCoords: knot as Position,
      })
      prevKnot = head
      return head
    }
    console.log({ prevKnot, knot })

    const currentKnot = calculateNextMove({
      relativeCoords: moveDirection,
      currentCoords: knot as Position,
    })

    return resolveNextPosition({
      currentPosition: prevKnot as Position,
      nextPosition: currentKnot as Position,
    })
  })
  console.log({ newKnotPositions })
  const obj = {
    headMoveDirection: direction,
    knotPositions: newKnotPositions,
  }

  // logObject(obj)

  return obj
}

export function resolveNextPosition({
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
