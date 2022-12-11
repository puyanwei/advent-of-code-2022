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

interface SupplyStack {
  stackNumber: number
  crates: string[]
}

export function dayFivePartOne() {
  const arrayOfStacks = data.split(`\n`)
  console.log(arrayOfStacks)
}

interface Instructions {
  cratesToMove: number
  from: number
  target: number
}

export function translateInstructions(instructions: string): Instructions {
  const array = instructions.split(` `)
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

function moveStacks({ supplyStack, cratesToMove, from, target }: MoveStacks) {
  console.log(hello)
  return ''
}
