const http = require("http");
const url = 'http://yuanjin.tech:5005/api/movie'
const request = http.request(url, {method: 'GET'}, resp => {
    // console.log(resp.statusCode)
    // console.log(resp.headers)
    // console.log(resp.headers['content-type'])
    let result = ''
    resp.on('data', chunk => {
        result += chunk.toString('utf-8')
    })
    resp.on('end', () => [
        console.log(JSON.parse(result))
    ])
})

request.end() // 告诉服务器发送消息体结束
