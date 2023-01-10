import { directions } from "./consts"
import { coordsToDirMap, directionMap, tailsToHeadsCoordsMap } from "./consts/maps"
import { data } from "./data/directions"
import { logObject } from "./helpers"
import {
  Position,
  DirectionAbr,
  DirectionNumber,
  TailsToHeadsCoordsMapKey,
  MoveDirection,
  Step,
  ResolvePosition,
  CalculatNextMove,
  CalculateTailPosition,
} from "./types"

export function dayNinePartOne() {
  // return array of arrays by a single step at a time representing the movement of the head
  const resolvedDirections = resolveIntoSingleSteps(directions)
  console.log(resolvedDirections)
  // initial head and tail positions
  let headPosition: Position = [0, 0]
  let tailPosition: Position = [0, 0]
  let lastMoveDirection: MoveDirection | "" = ""
  const tailMoves: string[] = []

  resolvedDirections.map((direction) => {
    const step = resolveStepObject({ moveDirection: direction, headPosition, tailPosition })
    const {
      currentPosition: { head, tail },
      moveDirection,
    } = step
    headPosition = head
    tailPosition = tail
    lastMoveDirection = moveDirection
    tailMoves.push(`${tailPosition}`)
    return step
  })
  const uniqueTailMoves = new Set(tailMoves)
  return uniqueTailMoves.size
}
export function resolveStepObject({
  moveDirection,
  headPosition,
  tailPosition,
}: ResolvePosition): Step {
  const direction = coordsToDirMap[`[${moveDirection}]`] as MoveDirection
  const head = calculateNextMove({ relativeCoords: moveDirection, currentCoords: headPosition })
  const tail = resolveTailPosition({ tailPosition, headPosition: head, moveDirection })
  return {
    moveDirection: direction,
    currentPosition: {
      head,
      tail,
    },
  }
}

export function resolveTailPosition({
  tailPosition,
  headPosition,
  moveDirection,
}: ResolvePosition): Position {
  // returns the move of the tail in relation to the head
  const relativeCoords = getRelativeCoordinates(tailPosition, headPosition) as Position
  const stringifiedCoords = `[${relativeCoords}]` as TailsToHeadsCoordsMapKey
  console.log({ stringifiedCoords })
  if (!(stringifiedCoords in tailsToHeadsCoordsMap))
    throw new Error(`key of tailsToHeadsCoordsMap does not exist`)

  const relativeTailCoords = tailsToHeadsCoordsMap[stringifiedCoords] as Position
  return calculateNewTailPosition({ relativeTailCoords, currentCoords: tailPosition })
}

export function calculateNextMove({ relativeCoords, currentCoords }: CalculatNextMove): Position {
  const [directionX, directionY] = relativeCoords
  const [currentCoordsX, currentCoordsY] = currentCoords
  return [directionX + currentCoordsX, directionY + currentCoordsY]
}
export function calculateNewTailPosition({
  relativeTailCoords,
  currentCoords,
}: CalculateTailPosition): Position {
  const [directionX, directionY] = relativeTailCoords
  const [currentCoordsX, currentCoordsY] = currentCoords
  return [currentCoordsX + directionX, currentCoordsY + directionY]
}

export function getRelativeCoordinates(tailPosition: Position, headPosition: Position) {
  const [tailX, tailY] = tailPosition
  const [headX, headY] = headPosition

  return [tailX - headX, tailY - headY]
}

export function resolveIntoSingleSteps(string: string): Position[] {
  const steps = string.split(`\n`).map((e) => e.trim())

  const resolveSingleSteps = steps
    .map((step) => {
      const [resolvedLetter, resolvedNumber] = step.split(` `)
      const isDirectionLetter =
        resolvedLetter === "L" ||
        resolvedLetter === "R" ||
        resolvedLetter === "U" ||
        resolvedLetter === "D"

      if (isDirectionLetter) {
        const letter = resolvedLetter as DirectionAbr
        const directionCoords = directionMap[letter]
        const number = parseInt(resolvedNumber)

        let arr: [DirectionNumber, DirectionNumber][] = []
        for (let index = 0; index < number; index++) arr.push(directionCoords)
        return arr
      }
      throw new Error(`Invalid string command`)
    })
    .flat(1)
  return resolveSingleSteps
}
