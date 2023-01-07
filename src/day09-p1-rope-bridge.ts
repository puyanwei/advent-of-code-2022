import { directions } from "./consts"
import { directionMap, tailsToHeadsCoordsMap } from "./consts/maps"
import { logObject } from "./helpers"
import { Position, Move, DirectionAbr, DirectionNumber } from "./types"

export function dayNinePartOne() {
  // return array of tuples spreading out the duplicate steps into single steps
  const resolvedDirections = resolveIntoSingleSteps(directions)

  // initial head and tail positions
  let headPosition: Position = [0, 0]
  let tailPosition: Position = [0, 0]
  const pathHistory = resolvedDirections.map((direction) => {
    const steps = resolveMoveObject(direction, headPosition, tailPosition)
  })

  // const uniqueTailMoves = new Map(tailMoves)
  // return uniqueTailMoves

  return 999
}

export function resolveMoveObject(direction: Move, headPosition: Position, tailPosition: Position) {
  const head = calculateNextMove(direction, headPosition)
  const tail = resolveTailPosition(headPosition, tailPosition)

  return {
    name: direction,
    currentPositions: {
      head,
      tail,
    },
  }
}

export function resolveTailPosition(tailPosition: Position, headPosition: Position): Position {
  // returns the move of the tail in relation to the head
  const relativeCoords = getRelativeCoordinates(tailPosition, headPosition)
  const coords = `[${relativeCoords}]`
  const newPosition = tailsToHeadsCoordsMap[coords] as Move
  console.log({ newPosition, tailPosition, coords })
  return calculateNextMove(newPosition, tailPosition)
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

export function calculateNextMove(direction: Move, currentCoords: Position): Position {
  const [directionX, directionY] = direction
  const [currentCoordsX, currentCoordsY] = currentCoords
  return [directionX + currentCoordsX, directionY + currentCoordsY]
}

export function getRelativeCoordinates(tailPosition: Position, headPosition: Position) {
  const [tailX, tailY] = tailPosition
  const [headX, headY] = headPosition

  return [tailX - headX, tailY - headY]
}
