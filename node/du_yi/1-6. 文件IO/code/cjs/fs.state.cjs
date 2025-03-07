// const fs = require('node:fs')
// const path = require("node:path")

// const filename = path.resolve(__dirname, '../../myfiles/1.txt')
// fs.stat(filename, (err, stat) => {
//     console.log(err, stat)
//     console.log('是否目录：', stat.isDirectory())
//     console.log('是否文件：', stat.isFile())
// })

const fs = require('node:fs')
const path = require('node:path')
const util = require('node:util')

const filename = path.resolve(__dirname, '../../myfiles/1.txt')
fs.stat(filename, (err, stat) => {
    console.log(err, stat)
    // console.log(util.getSystemErrorMap())
    console.log(stat.isFile())
    console.log(stat.isDirectory())
})