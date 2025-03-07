const net = require('node:net')
const server = net.createServer()
const fs = require('node:fs')
const path = require('node:path')

server.listen(9527) // 监听9527端口

server.on('listening', () => {
    console.log('server listen 9527')
})

// server.on('connection', socket => {
//     console.log('有客户端连接进来')
//     socket.on('data', chunk => {
//         console.log(chunk.toString('utf-8'))
//         socket.write(`HTTP/1.1 200 OK
// Content-Length: 95
// // Content-Type: text/plain

// <html>
// <head><title>hello</title></head>
// <body>
// <center><h1>hello</h1></center>
// </body>
// </html> `)
//         // 这里设置了 Content-Length: 95 所以请求完95个字节就自动关闭了
//         // socket.end()
//     })
//     socket.on('end', () => {
//         console.log('连接关闭了')
//     })
// })
server.on('connection', socket => {
    console.log('有客户端连接进来')
    socket.on('data', chunk => {
        const bodyBuffer = fs.readFileSync(path.resolve(__dirname, '../../hsq.jpg'))
        const headBuffer = Buffer.from(`HTTP/1.1 20 OK
Content-Type: image/jpeg

`, 'utf-8')
        const res = Buffer.concat([headBuffer, bodyBuffer])
        socket.write(res)
        socket.end()
    })
    socket.on('end', () => {
        console.log('连接关闭了')
    })
})