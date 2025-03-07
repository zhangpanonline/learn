import fs from 'node:fs/promises'
import { URL, fileURLToPath  } from 'node:url'

const filepath = fileURLToPath(new URL( '../../abc.txt' , import.meta.url))
const filehandle = await fs.open(filepath)
const rs = filehandle.createReadStream({encoding: 'utf8', autoClose: true, highWaterMark: 1 })
rs.on('open', () => {
    console.log('文件打开')
})
rs.on('error', () => {
    console.log('出错了')
})

rs.on('close', () => {
    console.log('文件关闭')
})
rs.on('end', () => {
    console.log('读取完成')
})
rs.on('data', chunk => {
    console.log(chunk)
    rs.pause()
})

rs.on('pause', () => {
    console.log('停止读取')
    setTimeout(() => {
        rs.resume()
    }, 1000)
})
rs.on('resume', () => {
    console.log('恢复读取')
})