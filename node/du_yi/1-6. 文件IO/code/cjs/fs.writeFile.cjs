// const fs = require("node:fs")
// const path = require('node:path')
// const { Buffer } = require("node:buffer")

// const filename = path.resolve(__dirname, '../../myfiles/1.txt')

// // fs.writeFile(filename, 'abc', {}, (err, res) => {
// //     console.log(err, res)
// // })

// const data = Buffer.from('CCC', 'utf8')
// fs.writeFile(filename, data, () => {})

const fs = require('node:fs')
const path = require('node:path')

const filename = path.resolve(__dirname, '../../myfiles/1.txt')

fs.writeFile(filename, Buffer.alloc(1, 97), (err, res) => {
    console.log(err, res)
})
// 追加
fs.appendFile(filename, Buffer.alloc(1, 98), (err, res) => {
    console.log(err, res)
})
