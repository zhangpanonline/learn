const http = require("http")
const url = require('url')
console.log('==========')

// 处理请求
function handleReq(req) {
    console.log('请求地址', req.url)
    console.log('解析请求地址', url.parse(req.url))
    console.log('请求方法', req.method)
    console.log('请求头', req.headers)
    let body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    })
    req.on('end', () => {
        console.log('请求体', body)
    })
}

const server = http.createServer((req, res) => {
    handleReq(req)
    res.setHeader('a', '1')
    res.setHeader('b', '2')
    res.statusCode = 404
    res.write('hello')
    res.end()
})

server.listen(9527)
server.on('listening', () => {
    console.log('服务器响应端口 9527')
})

// 测试请求地址
// curl -i -d "name=zp" -X POST 127.0.0.1:9527