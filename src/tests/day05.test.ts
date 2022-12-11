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
    const result = moveStacks({
      supplyStack: initialSupplyStack,
      cratesToMove: 1,
      from: 2,
      target: 1,
    })
    expect(result).toEqual({
      supplyStack: [
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
      ],
    })
  })
})

/*
[D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 
 */
