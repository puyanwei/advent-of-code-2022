import {
  isEdgeOfGrid,
  isTreeVisible,
  resolveTree,
  resolveTreeGrid,
  transposeMatrix,
} from "../day08p1 - tree-top-tree-house"
import { multiplyAll, resolveBlockingTrees } from "../day08p2 - tree-top-tree-house"
import { logObject } from "../helpers"
import { Tree } from "../types"

describe(`resolveTreeGrid()`, () => {
  it(`parses the string into a grided array format`, () => {
    const data = `30373
25512
65332
33549
35390`

    const result = [
      [3, 0, 3, 7, 3],
      [2, 5, 5, 1, 2],
      [6, 5, 3, 3, 2],
      [3, 3, 5, 4, 9],
      [3, 5, 3, 9, 0],
    ]
    expect(resolveTreeGrid(data)).toEqual(result)
  })
})

describe(`transpose()`, () => {
  it(`swaps the rows and columns around in a grid array`, () => {
    const grid = [
      [3, 0, 3, 7, 3],
      [2, 5, 5, 1, 2],
      [6, 5, 3, 3, 2],
      [3, 3, 5, 4, 9],
      [3, 5, 3, 9, 0],
    ]
    const result = [
      [3, 2, 6, 3, 3],
      [0, 5, 5, 3, 5],
      [3, 5, 3, 5, 3],
      [7, 1, 3, 4, 9],
      [3, 2, 2, 9, 0],
    ]
    expect(transposeMatrix(grid)).toEqual(result)
  })
})

describe(`resolveTree()`, () => {
  it(`returns the target tree's data`, () => {
    const forest = [
      [3, 0, 3, 7, 3],
      [2, 5, 5, 1, 2],
      [6, 5, 3, 3, 2],
      [3, 3, 5, 4, 9],
      [3, 5, 3, 9, 0],
    ]

    const tree = {
      position: [2, 3],
      height: 3,
      surroundingTreeHeights: {
        left: [6, 5, 3],
        right: [2],
        above: [7, 1],
        below: [4, 9],
      },
    }

    const result = resolveTree([2, 3], forest)
    expect(result).toEqual(tree)
  })
  it(`the tree returns height zero for the surrounding tree heights if there is no trees next to it`, () => {
    const forest = [
      [3, 0, 3, 7, 3],
      [2, 5, 5, 1, 2],
      [6, 5, 3, 3, 2],
      [3, 3, 5, 4, 9],
      [3, 5, 3, 9, 0],
    ]

    const tree = {
      position: [0, 0],
      height: 3,
      surroundingTreeHeights: {
        left: [0],
        right: [0, 3, 7, 3],
        above: [0],
        below: [2, 6, 3, 3],
      },
    }

    const result = resolveTree([0, 0], forest)
    expect(result).toEqual(tree)
  })
  it(`has option to invert left and above surrounding tree orderings to reflect the view from the tree's perspective going outwards`, () => {
    const forest = [
      [3, 0, 3, 7, 3],
      [2, 5, 5, 1, 2],
      [6, 5, 3, 3, 2],
      [3, 3, 5, 4, 9],
      [3, 5, 3, 9, 0],
    ]

    const tree = {
      position: [2, 3],
      height: 3,
      surroundingTreeHeights: {
        left: [3, 5, 6],
        right: [2],
        above: [1, 7],
        below: [4, 9],
      },
    }

    const result = resolveTree([2, 3], forest, true)
    expect(result).toEqual(tree)
  })
})

