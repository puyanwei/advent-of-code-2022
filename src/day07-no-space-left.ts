import { commands } from './consts'
import { Command, File } from './types'

export function daySevenPartOne() {
  const listings = resolveCommands(commands)
  listings.forEach((listing) => console.log(listing))

  // return resolveFileTree(listings)
}

export function resolveFileTree(commands: Command[]) {
  let history: string[] = []
  let currentLevel = 0
  const fileTree = commands.map((command) => {
    const directoryName = resolveDirectoryName(command, history)
    // if (!directoryName) return null
    // history.push(directoryName)

    // Resolve directory nesting level
    // if (command === `$ cd ..`) currentLevel--
    // if (command.includes(`$ cd`) && command !== `$ cd ..`) currentLevel++
    return {
      name: directoryName,
      //   files,
      //   directories,
      level: currentLevel,
    }
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

// Reorganise data to include an array for ls command list of files
function resolveCommands(commands: string) {
  const arrayByDollar = commands.split(`$ `)
  // First element is empty for some reason
  const resolvedArrayByDoller = arrayByDollar.filter((_, index) => index !== 0)
  const commandsWithListings = resolvedArrayByDoller.map((lines) => {
    const command = getFirstWord(lines, `\n`)
    return getFirstWord(lines, `\n`) === `ls`
      ? {
          command,
          dir: createFilesArray(lines),
        }
      : { command }
  })
  return commandsWithListings
}

export function createFilesArray(lines: string) {
  const groupedFiles = lines.split('\n')
  const trimmedGroupFiles = groupedFiles.filter(
    (fileInfo, index) => index !== 0 && index !== groupedFiles.length - 1
  )
  const files: File[] = trimmedGroupFiles.map((file) => {
    const [fileData] = file.split(`\n`)
    const [resolvedSize, fileName] = fileData.split(` `)
    const hasFileType = fileName.includes('.')

    const name = resolveFileName(fileData, fileName, hasFileType)
    const type = resolveFileType(fileData, fileName, hasFileType)
    const size = parseInt(resolvedSize) | 0
    return { name, type, size }
  })
  return files
}

function resolveFileType(
  fileData: string,
  fileName: string,
  hasFileType: boolean
) {
  if (!!hasFileType) return fileName.split(`.`)[1]
  if (fileData.includes('dir')) return 'dir'
  return ''
}

function resolveFileName(
  fileData: string,
  fileName: string,
  hasFileType: boolean
) {
  if (fileData.includes('dir')) return fileData
  if (hasFileType) return fileName.split(`.`)[0]
  return fileName
}

function getFirstWord(string: string, splitCondition: string) {
  return string.split(splitCondition)[0]
}

function getAllButLastWord(string: string, splitCondition: string) {
  const arrayOfStrings = string.split(splitCondition)
  const rest = arrayOfStrings.slice(1, arrayOfStrings.length).join(' ')
  return rest
}
