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
