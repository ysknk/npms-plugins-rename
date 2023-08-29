export default {
  find: './test/**/**.**',
  before: '\.txt',
  after: '\.js',
  prefix: 'prefix_',
  suffix: '_suffix',
  dryrun: true,

  // onSequence: (file) => {
  //   console.log('onSequence')
  //   return file
  // },

  // '/test': {
  //   value: 'test',
  //   '/test': {
  //     value: 'test/test/',
  //     prefix: 'c',
  //     suffix: 'd',
  //     onSequence: (file) => {
  //       console.log('test/test/ onSequence')
  //       return file
  //     },
  //     '$index': {
  //       onSequence: (file) => {
  //         console.log('test/test/index onSequence')
  //         return file
  //       },
  //     },
  //   },
  //   '$index': {
  //     prefix: 'a',
  //     suffix: 'b',
  //     value: 'test/index',
  //     onSequence: (file) => {
  //       console.log('test/index onSequence')
  //       return file
  //     }
  //   }
  // }
}
