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

type Position = [number, number]

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
  // creates the step object
  // move head
  // resolve head array
  // check previous move so that tail can move correctly - stay or move tail
  // resolve tail array
  // return step object

  return {
    name: direction,
    currentPositions: {
      head: resolveHeadPosition(direction, currentPosition),
      // tail: resolveTailPosition(direction, currentPosition),
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
    console.log({ newPosition })
    return newPosition
  }
  throw Error("Split word does not contain direction command")
}

// export function resolveHeadPosition(direction: string, position: Position) {}
