import { resolveStepObject } from "./day09-p2-rope-bridge.FAIL"

describe(`resolveStepOBject()`, () => {
  it.only(`returns the correct rope step object`, () => {
    const result = resolveStepObject({
      moveDirection: [1, 0],
      knotPositions: [],
      ropeLength: 6,
    })
    const step = {
      headMoveDirection: "right",
      knotPositions: [[1, 0]],
    }
    expect(result).toEqual(step)

    // const result2 = resolveStepObject({
    //   moveDirection: [1, 0],
    //   knotPositions: [
    //     [1, 0],
    //   ],
    // })
    // const step2 = {
    //   headMoveDirection: "right",
    //   knotPositions: [
    //     [2, 0],
    //     [1, 0],
    //     [0, 0],
    //     [0, 0],
    //     [0, 0],
    //     [0, 0],
    //   ],
    // }
    // expect(result2).toEqual(step2)

    //     // prettier-ignore
    //     const result3 = resolveStepObject({ moveDirection: [1, 0], knotPositions: [[3,0],[2,0],[1,0],[0,0],[0,0],[1,0]], ropeLength: 6 })
    //     // prettier-ignore
    //     const step3 = {
    //   headMoveDirection: 'right',
    //   knotPositions: [[2,0],[1,0],[0,0],[0,0],1,0],[1,0]]
    // }
    //     expect(result).toEqual(step3)
  })
})
