import { treeGridScanDirection, trees } from "./consts"
import { data } from "./data/trees"
import { isEdgeOfGrid, resolveTree, resolveTreeGrid } from "./day08-p1-tree-top-tree-house"
import { flattenArray, logObject } from "./helpers"
import { Tree, Directions } from "./types"

export function dayEightPartTwo() {
  const treeGrid = resolveTreeGrid(data)

  const scoreMatrix: number[][] = treeGrid.map((rows, rowIndex) =>
    rows.map((columns, colIndex) => {
      // cycle through array of arrays' positions
      const tree = resolveTree([rowIndex, colIndex], treeGrid, true)
      const blockingTreesArray: number[] = resolveBlockingTrees(tree)
      if (blockingTreesArray.includes(0)) return 0
      return multiplyAll(blockingTreesArray)
    })
  )
  const scoresArray = flattenArray(scoreMatrix)
  const highestScore = Math.max(...scoresArray)
  return highestScore
}

export function resolveBlockingTrees(tree: Tree): number[] {
  const visibleTreeArray = treeGridScanDirection.map((direction) => {
    let isTallerTreeReached = false
    const isTreeVisibleByDirection = tree.surroundingTreeHeights[direction as Directions]
      .map((surroundingTreeHeight) => {
        const isSurroundingTreeBlocking = tree.height <= surroundingTreeHeight
        if (isTallerTreeReached) return
        if (!isSurroundingTreeBlocking) return isSurroundingTreeBlocking
        isTallerTreeReached = true
        return isSurroundingTreeBlocking
      })
      .filter((e) => e !== undefined).length

    return isTreeVisibleByDirection
  })
  return visibleTreeArray
}

export function multiplyAll(array: number[]): number {
  return array.reduce((prev, curr) => (prev *= curr), 1)
}
