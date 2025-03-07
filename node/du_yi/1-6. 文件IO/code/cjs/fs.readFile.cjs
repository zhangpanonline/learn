// const fs = require("node:fs")
// const path = require("node:path")
// const filename = path.resolve(__dirname, '../../myfiles/1.txt')

// fs.readFile(filename, 'utf-8', (err, content) => {
//     console.log('异步', err, content)
// })

// const res = fs.readFileSync(filename)
// console.log('同步', res.toString('utf8'))

const fs = require('node:fs')
const path = require('node:path')
const filename = path.resolve(__dirname, '../../myfiles/2.txt')

fs.readFile(filename, null, (err, data) => {
    console.log('异步读取', data.toString('utf8'))
})

const res = fs.readFileSync(filename, { encoding: 'utf8' })
console.log('同步读取', res)