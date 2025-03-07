import fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'


// TODO 这里写入失败
const filename = fileURLToPath(new URL( '../../abc.txt' , import.meta.url))
const op = await fs.open(filename)
const ws = op.createWriteStream({ encoding: 'utf8', highWaterMark: 1,  })

ws.write('a')

// let i = 0;
// function write() {
//     let flag = true
//     while(i <= 100 && flag) {
//         i++
//         flag = ws.write('a')
//         console.log(flag)
//     }
// }

// write()

// ws.on('drain', () => {
//     console.log('写入队列已清空')
//     write()
// })

// ws.on('error', err => {
//     console.log('出错了', err)
// })

// ws.on('close', () => {
//     console.log('关闭文件')
// })