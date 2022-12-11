import { initialSupplyStacks } from './consts'
import { data } from './data/stacks'

export interface SupplyStack {
  stackNumber: number
  crates: string[]
}

export function dayFivePartOne() {
  let supplyStack = initialSupplyStacks
  let count = 0
  const arrayOfInstructions = data.split(`\n`)
  arrayOfInstructions.forEach((instruction) => {
    count++
    const translatedInstructions = translateInstructions(instruction)
    supplyStack = moveStacks({ supplyStack, ...translatedInstructions })
    console.log({ count })
    console.log(supplyStack, { maxArrayLength: null })
  })
  const cratesOnTopOfStacks = supplyStack
    .map((stack) => stack.crates.at(-1))
    .join(``)
  return cratesOnTopOfStacks
}

interface Instructions {
  cratesToMove: number
  from: number
  target: number
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

interface MoveStacks extends Instructions {
  supplyStack: SupplyStack[]
}

export function moveStacks({
  supplyStack,
  cratesToMove,
  from,
  target,
}: MoveStacks) {
  const startingStack = supplyStack[from - 1]
  // if (startingStack.crates.length === 0)
  //   throw Error(`Attempting to splice empty array`)
  const splicedCrates = startingStack.crates.splice(
    startingStack.crates.length - cratesToMove,
    cratesToMove
  )
  supplyStack[target - 1].crates.push(...splicedCrates.reverse())

  return supplyStack
}
