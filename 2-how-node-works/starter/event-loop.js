const fs = require('fs')

setTimeout(() => {
  console.log('setTimeout 1')
}, 0)

setImmediate(() => {
  console.log('setImmediate 1')
})

console.log('top level')

fs.readFile('./test-file.txt', () => {
  console.log('File read')

  setTimeout(() => {
    console.log('setTimeout 2')
  }, 0)
  setTimeout(() => {
    console.log('setTimeout 3')
  }, 3000)

  setImmediate(() => {
    console.log('setImmediate 2')
  })

  process.nextTick(() => {
    console.log('process.nextTick')
  })
})

setTimeout(() => {
  console.log('setTimeout 4')
}, 2000)
