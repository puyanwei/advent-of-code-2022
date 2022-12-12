import { getFourCharacters, resolveMarker } from '../day06-tuning-trouble'

describe(`getFourCharacters()`, () => {
  it(`returns four characters from a string`, () => {
    expect(getFourCharacters(`bvwbjplbgvbhsrlpgdmjqwftvncz`, 3)).toEqual(`bjpl`)
    expect(getFourCharacters(`nppdvjthqldpwncqszvftbrmjlhg`, 0)).toEqual(`nppd`)
    expect(getFourCharacters(`nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`, 15)).toEqual(
      `wmzd`
    )
    expect(getFourCharacters(`zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`, 26)).toEqual(
      `scgv`
    )
  })
})

describe(`resolveMarker()`, () => {
  it(`returns the character number once it finds the first marker`, () => {
    expect(resolveMarker({ string: `bvwbjplbgvbhsrlpgdmjqwftvncz` })).toEqual(5)
    expect(resolveMarker({ string: `nppdvjthqldpwncqszvftbrmjlhg` })).toEqual(6)
    expect(
      resolveMarker({ string: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg` })
    ).toEqual(10)
    expect(
      resolveMarker({ string: `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw` })
    ).toEqual(11)
  })
  it(`returns zero if no found marker`, () => {
    expect(resolveMarker({ string: `aaaaaaaaaaaaaaaaaaaaaa` })).toEqual(0)
  })
})
