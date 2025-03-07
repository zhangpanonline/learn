// import fs from 'node:fs/promises'
// import { URL } from 'node:url'

// const dirname = new URL('../../myfiles/sub/', import.meta.url)

// for(let i = 1; i <= 5; i++) {
//     mkdir(new URL(`./${i}`, dirname))
// }

// async function mkdir(dirname) {
//     const res = await exists(dirname)
// if (res) {
//     console.log('目录已存在，无需操作！')
// } else {
//     await fs.mkdir(dirname)
//     console.log('目录创建成功！')
// }
// }

// async function exists(filename) {
//     try {
//         await fs.stat(filename)
//         return true
//     } catch (error) {
//         if (error.code === 'ENOENT') {
//             return false
//         } else {
//             return error
//         }
//     }
// }