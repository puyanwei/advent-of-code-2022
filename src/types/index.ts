import { directionMap, tailsToHeadsCoordsMap } from "../consts/maps"

export interface ElfInventory {
  elfNumber: number
  food: number[]
  total: number
}

export interface RuckSack {
  leftCompartment: string
  rightCompartment: string
  duplicateLetter: string
}

export interface RuckSackTeams {
  team: string[]
  authenticitySticker: string
}

export type RPS = "rock" | "paper" | "scissors"
export type Outcome = "win" | "lose" | "draw"

export interface RPSMatch {
  hero: RPS
  opponent: RPS
  score: number
}

export interface Sections {
  firstSection: string
  secondSection: string
  isOverlapping: boolean
}

export interface ResolveSection {
  sections: string[]
  anyOverlap?: boolean
}

export interface SupplyStack {
  stackNumber: number
  crates: string[]
}

export interface Instructions {
  cratesToMove: number
  from: number
  target: number
}

export interface MoveStacks extends Instructions {
  supplyStack: SupplyStack[]
  hasReversedStacking?: boolean
}
export interface ResolveMarker {
  string: string
  wordLength: number
  count?: number
}

export interface File {
  fileName: string
  size: number | "unknown"
  type: "folder" | "file"
}

export interface Directory {
  directoryName: string
  files: File[]
  totalSize: number | "unknown"
  level: number
}

export interface Command {
  command: string
  dir?: File[]
}

export type Position = [number, number]
export type Grid = number[][]
export type Directions = "above" | "below" | "left" | "right"
export interface SurroundingTreeHeights {
  above: number[]
  right: number[]
  below: number[]
  left: number[]
}
export interface Tree {
  position: Position
  height: number
  surroundingTreeHeights: SurroundingTreeHeights
}

export type TreeHeights = {
  [Property in Directions]: number[]
}

export type DirectionAbr = "U" | "D" | "L" | "R"
export type DirectionNumber = 0 | 1 | -1
export type DirectionMap = Record<DirectionAbr, [DirectionNumber, DirectionNumber]>
export type Move = [DirectionNumber, DirectionNumber]

export interface Rope {
  head: Position[]
  tail: Position[]
}

export type TailsToHeadsCoordsMapKey = keyof typeof tailsToHeadsCoordsMap
export type MoveDirection = "up" | "down" | "left" | "right" | "none"

export interface Step {
  moveDirection: MoveDirection
  currentPosition: {
    head: Position
    tail: Position
  }
}

export interface ResolveTailPosition {
  tailPosition: Position
  headPosition: Position
  moveDirection: MoveDirection
}
