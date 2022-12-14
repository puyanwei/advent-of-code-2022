import { commands } from './consts'

export function daySevenPartOne() {
  const listings = resolveListings(commands)
  // return resolveFileTree(listings)
}

export interface File {
  name: string
  type?: string // can create file type later, some are empty
  size: number
}

export interface Directory {
  name: string
  files: File[]
  directories: Directory[]
  level: number
}

export interface Listings {
  name: string
  listing: string[]
  level: number
}

function resolveListings(commands: string) {
  const arrayByDollar = commands.split(`$ `)

  const listings = arrayByDollar.map((lines) => {
    const dir =
      getFirstWordSplittingByNewLine(lines) === `ls`
        ? getAllButLastWordSplittingByNewLine(lines)
        : []
    return {
      name: getFirstWordSplittingByNewLine(lines),
      dir,
    }
  })
  return listings
}

function getFirstWordSplittingByNewLine(string: string) {
  return string.split(`\n`)[0]
}

function getAllButLastWordSplittingByNewLine(string: string) {
  const arrayOfStrings = string.split(`\n`)
  const rest = arrayOfStrings.slice(1, arrayOfStrings.length - 1)
  return rest
}

export function resolveFileTree(commands: string[][]) {
  // command before ls is always cd
  //commands after ls are files until another $ is found

  let history: string[] = []
  let currentLevel = 0
  // let isListing = false
  // let files: string[] = []
  // let directories: string[] = []

  const fileTree = commands.map((command) => {
    console.log({ command })
    // // Resolve directory name
    //   const directoryName = resolveDirectoryName(command, history)
    //   if (!directoryName) return null
    //   history.push(directoryName)

    //   // Resolve directory nesting level
    //   if (command === `$ cd ..`) currentLevel--
    //   if (command.includes(`$ cd`) && command !== `$ cd ..`) currentLevel++
    //   return {
    //     name: directoryName,
    //     //   files,
    //     //   directories,
    //     level: currentLevel,
    //   }
  })
  // console.log(listings, { maxArrayLength: null })
  return {}
}

// export function resolveDirectoryName(
//   command: string[],
//   history: string[]
// ): string {
//   const commands = command.split(` `)
//   const isTopLevel = history.at(0) === history.at(-1)

//   if (commands.at(0) !== `$`) return command
//   if (commands.at(1) !== `cd`) return command

//   if (commands.at(2) === `..` && isTopLevel) {
//     console.warn(`cannot go a level higher in directory`)
//     return command
//   }
//   if (commands.at(2) === `..` && !isTopLevel) {
//     return history.at(-2) as string
//   }
//   const directoryName = commands.slice(2, commands.length).join(' ')
//   return directoryName
// }

/* first attempt
    // // Resolve directory name
    // const directoryName = resolveDirectoryName(command, history)
    // if (!directoryName) return null
    // history.push(directoryName)

    // // Resolve directory nesting level
    // if (command === `$ cd ..`) currentLevel--
    // if (command.includes(`$ cd`) && command !== `$ cd ..`) currentLevel++

    // console.log({ command })
    // // Resolve files and directories arrays
    // if (command === `$ ls`) {
    //   console.log(1111)
    //   isListing === true
    // }
    // if (isListing && !command.includes(`$`) && command.includes(`dir`)) {
    //   console.log(1233)
    //   directories.push(command)
    //   return
    // }
    // if (isListing && !command.includes(`$`)) {
    //   files.push(command)
    //   return
    // }
    // if (isListing && command.includes(`$`)) {
    //   isListing = false
    //   directories.push()
    //   return
    // }
    */
