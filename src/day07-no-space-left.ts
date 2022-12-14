export function daySevenPartOne() {
  return 'hello'
}

interface File {
  name: string
  type?: string // can create file type later, some are empty
  size: number
}

interface Directory {
  name: string
  files: File[]
  directories: Directory[]
  level: number
}

export function resolveFileTree(commands: string[]) {
  return {}
}
