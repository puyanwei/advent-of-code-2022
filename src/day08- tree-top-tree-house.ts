import { data } from "./data/trees"

type Position = [number, number]
type Grid = number[][]
interface SurroundingTreeHeights {
  above: number[]
  right: number[]
  below: number[]
  left: number[]
}
interface Tree {
  position: Position
  height: number
  surroundingTreeHeights: SurroundingTreeHeights
}

const exampleData = `30373
25512
65332
33549
35390`

const targetTree: Position = [3, 2]

export function dayEightPartOne() {
  const treeGrid = resolveTreeGrid(exampleData)

  // const tree = resolveTree(targetTree, treeGrid) // Lets do one tree first
  // console.log("TREE", tree)
  // const result = isTreeVisible(targetTree, tree)
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

  const right = grid[row].filter((tree, index) => index > column)
  const left = grid[row].filter((tree, index) => index < column)

  const transposedGrid = transpose(grid)
  const above = transposedGrid[column].filter((tree, index) => index < row)
  const below = transposedGrid[column].filter((tree, index) => index > row)

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

export function transpose<T>(grid: T[][]): T[][] {
  return grid[0].map((_, colIndex) => grid.map((row) => row[colIndex]))
}

export function isTreeVisible(targetTree: Position, tree: Tree): boolean {
  return false
}
