import { data } from "./data/trees"

type Position = [number, number]
type Grid = number[][]
type Directions = "above" | "below" | "left" | "right"
interface SurroundingTreeHeights {
  above: number[]
  right: number[]
  below: number[]
  left: number[]
}
export interface Tree {
  position: Position
  height: number
  surroundingTreeHeights: SurroundingTreeHeights
}

const exampleData = `30373
25512
65332
33549
35390`

const targetTree: Position = [0, 0]

export function dayEightPartOne() {
  const treeGrid = resolveTreeGrid(exampleData)

  const tree = resolveTree(targetTree, treeGrid) // Lets do one tree first
  const result = isTreeVisible(tree)
  return 0
}

export function resolveTreeGrid(data: string): number[][] {
  const arrayOfRows = data.split(`\n`)
  const grid = arrayOfRows.map((row) =>
    row.split(``).map((number) => parseInt(number))
  )
  return grid
}

export function resolveTree(target: Position, grid: Grid): Tree {
  const [row, column] = target
  const height = grid[row][column]

  const resolvedRight = grid[row].filter((tree, index) => index > column)
  const resolvedLeft = grid[row].filter((tree, index) => index < column)

  const transposedGrid = transpose(grid)
  const resolvedAbove = transposedGrid[column].filter(
    (tree, index) => index < row
  )
  const resolvedBelow = transposedGrid[column].filter(
    (tree, index) => index > row
  )

  const left = resolveEmptyArray(resolvedLeft)
  const right = resolveEmptyArray(resolvedRight)
  const above = resolveEmptyArray(resolvedAbove)
  const below = resolveEmptyArray(resolvedBelow)

  return {
    position: target,
    height,
    surroundingTreeHeights: {
      right,
      left,
      above,
      below,
    },
  }
}

function resolveEmptyArray(array: number[]): number[] | [0] {
  return !array.length ? [0] : array
}

export function transpose<T>(grid: T[][]): T[][] {
  return grid[0].map((_, colIndex) => grid.map((row) => row[colIndex]))
}

type TreeHeights = {
  [Property in Directions]: number[]
}

export function isTreeVisible(tree: Tree) {
  const directions = Object.keys(tree.surroundingTreeHeights) as Array<
    keyof SurroundingTreeHeights
  >

  return directions
    .map((direction) => {
      const isTreeVisibleByDirection = tree.surroundingTreeHeights[
        direction
      ].some(
        (surroundingTreeHeight) => !(tree.height > surroundingTreeHeight) // Have to flip this to make it return
      )

      return !isTreeVisibleByDirection // Flip it back
    })
    .some((e) => e)
}
