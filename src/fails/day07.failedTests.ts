// import { dirReferences, listings } from '../consts'
// import {
//   createFilesArray,
//   resolveDirectoryName,
//   resolveFileTree,
// } from '../day07-no-space-left.FAIL'

// describe.skip(`resolveFileTree()`, () => {
//   it(`uses the input data and returns a directory object`, () => {

//     Exmample dataset
// - / (dir)
//   - a (dir)
//     - e (dir)
//       - i (file, size=584)
//     - f (file, size=29116)
//     - g (file, size=2557)
//     - h.lst (file, size=62596)
//   - b.txt (file, size=14848514)
//   - c.dat (file, size=8504156)
//   - d (dir)
//     - j (file, size=4060174)
//     - d.log (file, size=8033020)
//     - d.ext (file, size=5626152)
//     - k (file, size=7214296)

//     const output = [
//       {
//         name: '/',
//         files: [
//           { name: 'b', type: 'txt', size: 14848514 },
//           { name: 'c', type: 'dat', size: 8504156 },
//         ],
//         directories: [
//           {
//             name: 'a',
//             files: [
//               { name: 'f', type: '', size: 29116 },
//               { name: 'g', type: '', size: 2557 },
//               { name: 'h', type: 'lst', size: 62596 },
//             ],
//             directories: [
//               {
//                 name: 'e',
//                 files: [{ name: 'i', type: '', size: 584 }],
//                 level: 3,
//               },
//             ],
//             level: 2,
//           },
//           {
//             name: 'd',
//             files: [
//               { name: 'j', type: '', size: 4060174 },
//               { name: 'd', type: 'log', size: 8033020 },
//               { name: 'd', type: 'ext', size: 5626152 },
//               { name: 'k', type: '', size: 7214296 },
//             ],
//           },
//         ],
//         level: 1,
//       },
//     ]

//     expect(resolveFileTree(listings, dirReferences)).toEqual(output)
//   })
// })

// describe(`resolveDirectoryName()`, () => {
//   it(`it returns the directory name from the command`, () => {
//     const result = resolveDirectoryName(`cd documents`, [`documents`])
//     expect(result).toEqual(`documents`)
//   })
//   it(`it returns the directory name if it has a space from the command`, () => {
//     const result = resolveDirectoryName(`cd My Documents`, [`My Documents`])
//     expect(result).toEqual(`My Documents`)
//   })
//   it(`it returns the directory from a level above if command is 'cd ..'`, () => {
//     const result = resolveDirectoryName(`cd ..`, [
//       'D:/',
//       'My Pictures',
//       'Holiday in Greece',
//     ])
//     expect(result).toEqual(`My Pictures`)
//   })
//   it(`it returns undefined and console.warns an error if command is 'cd ..' when it is at the top level`, () => {
//     const result = resolveDirectoryName(`cd ..`, ['D:/', 'My Pictures', 'D:/'])
//     expect(result).toEqual(undefined)
//   })
// })

// describe(`createFilesArray()`, () => {
//   it(`returns a file object when a string of information is passed in`, () => {
//     const lines = 'ls\ndir e\n29116 f\n2557 g\n62596 h.lst\n'
//     const result = [
//       { name: 'dir e', type: 'dir', size: 0 },
//       { name: 'f', type: '', size: 29116 },
//       { name: 'g', type: '', size: 2557 },
//       { name: 'h', type: 'lst', size: 62596 },
//     ]
//     expect(createFilesArray(lines)).toMatchObject(result)
//   })
// })
