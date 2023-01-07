import { directions } from "./consts"
import { coordsToDirMap, directionMap, tailsToHeadsCoordsMap } from "./consts/maps"
import { logObject } from "./helpers"
import { Position, Move, DirectionAbr, DirectionNumber } from "./types"

export function dayNinePartOne() {
  // return array of tuples spreading out the duplicate steps into single steps
  const resolvedDirections = resolveIntoSingleSteps(directions)

  // initial head and tail positions
  let headPosition: Position = [0, 0]
  let tailPosition: Position = [0, 0]
  const tailMoves: string[] = []

  resolvedDirections.map((direction) => {
    const step = resolveMoveObject(direction, headPosition, tailPosition)
    headPosition = step.currentPosition.head
    tailPosition = step.currentPosition.tail
    tailMoves.push(`${tailPosition}`)
    return step
  })

  const uniqueTailMoves = new Set(tailMoves)
  return uniqueTailMoves.size
}

export function resolveMoveObject(direction: Move, headPosition: Position, tailPosition: Position) {
  const name = coordsToDirMap[`[${direction}]`]
  const head = calculateNextMove(direction, headPosition)
  const tail = resolveTailPosition(tailPosition, head)
  return {
    name,
    currentPosition: {
      head,
      tail,
    },
  }
}

export function resolveTailPosition(tailPosition: Position, headPosition: Position): Position {
  // returns the move of the tail in relation to the head
  const relativeCoords = getRelativeCoordinates(tailPosition, headPosition)
  const coords = tailsToHeadsCoordsMap[`[${relativeCoords}]`] as Move
  return calculateNewTailPosition(coords, tailPosition)
}

export function calculateNextMove(direction: Move, currentCoords: Position): Position {
  const [directionX, directionY] = direction
  const [currentCoordsX, currentCoordsY] = currentCoords
  return [directionX + currentCoordsX, directionY + currentCoordsY]
}
export function calculateNewTailPosition(direction: Move, currentCoords: Position): Position {
  console.log({ direction })
  const [directionX, directionY] = direction
  const [currentCoordsX, currentCoordsY] = currentCoords
  return [currentCoordsX + directionX, currentCoordsY + directionY]
}

export function getRelativeCoordinates(tailPosition: Position, headPosition: Position) {
  console.log(111, tailPosition, headPosition)
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
