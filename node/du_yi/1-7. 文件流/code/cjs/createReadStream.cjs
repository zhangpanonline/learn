const fs = require('node:fs')
const path = require('node:path')

const filename = path.resolve(__dirname, '../../abc.txt')

const rs = fs.createReadStream(filename, { encoding: 'utf8', highWaterMark: 1, autoClose: true })

rs.on('open', () => {
    console.log('文件打开')
})

rs.on('error', err => {
    console.log('出错了', err)
})

rs.on('close', () => {
    console.log('文件关闭')
})

rs.on('data', data => {
    console.log('读取到的数据：', data)
    rs.pause()
})

rs.on('pause', () => {
    console.log('暂停读取')
    setTimeout(() => {
        rs.resume()
    }, 1000)
})

rs.on('resume', () => {
    console.log('恢复读取')
})


rs.on('end', () => {
    console.log('数据读取完成')
})