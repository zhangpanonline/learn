// import fs from 'node:fs/promises'

// const filename = new URL('../../myfiles/1.txt', import.meta.url)

// const stat = await fs.stat(filename)
// console.log(stat)
// console.log("是否目录：", stat.isDirectory())
// console.log("是否文件：", stat.isFile())

import fs from 'node:fs/promises'
import util from 'node:util'

const filename = new URL('../../../../../video/03 node/1-07-1. 文件流-可读流【itzyku.com】.mp4', import.meta.url)

const res = await fs.stat(filename, { bigint: false })

console.log(res, '##')
console.log(res.isDirectory())
console.log(res.isFile())