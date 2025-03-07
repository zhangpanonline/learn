// const fs = require("node:fs")
// const path = require("node:path")

// const dirname = path.resolve(__dirname, '../../myfiles')

// fs.readdir(dirname, (err, paths) => {
//     console.log(err, paths) // null [ '1', '1.jpeg', '1.txt', '2.txt' ]
// })



const fs = require('node:fs')
const path = require('node:path')

console.log(__dirname)
const dirname = path.resolve(__dirname, '../../myfiles')

fs.readdir(dirname, (err, paths) => {
    console.log(err, paths) 
})
