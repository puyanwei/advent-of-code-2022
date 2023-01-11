import { Command, Directory, File, SupplyStack } from "../types"

export const moveDirectoryResult = [
  {
    headMoveDirection: "right",
    currentPosition: {
      head: [1, 0],
      tail: [0, 0],
    },
  },
  {
    headMoveDirection: "right",
    currentPosition: {
      head: [2, 0],
      tail: [1, 0],
    },
  },
  {
    headMoveDirection: "right",
    currentPosition: {
      head: [3, 0],
      tail: [2, 0],
    },
  },
  {
    headMoveDirection: "right",
    currentPosition: {
      head: [4, 0],
      tail: [3, 0],
    },
  },
  {
    headMoveDirection: "up",
    currentPosition: {
      head: [4, 1],
      tail: [3, 0],
    },
  },
  {
    headMoveDirection: "up",
    currentPosition: {
      head: [4, 2],
      tail: [4, 1],
    },
  },
  {
    headMoveDirection: "up",
    currentPosition: {
      head: [4, 3],
      tail: [4, 2],
    },
  },
  {
    headMoveDirection: "up",
    currentPosition: {
      head: [4, 4],
      tail: [4, 3],
    },
  },
  {
    headMoveDirection: "left",
    currentPosition: {
      head: [3, 4],
      tail: [4, 3],
    },
  },
  {
    headMoveDirection: "left",
    currentPosition: {
      head: [2, 4],
      tail: [3, 4],
    },
  },
  {
    headMoveDirection: "left",
    currentPosition: {
      head: [1, 4],
      tail: [2, 4],
    },
  },
  {
    headMoveDirection: "down",
    currentPosition: {
      head: [1, 3],
      tail: [2, 4],
    },
  },
  {
    headMoveDirection: "right",
    currentPosition: {
      head: [2, 3],
      tail: [2, 4],
    },
  },
  {
    headMoveDirection: "right",
    currentPosition: {
      head: [3, 3],
      tail: [2, 4],
    },
  },
  {
    headMoveDirection: "right",
    currentPosition: {
      head: [4, 3],
      tail: [3, 3],
    },
  },
  {
    headMoveDirection: "right",
    currentPosition: {
      head: [5, 3],
      tail: [4, 3],
    },
  },
  {
    headMoveDirection: "down",
    currentPosition: {
      head: [5, 2],
      tail: [4, 3],
    },
  },
  {
    headMoveDirection: "left",
    currentPosition: {
      head: [4, 2],
      tail: [4, 3],
    },
  },
  {
    headMoveDirection: "left",
    currentPosition: {
      head: [3, 2],
      tail: [4, 3],
    },
  },
  {
    headMoveDirection: "left",
    currentPosition: {
      head: [2, 2],
      tail: [3, 2],
    },
  },
  {
    headMoveDirection: "left",
    currentPosition: {
      head: [1, 2],
      tail: [2, 2],
    },
  },
  {
    headMoveDirection: "left",
    currentPosition: {
      head: [0, 2],
      tail: [1, 2],
    },
  },
  {
    headMoveDirection: "right",
    currentPosition: {
      head: [1, 2],
      tail: [1, 2],
    },
  },
  {
    headMoveDirection: "right",
    currentPosition: {
      head: [2, 2],
      tail: [1, 2],
    },
  },
]

/* Starting crate stack positions
    [W]         [J]     [J]        
    [V]     [F] [F] [S] [S]        
    [S] [M] [R] [W] [M] [C]        
    [M] [G] [W] [S] [F] [G]     [C]
[W] [P] [S] [M] [H] [N] [F]     [L]
[R] [H] [T] [D] [L] [D] [D] [B] [W]
[T] [C] [L] [H] [Q] [J] [B] [T] [N]
[G] [G] [C] [J] [P] [P] [Z] [R] [H]
 1   2   3   4   5   6   7   8   9 
*/

export const initialSupplyStacks: SupplyStack[] = [
  {
    stackNumber: 1,
    crates: ["G", "T", "R", "W"],
  },
  {
    stackNumber: 2,
    crates: ["G", "C", "H", "P", "M", "S", "V", "W"],
  },
  {
    stackNumber: 3,
    crates: ["C", "L", "T", "S", "G", "M"],
  },
  {
    stackNumber: 4,
    crates: ["J", "H", "D", "M", "W", "R", "F"],
  },
  {
    stackNumber: 5,
    crates: ["P", "Q", "L", "H", "S", "W", "F", "J"],
  },
  {
    stackNumber: 6,
    crates: ["P", "J", "D", "N", "F", "M", "S"],
  },
  {
    stackNumber: 7,
    crates: ["Z", "B", "D", "F", "G", "C", "S", "J"],
  },
  {
    stackNumber: 8,
    crates: ["R", "T", "B"],
  },
  {
    stackNumber: 9,
    crates: ["H", "N", "W", "L", "C"],
  },
]
export const initialSupplyStacksForUpgradedCrane: SupplyStack[] = [
  {
    stackNumber: 1,
    crates: ["G", "T", "R", "W"],
  },
  {
    stackNumber: 2,
    crates: ["G", "C", "H", "P", "M", "S", "V", "W"],
  },
  {
    stackNumber: 3,
    crates: ["C", "L", "T", "S", "G", "M"],
  },
  {
    stackNumber: 4,
    crates: ["J", "H", "D", "M", "W", "R", "F"],
  },
  {
    stackNumber: 5,
    crates: ["P", "Q", "L", "H", "S", "W", "F", "J"],
  },
  {
    stackNumber: 6,
    crates: ["P", "J", "D", "N", "F", "M", "S"],
  },
  {
    stackNumber: 7,
    crates: ["Z", "B", "D", "F", "G", "C", "S", "J"],
  },
  {
    stackNumber: 8,
    crates: ["R", "T", "B"],
  },
  {
    stackNumber: 9,
    crates: ["H", "N", "W", "L", "C"],
  },
]

export const commands = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`

export const trees = `30373
25512
65332
33549
35390`

export const treeGridScanDirection: string[] = ["above", "left", "right", "below"]

export const directions = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`
