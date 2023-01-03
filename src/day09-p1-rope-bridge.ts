import { directions } from "./consts"
import { directionMap } from "./consts/maps"
import { logObject } from "./helpers"

export type PositionBounds = -2 | -1 | 0 | 1 | 2
export type Position = [PositionBounds, PositionBounds]

type DirectionAbr = "U" | "D" | "L" | "R"
type DirectionNumber = 0 | 1 | -1
type DirectionMap = Record<DirectionAbr, [DirectionNumber, DirectionNumber]>
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
  // const commands:string[] = data.split(`\n`)

  const resolvedDirections = resolveSteps(directions)

  // let currentPosition: Position = [0, 0]
  // const pathHistory = resolvedDirections.map((direction) => {
  //   const steps = resolveMove(direction, currentPosition)
  // })

  // const tailMoves = steps.map(step => step.currentPosition.tail)
  // const uniqueTailMoves = new Map(tailMoves)
  // return uniqueTailMoves

  return 999
}

export function resolveSteps(string: string) {
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

// [0, 0] is the starting point

// export function resolveMove(direction: string, currentPosition: Position) {
//   // creating the step object
//   // resolve head position
//   // resolve tail array - stay or move tail
//   // return step object

//    const head = resolveHeadPosition(direction, currentPosition)
//    const tail = resolveTailPosition(direction, currentPosition, head)

//   return {
//     name: direction,
//     currentPositions: {
//       head,
//       tail,
//     },
//     // previousPostions: resolvePreviousPosition(direction),
//   }
// }

// export function resolveHeadPosition(direction: string, currentPosition: Position): Position {
//   const [resolvedLetter, resolvedNumber] = direction.split(` `)
//   const letter = resolvedLetter as DirectionAbr
//   const number = parseInt(resolvedNumber)
//   if (letter === "U" || letter === "D" || letter === "L" || letter === "R") {
//     const [currentX, currentY] = currentPosition

//     let newPosition = currentPosition
//     if (letter === "L") newPosition = [currentX - number, currentY]
//     if (letter === "R") newPosition = [currentX + number, currentY]
//     if (letter === "U") newPosition = [currentX, currentY + number]
//     if (letter === "D") newPosition = [currentX, currentY - number]
//     return newPosition
//   }
//   throw Error("Split word does not contain direction command")
// }
