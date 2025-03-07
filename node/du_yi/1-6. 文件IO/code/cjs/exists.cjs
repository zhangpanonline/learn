// const fs = require('node:fs')
// const path = require('node:path')

// const dirname = path.resolve(__dirname, '../../myfiles/sub')

// for(let i = 1; i <= 5; i++) {
//     mkdir(path.resolve(dirname, `./${i}`))
// }

// function mkdir(path) {
//     exists(path, (bool) => {
//         if (bool) {
//             console.log('目录已存在')
//         } else {
//             fs.mkdir(path, (err) => {
//                 if (err) {
//                     console.log(err)
//                 } else {
//                     console.log('目录创建成功！')
//                 }
//             })
//         }
//     })
// }

// function exists(path, cb) {
//     fs.stat(path, err => {
//         if (!err) {
//             cb(true)
//         } else if (err.code === 'ENOENT') {
//             cb(false)
//         } else {
//             cb(err)
//         }
//     })
// }