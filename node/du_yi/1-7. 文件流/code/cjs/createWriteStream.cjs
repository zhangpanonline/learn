const fs = require('fs')
const path = require('path')

const filename = path.resolve(__dirname, '../../abc.txt')

const ws = fs.createWriteStream(filename, { flags: 'w', encoding: 'utf-8', highWaterMark: 16 * 1024 })

let i = 0;
function write() {
    let flag = true;
    while(i <= 1024 * 1024 * 10 && flag) {
        console.log(i++)
        flag = ws.write('a')
        if (i >= (1024 * 1024 * 10 + 1)) {
            ws.end('END')
        }
    }
}



ws.on('open', () => {
    console.log('打开文件')
    write()
})

ws.on('error', err => {
    console.log('出错了：', err)
})

ws.on('close', () => {
    console.log('关闭文件')
})

ws.on('drain', () => {
    console.log('写入队列已清空')
    write()
})
