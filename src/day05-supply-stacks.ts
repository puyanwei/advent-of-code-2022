import {
  initialSupplyStacks,
  initialSupplyStacksForUpgradedCrane,
} from './consts'
import { data } from './data/stacks'
import { Instructions, MoveStacks } from './types'

export function dayFivePartOne() {
  let supplyStack = initialSupplyStacks
  const arrayOfInstructions = data.split(`\n`)
  arrayOfInstructions.forEach((instruction) => {
    const translatedInstructions = translateInstructions(instruction)
    supplyStack = moveStacks({ supplyStack, ...translatedInstructions })
  })
  const cratesOnTopOfStacks = supplyStack
    .map((stack) => stack.crates.at(-1))
    .join(``)
  return cratesOnTopOfStacks
}

export function dayFivePartTwo() {
  let supplyStack = initialSupplyStacksForUpgradedCrane
  let count = 0
  const arrayOfInstructions = data.split(`\n`)
  arrayOfInstructions.forEach((instruction) => {
    const translatedInstructions = translateInstructions(instruction)
    supplyStack = moveStacks({
      supplyStack,
      hasReversedStacking: false,
      ...translatedInstructions,
    })
  })

  const cratesOnTopOfStacks = supplyStack
    .map((stack) => stack.crates.at(-1))
    .join(``)
  return cratesOnTopOfStacks
}

export function translateInstructions(instruction: string): Instructions {
  const array = instruction.split(` `)
  const cratesToMove = parseInt(array[1])
  const from = parseInt(array[3])
  const target = parseInt(array[5])
  return {
    cratesToMove,
    from,
    target,
  }
}

export function moveStacks({
  supplyStack,
  cratesToMove,
  from,
  target,
  hasReversedStacking = true,
}: MoveStacks) {
  const startingStack = supplyStack[from - 1]
  const splicedCrates = startingStack.crates.splice(
    startingStack.crates.length - cratesToMove,
    cratesToMove
  )
  const movingStack = hasReversedStacking
    ? splicedCrates.reverse()
    : splicedCrates
  supplyStack[target - 1].crates.push(...movingStack)

  return supplyStack
}
