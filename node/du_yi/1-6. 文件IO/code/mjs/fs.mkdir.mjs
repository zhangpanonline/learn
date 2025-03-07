// import fs from 'node:fs/promises'
// import { URL } from 'node:url'

// const dirname = new URL('../../myfiles/sub/', import.meta.url)

// // 在 /sub/ 下以此创建目录1、2、3、4、5
// for(let i = 1; i <= 5; i++) {
//     await fs.mkdir(new URL(`./${i}`, dirname))
// }
// console.log('SUCCESS')

import fs from 'node:fs/promises'

const dirname = new URL('../../myfiles/1/', import.meta.url)

for(let i = 1; i <= 5; i++) {
    await fs.mkdir(new URL(`./${i}`, dirname))
}
