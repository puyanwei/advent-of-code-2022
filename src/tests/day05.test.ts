import {
  moveStacks,
  SupplyStack,
  translateInstructions,
} from '../day05-supply-stacks'

describe(`translateInstructions()`, () => {
  it(`extracts 3 numbers from the instructions string`, () => {
    const result1 = translateInstructions(`move 5 from 3 to 4`)
    expect(result1).toEqual({
      cratesToMove: 5,
      from: 3,
      target: 4,
    })
    const result2 = translateInstructions(`move 13 from 4 to 8`)
    expect(result2).toEqual({
      cratesToMove: 13,
      from: 4,
      target: 8,
    })
    const result3 = translateInstructions(`move 4 from 7 to 4`)
    expect(result3).toEqual({
      cratesToMove: 4,
      from: 7,
      target: 4,
    })
  })
})

describe(`moveStacks()`, () => {
  it(`moves a stack according to the instructions`, () => {
    const initialSupplyStack: SupplyStack[] = [
      {
        stackNumber: 1,
        crates: ['Z', 'N'],
      },
      {
        stackNumber: 2,
        crates: ['M', 'C', 'D'],
      },
      {
        stackNumber: 3,
        crates: ['P'],
      },
    ]

    const result1 = moveStacks({
      supplyStack: initialSupplyStack,
      cratesToMove: 1,
      from: 2,
      target: 1,
    })

    expect(result1).toEqual([
      {
        stackNumber: 1,
        crates: ['Z', 'N', 'D'],
      },
      {
        stackNumber: 2,
        crates: ['M', 'C'],
      },
      {
        stackNumber: 3,
        crates: ['P'],
      },
    ])

    const result2 = moveStacks({
      supplyStack: result1,
      cratesToMove: 3,
      from: 1,
      target: 3,
    })

    expect(result2).toEqual([
      {
        stackNumber: 1,
        crates: [],
      },
      {
        stackNumber: 2,
        crates: ['M', 'C'],
      },
      {
        stackNumber: 3,
        crates: ['P', 'D', 'N', 'Z'],
      },
    ])

    const result3 = moveStacks({
      supplyStack: result2,
      cratesToMove: 2,
      from: 2,
      target: 1,
    })

    expect(result3).toEqual([
      {
        stackNumber: 1,
        crates: ['C', 'M'],
      },
      {
        stackNumber: 2,
        crates: [],
      },
      {
        stackNumber: 3,
        crates: ['P', 'D', 'N', 'Z'],
      },
    ])

    const result4 = moveStacks({
      supplyStack: result3,
      cratesToMove: 1,
      from: 1,
      target: 2,
    })

    expect(result4).toEqual([
      {
        stackNumber: 1,
        crates: ['C'],
      },
      {
        stackNumber: 2,
        crates: ['M'],
      },
      {
        stackNumber: 3,
        crates: ['P', 'D', 'N', 'Z'],
      },
    ])
  })
})

/*
[D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

 move 1 from 2 to 1
 move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
 */
