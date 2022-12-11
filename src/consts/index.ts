import { SupplyStack } from '../types'

export const alphabetrpsMatchPointsMapper: Record<string, number> = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
  A: 27,
  B: 28,
  C: 29,
  D: 30,
  E: 31,
  F: 32,
  G: 33,
  H: 34,
  I: 35,
  J: 36,
  K: 37,
  L: 38,
  M: 39,
  N: 40,
  O: 41,
  P: 42,
  Q: 43,
  R: 44,
  S: 45,
  T: 46,
  U: 47,
  V: 48,
  W: 49,
  X: 50,
  Y: 51,
  Z: 52,
} as const

export const RPSMap: Record<string, string> = {
  A: 'rock',
  B: 'paper',
  C: 'scissors',
  X: 'rock',
  Y: 'paper',
  Z: 'scissors',
} as const

export const rpsMatchPointsMap: Record<string, number> = {
  AX: 4,
  BX: 1,
  CX: 7,
  AY: 8,
  BY: 5,
  CY: 2,
  AZ: 3,
  BZ: 9,
  CZ: 6,
} as const

export const rpsResultMap: Record<string, string> = {
  X: 'lose',
  Y: 'draw',
  Z: 'win',
} as const

export const rpsStringToPointsMap: Record<string, number> = {
  rock: 1,
  paper: 2,
  scissors: 3,
  win: 6,
  draw: 3,
  lose: 0,
}

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
    crates: ['G', 'T', 'R', 'W'],
  },
  {
    stackNumber: 2,
    crates: ['G', 'C', 'H', 'P', 'M', 'S', 'V', 'W'],
  },
  {
    stackNumber: 3,
    crates: ['C', 'L', 'T', 'S', 'G', 'M'],
  },
  {
    stackNumber: 4,
    crates: ['J', 'H', 'D', 'M', 'W', 'R', 'F'],
  },
  {
    stackNumber: 5,
    crates: ['P', 'Q', 'L', 'H', 'S', 'W', 'F', 'J'],
  },
  {
    stackNumber: 6,
    crates: ['P', 'J', 'D', 'N', 'F', 'M', 'S'],
  },
  {
    stackNumber: 7,
    crates: ['Z', 'B', 'D', 'F', 'G', 'C', 'S', 'J'],
  },
  {
    stackNumber: 8,
    crates: ['R', 'T', 'B'],
  },
  {
    stackNumber: 9,
    crates: ['H', 'N', 'W', 'L', 'C'],
  },
]
export const initialSupplyStacksForUpgradedCrane: SupplyStack[] = [
  {
    stackNumber: 1,
    crates: ['G', 'T', 'R', 'W'],
  },
  {
    stackNumber: 2,
    crates: ['G', 'C', 'H', 'P', 'M', 'S', 'V', 'W'],
  },
  {
    stackNumber: 3,
    crates: ['C', 'L', 'T', 'S', 'G', 'M'],
  },
  {
    stackNumber: 4,
    crates: ['J', 'H', 'D', 'M', 'W', 'R', 'F'],
  },
  {
    stackNumber: 5,
    crates: ['P', 'Q', 'L', 'H', 'S', 'W', 'F', 'J'],
  },
  {
    stackNumber: 6,
    crates: ['P', 'J', 'D', 'N', 'F', 'M', 'S'],
  },
  {
    stackNumber: 7,
    crates: ['Z', 'B', 'D', 'F', 'G', 'C', 'S', 'J'],
  },
  {
    stackNumber: 8,
    crates: ['R', 'T', 'B'],
  },
  {
    stackNumber: 9,
    crates: ['H', 'N', 'W', 'L', 'C'],
  },
]
