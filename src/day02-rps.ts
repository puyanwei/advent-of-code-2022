import {
  RPSMap,
  rpsMatchPointsMap,
  rpsResultMap,
  rpsStringToPointsMap,
} from './consts'
import { data } from './data/rps'
import { RPSMatch, RPS, Outcome } from './types'

export function dayTwoPartOne() {
  const groupByNewLine = data.split('\n')
  const rpsMatches = resolveRPSMatches(groupByNewLine)
  const totalScore = rpsMatches.reduce((acc, curr) => (acc += curr.score), 0)
  return totalScore
}

export function dayTwoPartTwo() {
  const groupByNewLine = data.split('\n')
  const rpsMatches = resolveRPSMatchesByGameResult(groupByNewLine)
  const totalScore = rpsMatches.reduce((acc, curr) => (acc += curr.score), 0)
  return totalScore
}

function resolveRPSMatches(array: string[]): RPSMatch[] {
  return array.map((match) => {
    const tuple: string[] = match.split(` `)
    const [opponent, hero] = tuple
    const points = tuple.join('')

    return {
      hero: RPSMap[hero] as RPS,
      opponent: RPSMap[opponent] as RPS,
      score: rpsMatchPointsMap[points],
    }
  })
}

function resolveRPSMatchesByGameResult(array: string[]) {
  return array.map((match) => {
    const tuple: string[] = match.split(` `)
    const [providedOpponent, providedHero] = tuple

    const matchResult = rpsResultMap[providedHero] as Outcome
    const hero = getChoiceFromOpponentAndResult(
      RPSMap[providedOpponent] as RPS,
      matchResult
    )
    const opponent = RPSMap[providedOpponent] as RPS
    const score = rpsStringToPointsMap[hero] + rpsStringToPointsMap[matchResult]

    return {
      hero,
      opponent,
      score,
      result: matchResult,
    }
  })
}

function getChoiceFromOpponentAndResult(
  opponent: RPS,
  outcome: Outcome
): RPS | '' {
  if (outcome === 'draw') return opponent
  if (outcome === 'win' && opponent === 'rock') return 'paper'
  if (outcome === 'lose' && opponent === 'rock') return 'scissors'
  if (outcome === 'win' && opponent === 'paper') return 'scissors'
  if (outcome === 'lose' && opponent === 'paper') return 'rock'
  if (outcome === 'win' && opponent === 'scissors') return 'rock'
  if (outcome === 'lose' && opponent === 'scissors') return 'paper'
  return ''
}
