import { directions } from "./consts"

export function dayNinePartOne() {
  // const commands:string[] = data.split(`\n`)

  let currentPosition: Position = [0, 0]

  const pathHistory = directions.map((direction) => {
    const steps = resolveMove(direction, currentPosition)
  })

  // const tailMoves = steps.map(step => step.currentPosition.tail)
  // const uniqueTailMoves = new Map(tailMoves)
  // return uniqueTailMoves

  return 999
}

// [0, 0] is the starting point

export type PositionBounds = -2 | -1 | 0 | 1 | 2
export type Position = [PositionBounds, PositionBounds]

interface Rope {
  head: Position[]
  tail: Position[]
}

interface Step {
  name: string
  currentPositions: Rope
  // prevPositions: Rope // do we need prev position?
}

export function resolveMove(direction: string, currentPosition: Position) {
  // creating the step object
  // resolve head position
  // resolve tail array - stay or move tail
  // return step object

  const head = resolveHeadPosition(direction, currentPosition)
  const tail = resolveTailPosition(direction, currentPosition, head)

  return {
    name: direction,
    currentPositions: {
      head,
      tail,
    },
    // previousPostions: resolvePreviousPosition(direction),
  }
}

type DirectionAbr = "U" | "D" | "L" | "R"
type DirectionNumber = 0 | 1 | -1
type DirectionMap = Record<DirectionAbr, [DirectionNumber, DirectionNumber]>
type SplitDirection = [DirectionAbr, string]

const directionMap: Readonly<DirectionMap> = {
  // Cant seem to use `as const` here?
  U: [0, 1],
  D: [0, -1],
  L: [1, 0],
  R: [-1, 0],
}

export function resolveHeadPosition(direction: string, currentPosition: Position): Position {
  const [resolvedLetter, resolvedNumber] = direction.split(` `)
  const letter = resolvedLetter as DirectionAbr
  const number = parseInt(resolvedNumber)
  if (letter === "U" || letter === "D" || letter === "L" || letter === "R") {
    const [currentX, currentY] = currentPosition

    let newPosition = currentPosition
    if (letter === "L") newPosition = [currentX - number, currentY]
    if (letter === "R") newPosition = [currentX + number, currentY]
    if (letter === "U") newPosition = [currentX, currentY + number]
    if (letter === "D") newPosition = [currentX, currentY - number]
    return newPosition
  }
  throw Error("Split word does not contain direction command")
}

export function resolveTailPosition(
  direction: string,
  currentPosition: Position,
  headPosition: Position
) {
  /* Combos of tail to head positioning



*/
}
