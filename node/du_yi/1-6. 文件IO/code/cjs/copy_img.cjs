const fs = require('node:fs')
const path = require('node:path')

const fromPath = path.resolve(__dirname, '../../myfiles/1.jpeg')
const toPath = path.resolve(__dirname, '../../myfiles/1.copy.jpeg')

fs.readFile(fromPath, (err, buffer) => {
    if (!err) {
        fs.writeFile(toPath, buffer, error => {
            if (!error) {
                console.log('SUCCESS')
            }
        })
    }
})