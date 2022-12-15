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

export type RPS = 'rock' | 'paper' | 'scissors'
export type Outcome = 'win' | 'lose' | 'draw'

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
  name: string
  type?: string // can create file type later, some are empty
  size: number
}

export interface Directory {
  name: string
  files: File[]
  directories: Directory[]
  level: number
}

export interface Command {
  command: string
  dir?: string[]
}
