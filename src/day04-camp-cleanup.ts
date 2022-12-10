import { data } from './data/camp'
import { ResolveSection, Sections } from './types'

export function dayFourPartOne() {
  const arrayOfSections = data.split(`\n`)
  const sections = resolveSections({ sections: arrayOfSections })
  const numberOfOverlaps = sections.filter(
    ({ isOverlapping }) => !!isOverlapping
  ).length
  return numberOfOverlaps
}

export function dayFourPartTwo() {
  const arrayOfSections = data.split(`\n`)
  const sections = resolveSections({
    sections: arrayOfSections,
    anyOverlap: true,
  })
  const numberOfOverlaps = sections.filter(
    ({ isOverlapping }) => !!isOverlapping
  ).length
  return numberOfOverlaps
}

function resolveSections({
  sections,
  anyOverlap = false,
}: ResolveSection): Sections[] {
  return sections.map((section) => {
    const sectionIds = section.split(`,`)
    const [firstSection, secondSection] = sectionIds
    const isOverlapping = anyOverlap
      ? checkIsAnyOverlapping(firstSection, secondSection)
      : checkOneIsWithinAnother(firstSection, secondSection)
    return {
      firstSection,
      secondSection,
      isOverlapping,
    }
  })
}

export function checkOneIsWithinAnother(
  first: string,
  second: string
): boolean {
  const firstSection = first.split(`-`)
  const secondSection = second.split(`-`)
  const sectionIds = [...firstSection, ...secondSection]
  const [firstLow, firstHigh, secondLow, secondHigh] = sectionIds.map(
    (sectionId) => parseInt(sectionId)
  )
  // If all sectionIds are the same
  if (
    firstLow === firstHigh &&
    secondLow === secondHigh &&
    firstHigh === secondHigh
  )
    return true
  if (firstLow <= secondLow && firstHigh >= secondHigh) return true
  if (firstLow >= secondLow && firstHigh <= secondHigh) return true
  return false
}

export function checkIsAnyOverlapping(first: string, second: string): boolean {
  const firstSection = first.split(`-`)
  const secondSection = second.split(`-`)
  const sectionIds = [...firstSection, ...secondSection]
  const [firstLow, firstHigh, secondLow, secondHigh] = sectionIds.map(
    (sectionId) => parseInt(sectionId)
  )
  // check duplicate numbers
  if (firstLow === secondLow) return true
  if (firstLow === secondHigh) return true
  if (firstHigh === secondLow) return true
  if (firstHigh === secondHigh) return true

  // same numbers in a section eg 30-30
  if (firstLow === firstHigh && firstLow < secondLow && firstLow < secondHigh)
    return false
  if (firstLow === firstHigh && firstLow > secondLow && firstLow > secondHigh)
    return false

  // falseys
  if (
    firstLow < secondLow &&
    firstHigh < secondHigh &&
    firstLow < secondHigh &&
    firstHigh < secondLow
  )
    return false
  if (
    firstLow > secondLow &&
    firstHigh > secondHigh &&
    firstLow > secondHigh &&
    firstHigh > secondLow
  )
    return false

  // one is inside another
  if (firstLow <= secondLow && firstHigh >= secondHigh) return true
  if (firstLow >= secondLow && firstHigh <= secondHigh) return true

  // head of first is inside second
  if (firstLow < secondLow && firstHigh < secondHigh) return true
  // tail of first is inside second
  if (firstLow > secondLow && firstHigh < secondHigh) return true
  // head of second is inside first
  if (firstLow > secondLow && firstHigh > secondHigh) return true
  // tail of second is inside first
  if (firstLow < secondLow && firstHigh < secondHigh) return true
  return false
}
