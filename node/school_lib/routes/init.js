const express = require('express')
// const session = require('express-session')
const path = require('path')
const cors = require('cors')

const history = require('connect-history-api-fallback')

const app = express()

// app.use(session({
//   secret: 'nodejs',
//   name: 'sessionid',
//   resave: false,
// }))

// 当请求时，会根据请求路径(req.path)，从指定的目录中寻找是否存在文件，如果存在，直接响应文件内容，而不再移交给后续的中间件。
// 如果不存在，则直接移交给后续的中间件
app.use('/static', express.static(path.resolve(__dirname, '../public')))
// app.use('/static', (req) => {
//   console.log(req.baseUrl) // /static
//   console.log(req.path) // /abc
// })

// CORS
// app.use(require('./corsMiddleware')) // 手写
// 使用cors中间件
app.use(
  cors({
    origin(origin, cb) {
      cb(null, origin || '*')
    },
    credentials: true
  })
)

/**
 * 加入 cookie-parser 中间件
 * 加入之后，会在 req 对象中注入cookies属性，用于获取所有请求传递过来的cookie
 * 加入之后，会在 res 对象中注入cookie方法，用于设置cookie
 */
app.use(require('cookie-parser')())
app.use(require('./tokenMiddleware'))

app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(express.json())

app.use(require('./logMiddleware'))

// 处理 api 请求
app.use('/api/login', require('./api/login'))
app.use('/api/student', require('./api/student'))
app.use('/api/admin', require('./api/admin'))
app.use('/api/class', require('./api/class'))
app.use('/api/book', require('./api/book'))
app.use('/api/news', require('./api/news'))

app.use(history())

app.use(require('./errorMiddleware'))
/**
 * 在linux 下运行会报错 : nodejs: listen EACCES: permission denied 0.0.0.0:80
 * 解决方法：https://stackoverflow.com/questions/60372618/nodejs-listen-eacces-permission-denied-0-0-0-080
 */
app.listen(9527, '::', () => {
  console.log('Server is running on port 9527')
})

// app.get('/abc', (req, res) => {
//     // 请求
//     console.log(req.headers)
//     console.log(req.path)
//     console.log(req.query)
//     console.log(req.params)
//     console.log(res.method)

//     // 响应
//     // res.setHeader('AAA', 'BBB')
//     // res.send(req.query)

//     // 重定向
//     // res.status(302).header('location', 'https://www.baidu.com').end()
//     // 等价于
//     // res.status(302).location('https://www.baidu.com').end()
//     // 等价于
//     // res.redirect(302, 'https://www.baidu.com')
// })
