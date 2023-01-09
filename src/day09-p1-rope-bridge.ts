import { directions } from "./consts"
import { coordsToDirMap, directionMap, tailsToHeadsCoordsMap } from "./consts/maps"
import { data } from "./data/directions"
import { logObject } from "./helpers"
import {
  Position,
  Move,
  DirectionAbr,
  DirectionNumber,
  TailsToHeadsCoordsMapKey,
  MoveDirection,
  Step,
  ResolveTailPosition,
} from "./types"

export function dayNinePartOne() {
  // return array of tuples spreading out the duplicate steps into single steps
  const resolvedDirections = resolveIntoSingleSteps(directions)

  // initial head and tail positions
  let headPosition: Position = [0, 0]
  let tailPosition: Position = [0, 0]
  let lastMoveDirection: MoveDirection | "" = ""
  const tailMoves: string[] = []

  resolvedDirections.map((direction) => {
    const step = resolveStepObject(direction, headPosition, tailPosition)
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

export function resolveStepObject(
  direction: Move,
  headPosition: Position,
  tailPosition: Position
): Step {
  const moveDirection = (coordsToDirMap[`[${direction}]`] as MoveDirection) || ""
  const head = calculateNextMove(direction, headPosition)
  const tail = resolveTailPosition({ tailPosition, headPosition: head, moveDirection })
  return {
    moveDirection,
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
}: ResolveTailPosition): Position {
  // returns the move of the tail in relation to the head
  const relativeCoords = getRelativeCoordinates(tailPosition, headPosition)
  const stringifiedCoords = `[${relativeCoords}]` as TailsToHeadsCoordsMapKey

  if (!(stringifiedCoords in tailsToHeadsCoordsMap))
    throw new Error(`key of tailsToHeadsCoordsMap does not exist`)

  const coords = tailsToHeadsCoordsMap[stringifiedCoords] as Move
  return calculateNewTailPosition(coords, tailPosition)
}

export function calculateNextMove(direction: Move, currentCoords: Position): Position {
  const [directionX, directionY] = direction
  const [currentCoordsX, currentCoordsY] = currentCoords
  return [directionX + currentCoordsX, directionY + currentCoordsY]
}
export function calculateNewTailPosition(direction: Move, currentCoords: Position): Position {
  const [directionX, directionY] = direction
  const [currentCoordsX, currentCoordsY] = currentCoords
  return [currentCoordsX + directionX, currentCoordsY + directionY]
}

export function getRelativeCoordinates(tailPosition: Position, headPosition: Position) {
  const [tailX, tailY] = tailPosition
  const [headX, headY] = headPosition

  return [tailX - headX, tailY - headY]
}

export function resolveIntoSingleSteps(string: string): Move[] {
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
