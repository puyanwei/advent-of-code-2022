import { getCharacters, resolveMarker } from '../day06-tuning-trouble'

describe(`getFourCharacters()`, () => {
  it(`returns four characters from a string`, () => {
    expect(getCharacters(`bvwbjplbgvbhsrlpgdmjqwftvncz`, 3, 4)).toEqual(`bjpl`)
    expect(getCharacters(`nppdvjthqldpwncqszvftbrmjlhg`, 0, 4)).toEqual(`nppd`)
    expect(getCharacters(`nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`, 15, 4)).toEqual(
      `wmzd`
    )
    expect(getCharacters(`zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`, 26, 4)).toEqual(
      `scgv`
    )
  })
})

describe(`resolveMarker() with 4 characters`, () => {
  it(`returns the character number once it finds the first marker`, () => {
    expect(
      resolveMarker({ string: `bvwbjplbgvbhsrlpgdmjqwftvncz`, wordLength: 4 })
    ).toEqual(5)
    expect(
      resolveMarker({ string: `nppdvjthqldpwncqszvftbrmjlhg`, wordLength: 4 })
    ).toEqual(6)
    expect(
      resolveMarker({
        string: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`,
        wordLength: 4,
      })
    ).toEqual(10)
    expect(
      resolveMarker({
        string: `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`,
        wordLength: 4,
      })
    ).toEqual(11)
  })
  it(`returns zero if no found marker`, () => {
    expect(
      resolveMarker({ string: `aaaaaaaaaaaaaaaaaaaaaa`, wordLength: 4 })
    ).toEqual(0)
  })
})

describe(`resolveMarker() part 2 with 14 characters`, () => {
  it.only(`returns the character number once it finds the first marker`, () => {
    expect(
      resolveMarker({
        string: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
        wordLength: 14,
      })
    ).toEqual(19)
    expect(
      resolveMarker({ string: `bvwbjplbgvbhsrlpgdmjqwftvncz`, wordLength: 14 })
    ).toEqual(23)
    expect(
      resolveMarker({ string: `nppdvjthqldpwncqszvftbrmjlhg`, wordLength: 14 })
    ).toEqual(23)
    expect(
      resolveMarker({
        string: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`,
        wordLength: 14,
      })
    ).toEqual(29)
    expect(
      resolveMarker({
        string: `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`,
        wordLength: 14,
      })
    ).toEqual(26)
  })
  it(`returns zero if no found marker`, () => {
    expect(
      resolveMarker({
        string: `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`,
        wordLength: 14,
      })
    ).toEqual(0)
  })
})
