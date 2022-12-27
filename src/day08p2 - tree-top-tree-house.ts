import { treeGridScanDirection, trees } from "./consts"
import { data } from "./data/trees"
import { isEdgeOfGrid, resolveTree, resolveTreeGrid } from "./day08p1 - tree-top-tree-house"
import { logObject } from "./helpers"
import { Tree, Directions } from "./types"

export function dayEightPartTwo() {
  const treeGrid = resolveTreeGrid(trees)

  const arrayOfVisibleTrees = treeGrid
  // .map((rows, rowIndex) =>
  // rows.map((columns, colIndex) => {
  // cycle through array of arrays' positions
  // const tree = resolveTree([rowIndex, colIndex], treeGrid)
  const tree = resolveTree([1, 2], treeGrid, true)
  logObject(tree)
  const blockingTreesArray = resolveBlockingTrees(tree)
  // console.log(11111, blockingTreesArray)
  // })
  // )

  return arrayOfVisibleTrees
}

export function resolveBlockingTrees(tree: Tree) {
  const visibleTreeArray = treeGridScanDirection.map((direction) => {
    let isTallerTreeReached = false
    const isTreeVisibleByDirection = tree.surroundingTreeHeights[direction as Directions]
      .map((surroundingTreeHeight) => {
        const isTargetTreeTallerThanSurroundingTree = tree.height <= surroundingTreeHeight
        if (isTallerTreeReached) return
        if (!isTargetTreeTallerThanSurroundingTree) return isTargetTreeTallerThanSurroundingTree
        isTallerTreeReached = true
        return isTargetTreeTallerThanSurroundingTree
      })
      .filter((e) => e !== undefined).length
    return isTreeVisibleByDirection
  })
  return visibleTreeArray
}
