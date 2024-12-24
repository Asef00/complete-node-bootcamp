const fs = require('fs')
const crypto = require('crypto')

const start = Date.now()
process.env.UV_THREADPOOL_SIZE = 4

setTimeout(() => {
  console.log('setTimeout 1')
}, 0)

setImmediate(() => {
  console.log('setImmediate 1')
})

console.log('top level')

const encode = (times) => {
  for (let i = 0; i < times; i++) {
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
      console.log(Date.now() - start, 'crypto')
    })
  }
}

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

  encode(5)
})

setTimeout(() => {
  console.log('setTimeout 4')
}, 2000)
