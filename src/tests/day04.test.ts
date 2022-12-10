import {
  checkIsAnyOverlapping,
  checkOneIsWithinAnother,
} from '../day04-camp-cleanup'

describe('checkOneIsWithinAnother()', () => {
  it('it checks if any sections are inside another', () => {
    expect(checkOneIsWithinAnother(`2-4`, `6-8`)).toBe(false)
    expect(checkOneIsWithinAnother(`2-3`, `4-5`)).toBe(false)
    expect(checkOneIsWithinAnother(`5-7`, `7-9`)).toBe(false)
    expect(checkOneIsWithinAnother(`2-8`, `3-7`)).toBe(true)
    expect(checkOneIsWithinAnother(`3-7`, `2-8`)).toBe(true)
    expect(checkOneIsWithinAnother(`2-6`, `4-8`)).toBe(false)
    expect(checkOneIsWithinAnother(`6-6`, `4-6`)).toBe(true)
    expect(checkOneIsWithinAnother(`6-5`, `6-6`)).toBe(true)
    expect(checkOneIsWithinAnother(`7-7`, `7-7`)).toBe(true)
    expect(checkOneIsWithinAnother(`70-7`, `66-67`)).toBe(true)
    expect(checkOneIsWithinAnother(`66-67`, `70-7`)).toBe(true)
  })
})
describe('checkIsAnyOverlapping()', () => {
  it('it checks if any sections overlap the other', () => {
    expect(checkIsAnyOverlapping(`6-6`, `4-6`)).toBe(true)
    expect(checkIsAnyOverlapping(`5-7`, `7-9`)).toBe(true)
    expect(checkIsAnyOverlapping(`5-7`, `6-9`)).toBe(true)
    expect(checkIsAnyOverlapping(`7-10`, `6-9`)).toBe(true)
    expect(checkIsAnyOverlapping(`7-18`, `16-99`)).toBe(true)
    expect(checkIsAnyOverlapping(`2-8`, `3-7`)).toBe(true)
    expect(checkIsAnyOverlapping(`2-6`, `4-8`)).toBe(true)
    expect(checkIsAnyOverlapping(`30-40`, `20-35`)).toBe(true)
    expect(checkIsAnyOverlapping(`30-40`, `69-80`)).toBe(false)
    expect(checkIsAnyOverlapping(`70-70`, `40-69`)).toBe(false)
    expect(checkIsAnyOverlapping(`20-25`, `26-69`)).toBe(false)
    expect(checkIsAnyOverlapping(`16-69`, `68-69`)).toBe(true)
  })
})
