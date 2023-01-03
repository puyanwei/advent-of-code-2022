import { directions } from "./consts"
import { directionMap } from "./consts/maps"
import { logObject } from "./helpers"

export type Position = [number, number]

type DirectionAbr = "U" | "D" | "L" | "R"
type DirectionNumber = 0 | 1 | -1
type DirectionMap = Record<DirectionAbr, [DirectionNumber, DirectionNumber]>
type Move = [DirectionNumber, DirectionNumber]
type SplitDirection = [DirectionAbr, string]

interface Rope {
  head: Position[]
  tail: Position[]
}

interface Step {
  name: string
  currentPositions: Rope
  // prevPositions: Rope // do we need prev position?
}

export function dayNinePartOne() {
  // return array of tuples spreading out the duplicate steps into single steps
  const resolvedDirections = resolveData(directions)

  let currentHeadPosition: Position = [0, 0]
  const pathHistory = resolvedDirections.map((direction) => {
    const steps = resolveMoveObject(direction, currentHeadPosition)
  })

  // const tailMoves = steps.map(step => step.currentPosition.tail)
  // const uniqueTailMoves = new Map(tailMoves)
  // return uniqueTailMoves

  return 999
}

export function resolveData(string: string): Move[] {
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

        let arr: any = []
        for (let index = 0; index < number; index++) arr.push(directionCoords)
        return arr
      }
      throw new Error(`Invalid string command`)
    })
    .flat(1)
  return resolveSingleSteps
}

export function resolveMoveObject(direction: Move, currentPosition: Position) {
  // creating the step object
  // resolve head position
  // resolve tail array - stay or move tail
  // return step object

  const head = calculateNextMove(direction, currentPosition)
  //  const tail = resolveTailPosition(direction, currentPosition, head)

  return {
    name: direction,
    currentPositions: {
      head,
      // tail,
    },
  }
}

export function calculateNextMove(direction: Move, currentCoords: Position) {
  const [directionX, directionY] = direction
  const [currentCoordsX, currentCoordsY] = currentCoords
  return [directionX + currentCoordsX, directionY + currentCoordsY]
}
