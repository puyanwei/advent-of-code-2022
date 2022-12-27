import { trees } from "./consts"
import { data } from "./data/trees"
import { logObject } from "./helpers"
import { Position, Grid, Tree, SurroundingTreeHeights } from "./types"

export function dayEightPartOne() {
  const treeGrid = resolveTreeGrid(data)

  const arrayOfVisibleTrees = treeGrid
    .map((rows, rowIndex) =>
      rows.map((columns, colIndex) => {
        // cycle through array of arrays' positions
        const tree = resolveTree([rowIndex, colIndex], treeGrid)
        return isEdgeOfGrid(tree.position, treeGrid)
          ? true
          : isTreeVisible(tree)
      })
    )
    .flatMap((e) => e)
    .filter((e) => !!e).length

  return arrayOfVisibleTrees
}

export function resolveTreeGrid(data: string): number[][] {
  const arrayOfRows = data.split(`\n`)
  const grid = arrayOfRows.map((row) =>
    row.split(``).map((number) => parseInt(number))
  )
  return grid
}

export function resolveTree(
  target: Position,
  grid: Grid,
  isOutwardView = false
): Tree {
  const [row, column] = target // rows is the first param due to how the array of arrays are structured
  const height = grid[row][column]
  const transposedGrid = transposeMatrix(grid)

  const resolvedRight = grid[row].filter((tree, index) => index > column)
  const resolvedLeft = grid[row].filter((tree, index) => index < column)
  const resolvedAbove = transposedGrid[column].filter(
    (tree, index) => index < row
  )
  const resolvedBelow = transposedGrid[column].filter(
    (tree, index) => index > row
  )

  const above = isOutwardView
    ? resolveEmptyArray(resolvedAbove).reverse()
    : resolveEmptyArray(resolvedAbove)
  const right = resolveEmptyArray(resolvedRight)
  const left = isOutwardView
    ? resolveEmptyArray(resolvedLeft).reverse()
    : resolveEmptyArray(resolvedLeft)
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

export function transposeMatrix<T>(grid: T[][]): T[][] {
  return grid[0].map((_, colIndex) => grid.map((row) => row[colIndex]))
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

export function isEdgeOfGrid(target: Position, grid: Grid): boolean {
  const lastRow = grid.length - 1
  const lastCol = grid[lastRow].length - 1
  const [row, column] = target

  if (row > lastRow) throw new Error("Target row is bigger then grid row")
  if (column > lastCol)
    throw new Error("Target column is bigger then grid column")
  if (row === 0) return true
  if (row === lastRow) return true
  if (column === 0) return true
  if (column === lastCol) return true
  return false
}
