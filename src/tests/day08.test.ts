import {
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
})

// describe.skip(`isTreeVisible()`, () => {
//   it(`returns true if target tree is visible`, () => {
//     const forest = [
//       [3, 0, 3, 7, 3],
//       [2, 5, 5, 1, 2],
//       [6, 5, 3, 3, 2],
//       [3, 3, 5, 4, 9],
//       [3, 5, 3, 9, 0],
//     ]
//     expect(isTreeVisible([1, 2], forest)).toEqual(true)
//   })
// })
