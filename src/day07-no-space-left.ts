import { commands } from './consts'
import { Command } from './types'

export function daySevenPartOne() {
  const listings = resolveCommands(commands)
  console.log({ listings })
  return resolveFileTree(listings)
}

// Reorganise data to include an array for ls command list of files
function resolveCommands(commands: string): Command[] {
  const arrayByDollar = commands.split(`$ `)
  // First element is empty for some reason
  const resolvedArrayByDoller = arrayByDollar.filter((_, index) => index !== 0)
  const commandsWithListings: Command[] = resolvedArrayByDoller.map((lines) => {
    const command = getFirstWord(lines, `\n`)
    const dir =
      getFirstWord(lines, `\n`) === `ls` ? getAllButLastWord(lines, `\n`) : []

    if (getFirstWord(lines, `\n`) === `ls`)
      return {
        command,
        dir,
      }
    return { command }
  })
  return commandsWithListings
}

export function resolveFileTree(commands: Command[]) {
  let history: string[] = []
  let currentLevel = 0

  const fileTree = commands.map((command) => {
    const directoryName = resolveDirectoryName(command, history)
    // if (!directoryName) return null
    // history.push(directoryName)

    // // Resolve directory nesting level
    // if (command === `$ cd ..`) currentLevel--
    // if (command.includes(`$ cd`) && command !== `$ cd ..`) currentLevel++
    // return {
    //   name: directoryName,
    //   //   files,
    //   //   directories,
    //   level: currentLevel,
    // }
  })
  return fileTree
}

export function resolveDirectoryName({ command }: Command, history: string[]) {
  const isTopLevel = history.at(0) === history.at(-1)
  const [firstWord, secondWord] = command.split(` `)
  if (command === `ls`) return
  if (firstWord !== `cd`) return
  if (secondWord === `..` && isTopLevel) {
    console.warn(`cannot go a level higher in directory`)
    return
  }
  if (secondWord === `..` && !isTopLevel) {
    return history.at(-2) as string
  }
  return getAllButLastWord(command, ' ')
}

function getFirstWord(string: string, splitCondition: string) {
  return string.split(splitCondition)[0]
}

function getAllButLastWord(string: string, splitCondition: string) {
  const arrayOfStrings = string.split(splitCondition)
  const rest = arrayOfStrings.slice(1, arrayOfStrings.length).join(' ')
  return rest
}
