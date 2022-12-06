console.log(123)

interface Test {
  a: string
  b: number
}

const test: Test = {
  a: '123',
  b: 123,
}

console.log({ test, hello: '123' })
