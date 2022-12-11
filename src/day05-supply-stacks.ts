import { initialSupplyStacks } from './consts'
import { data } from './data/stacks'

/* 
Starting crates positions
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

export interface SupplyStack {
  stackNumber: number
  crates: string[]
}

export function dayFivePartOne() {
  let supplyStack = initialSupplyStacks
  const arrayOfInstructions = data.split(`\n`)
  arrayOfInstructions.forEach((instruction) => {
    const translatedInstructions = translateInstructions(instruction)
    supplyStack = moveStacks({ supplyStack, ...translatedInstructions })
  })
  console.log(supplyStack)
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

interface moveStacks extends Instructions {
  supplyStack: SupplyStack[]
}

export function moveStacks({
  supplyStack,
  cratesToMove,
  from,
  target,
}: moveStacks) {
  console.log({ supplyStack, cratesToMove, from, target })
  return supplyStack
}