describe(`isTreeVisible()`, () => {
  it(`returns true if target tree is visible`, () => {
    const tree: Tree = {
      position: [1, 1],
      height: 5,
      surroundingTreeHeights: {
        left: [2],
        right: [5, 1, 2],
        above: [0],
        below: [5, 3, 5],
      },
    }
    expect(isTreeVisible(tree)).toEqual(true)
    const treeTwo: Tree = {
      position: [2, 1],
      height: 5,
      surroundingTreeHeights: {
        left: [6],
        right: [3, 3, 2],
        above: [5],
        below: [3, 5],
      },
    }
    expect(isTreeVisible(treeTwo)).toEqual(true)
  })
  it(`returns false if target tree is not visible`, () => {
    const tree: Tree = {
      position: [2, 2],
      height: 3,
      surroundingTreeHeights: {
        left: [6, 5],
        right: [3, 2],
        above: [3, 5],
        below: [5, 3],
      },
    }
    expect(isTreeVisible(tree)).toEqual(false)
    const treeTwo: Tree = {
      position: [3, 3],
      height: 4,
      surroundingTreeHeights: {
        left: [3, 3, 5],
        right: [9],
        above: [7, 1, 3],
        below: [9],
      },
    }
    expect(isTreeVisible(treeTwo)).toEqual(false)
  })
  it(`returns true if tree is on the edge of the grid`, () => {
    const tree: Tree = {
      position: [0, 0],
      height: 3,
      surroundingTreeHeights: {
        left: [0],
        right: [0, 3, 7, 3],
        above: [0],
        below: [2, 6, 3, 3],
      },
    }
    expect(isTreeVisible(tree)).toEqual(true)
  })
})

describe(`isEdgeOfGrid`, () => {
  it(`returns true if target element is on the edge of the grid`, () => {
    const forest = [
      [3, 0, 3, 7, 3],
      [2, 5, 5, 1, 2],
      [6, 5, 3, 3, 2],
      [3, 3, 5, 4, 9],
      [3, 5, 3, 9, 0],
    ]
    expect(isEdgeOfGrid([0, 0], forest)).toEqual(true)
    expect(isEdgeOfGrid([4, 0], forest)).toEqual(true)
    expect(isEdgeOfGrid([1, 0], forest)).toEqual(true)
    expect(isEdgeOfGrid([1, 4], forest)).toEqual(true)
    expect(isEdgeOfGrid([4, 4], forest)).toEqual(true)
    expect(isEdgeOfGrid([4, 4], forest)).toEqual(true)
    expect(isEdgeOfGrid([1, 1], forest)).toEqual(false)
    expect(isEdgeOfGrid([3, 2], forest)).toEqual(false)
    expect(isEdgeOfGrid([1, 3], forest)).toEqual(false)
  })
  it(`throws an error if the target is bigger then the grid`, () => {
    const forest = [
      [3, 0, 3, 7, 3],
      [2, 5, 5, 1, 2],
      [6, 5, 3, 3, 2],
      [3, 3, 5, 4, 9],
      [3, 5, 3, 9, 0],
    ]

    try {
      isEdgeOfGrid([5, 1], forest)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error).toHaveProperty("message", "Target row is bigger then grid row")
    }

    try {
      isEdgeOfGrid([1, 7], forest)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error).toHaveProperty("message", "Target column is bigger then grid column")
    }
  })
})

describe(`resolveBlockingtrees()`, () => {
  it(`returns an array of numbers representing the blocking trees above, below, left and right of it`, () => {
    const tree: Tree = {
      position: [1, 1],
      height: 5,
      surroundingTreeHeights: {
        left: [2],
        right: [5, 1, 2],
        above: [0],
        below: [5, 3, 5],
      },
    }

    expect(resolveBlockingTrees(tree)).toEqual([1, 1, 1, 1])

    const treeTwo: Tree = {
      position: [1, 2],
      height: 5,
      surroundingTreeHeights: {
        right: [1, 2],
        left: [5, 2],
        above: [3],
        below: [3, 5, 3],
      },
    }

    expect(resolveBlockingTrees(treeTwo)).toEqual([1, 1, 2, 2])
    const treeThree: Tree = {
      position: [3, 2],
      height: 5,
      surroundingTreeHeights: {
        right: [4, 9],
        left: [3, 3],
        above: [3, 5, 3],
        below: [3],
      },
    }

    // up, left, right, down
    expect(resolveBlockingTrees(treeThree)).toEqual([2, 2, 2, 1])
  })
})

describe(`multiply()`, () => {
  it(`multiplies all values of an array of numbers`, () => {
    expect(multiplyAll([1, 4, 6, 2])).toEqual(48)
    expect(multiplyAll([2, 8, 9, 5])).toEqual(720)
    expect(multiplyAll([44, 18, 99, 5])).toEqual(392040)
    expect(multiplyAll([9, 4, 0, 12])).toEqual(0)
  })
})
