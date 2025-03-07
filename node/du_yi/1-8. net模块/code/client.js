const net = require("node:net")
const os = require("node:os")

const socket = net.createConnection({
    host: 'duyi.ke.qq.com',
    port: 80
}, () => {
    console.log('连接成功')
})

var receive = null
socket.on('data', chunk => {
    const res = chunk.toString('utf-8')
    if (!receive) {
        // 第一次获取数据
        receive = parseHeader(res)
        if (isOver()) {
            socket.end(() => {
                console.log('客户端请求挂断！！！')
            })
        }
    } else {
        receive.body += res
        if (isOver()) {
            socket.end(() => {
                console.log('客户端请求挂断！！！')
            })
        }
    }
    console.log('========server=>>>>>>>>>>>>>')
    console.log(res)
    console.log('<<<<<<<<<<<=server==========')
})

// 提炼出响应字符串的消息头和消息体
function parseHeader(res) {
   const idx = res.indexOf(os.EOL + os.EOL)
   const head = res.substring(0, idx)
   const body = res.substring(idx + 2)
   const headParts = head.split(os.EOL)
   const headArray = headParts.slice(1).map(v => {
    return v.split(': ')
   })
   const header = headArray.reduce(( acc, cur ) => {
        acc[cur[0]] = cur[1]
        return acc
   }, {})
   return {
    header,
    body: body.trimStart()
   }
}

function isOver() {
    // 需要接收消息体的总字节数
    const contentLength = receive.header['Content-Length']
    const curReceivedLength = Buffer.from(receive.body, 'utf-8').byteLength
    console.log(contentLength, curReceivedLength)
    return contentLength >= curReceivedLength
}

// TCP/IP 请求
// socket.write(`hello!`)

// HTTP 请求
socket.write(`GET / HTTP/1.1
Host: duyi.ke.qq.com
Connection: keep-alive

`)

socket.on('close', () => {
    console.log('服务器同意挂断了！！！')
})

