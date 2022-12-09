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

export interface RPSMatch {
  hero: RPS
  opponent: RPS
  score: number
}
