import {
  getCharacters,
  resolveMarker,
  resolveMarkerMessages,
} from '../day06-tuning-trouble'

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

describe(`resolveMarkerMessages()`, () => {
  it.only(`returns the character number once it finds the first marker`, () => {
    expect(
      resolveMarkerMessages({
        string: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
      })
    ).toEqual(19)
    expect(
      resolveMarkerMessages({ string: `bvwbjplbgvbhsrlpgdmjqwftvncz` })
    ).toEqual(23)
    expect(
      resolveMarkerMessages({ string: `nppdvjthqldpwncqszvftbrmjlhg` })
    ).toEqual(23)
    expect(
      resolveMarkerMessages({ string: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg` })
    ).toEqual(29)
    expect(
      resolveMarkerMessages({ string: `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw` })
    ).toEqual(26)
  })
  it(`returns zero if no found marker`, () => {
    expect(
      resolveMarkerMessages({
        string: `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`,
      })
    ).toEqual(0)
  })
})
