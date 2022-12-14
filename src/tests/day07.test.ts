import { resolveFileTree } from '../day07-no-space-left'

describe(`resolveFileTree()`, () => {
  it(`uses the input data and returns a directory object`, () => {
    const commands = [
      '$ cd /',
      '$ ls',
      'dir a',
      '14848514 b.txt',
      '8504156 c.dat',
      'dir d',
      '$ cd a',
      '$ ls',
      'dir e',
      '29116 f',
      '2557 g',
      '62596 h.lst',
      '$ cd e',
      '$ ls',
      '584 i',
      '$ cd ..',
      '$ cd ..',
      '$ cd d',
      '$ ls',
      '4060174 j',
      '8033020 d.log',
      '5626152 d.ext',
      '7214296 k',
    ]
    const output = [
      {
        name: '/',
        files: [
          { name: 'b', type: 'txt', size: 14848514 },
          { name: 'c', type: 'dat', size: 8504156 },
        ],
        directories: [
          {
            name: 'a',
            files: [
              { name: 'f', type: '', size: 29116 },
              { name: 'g', type: '', size: 2557 },
              { name: 'h', type: 'lst', size: 62596 },
            ],
            directories: [
              {
                name: 'e',
                files: [{ name: 'i', type: '', size: 584 }],
                directories: [],
                level: 3,
              },
            ],
            level: 2,
          },
          {
            name: 'd',
            files: [
              { name: 'j', type: '', size: 4060174 },
              { name: 'd', type: 'log', size: 8033020 },
              { name: 'd', type: 'ext', size: 5626152 },
              { name: 'k', type: '', size: 7214296 },
            ],
          },
        ],
        level: 1,
      },
    ]

    expect(resolveFileTree(commands)).toEqual(output)
  })
})

/*
- / (dir)
  - a (dir)
    - e (dir)
      - i (file, size=584)
    - f (file, size=29116)
    - g (file, size=2557)
    - h.lst (file, size=62596)
  - b.txt (file, size=14848514)
  - c.dat (file, size=8504156)
  - d (dir)
    - j (file, size=4060174)
    - d.log (file, size=8033020)
    - d.ext (file, size=5626152)
    - k (file, size=7214296)
*/
