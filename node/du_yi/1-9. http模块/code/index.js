// 静态资源服务器

// http://localhost:9527/index.html => public/index.html
// http://localhost:9527/index.css => public/index.css
// ...

const http = require('http')
const URL = require('url')
const path = require('path')
const fs = require('fs')

async function getStat(filename) {
    try {
        return await fs.promises.stat(filename)
    } catch {
        return null
    }
}

// 得到要处理的文件内容
async function getFileInfo(url) {
    const urlObj = URL.parse(url)
    let filename = path.resolve(__dirname, 'public', urlObj.pathname.slice(1))
    const stat = await getStat(filename)
    if (!stat) {
        console.log('文件不存在')
        return null
    } else if (stat.isDirectory()) {
        console.log('文件是一个目录')
        filename = path.resolve(filename, 'index.html')
        return await fs.promises.readFile(filename)
    } else {
        return await fs.promises.readFile(filename)
    }
}

async function handler(req, res) {
    const info = await getFileInfo(req.url)
    if (info) {
        res.statusCode = 200
        res.write(info)
    } else {
        res.statusCode = 404
        res.write('Resource is not exist!')
    }
    res.end()
}

const server = http.createServer(handler)

server.on('listening', () => {
    console.log('server listen on 9527')
})

server.listen(9527)