import {
  Tree,
  isTreeVisible,
  resolveTree,
  resolveTreeGrid,
  transpose,
} from "../day08- tree-top-tree-house"
import { logObject } from "../helpers"

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
    expect(transpose(grid)).toEqual(result)
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
  it(`returns the zero for the surrounding tree heights if there is no trees next to it`, () => {
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
})

describe(`isTreeVisible()`, () => {
  it(`returns true if target tree is visible`, () => {
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
  })
})
