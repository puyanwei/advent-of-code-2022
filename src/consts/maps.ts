import { DirectionNumber } from "../types"

export const directionMap: Record<string, [DirectionNumber, DirectionNumber]> = {
  U: [0, 1],
  D: [0, -1],
  L: [-1, 0],
  R: [1, 0],
}

export const coordsToDirMap: Record<string, string> = {
  "[0,1]": `up`,
  "[0,-1]": `down`,
  "[-1,0]": `left`,
  "[1,0]": `right`,
}

// how the tail moves relative to head position. From top left to bottom right. Corners with a 1 gap shouldn't be possible. Those diagonally touching head has 2 outcomes so not including it in this map

export const tailsToHeadsCoordsMap = {
  "[-2,1]": [1, -1],
  "[-2,0]": [1, 0],
  "[-2,-1]": [1, 1],

  "[-1,2]": [1, -1],
  "[-1,1]": [0, 0],
  "[-1,0]": [0, 0],
  "[-1,-1]": [0, 0],
  "[-1,-2]": [1, 1],

  "[0,2]": [0, -1],
  "[0,1]": [0, 0],
  "[0,0]": [0, 0],
  "[0,-1]": [0, 0],
  "[0,-2]": [0, 1],

  "[1,2]": [-1, -1],
  "[1,1]": [0, 0],
  "[1,0]": [0, 0],
  "[1,-1]": [0, 0],
  "[1,-2]": [-1, 1],

  "[2,1]": [-1, -1],
  "[2,0]": [-1, 0],
  "[2,-1]": [-1, 1],
} as const

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
  A: "rock",
  B: "paper",
  C: "scissors",
  X: "rock",
  Y: "paper",
  Z: "scissors",
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
  X: "lose",
  Y: "draw",
  Z: "win",
} as const

export const rpsStringToPointsMap: Record<string, number> = {
  rock: 1,
  paper: 2,
  scissors: 3,
  win: 6,
  draw: 3,
  lose: 0,
}
