const allowOrigins = [
    'http://127.0.0.1:5500'
]

module.exports = function(req, res, next) {
    // 3. 附带身份凭证的请求
    //  1. 客户端要带cookie的话，ajax请求要设置 withCredentials: true；fetch 请求要设置 credentials: 'include'
    //  2. 客户端带了cookie，服务端也得做相应处理，否则依然会跨域
    res.header('Access-Control-Allow-Credentials', true)

    // 2. 预检请求
    if (req.method === 'OPTIONS') {
        res.header('access-control-allow-headers', req.headers['access-control-request-headers'])
        res.header('access-control-allow-methods', req.headers['access-control-request-method'])
        // 设置之后，86400 秒之内对相同的 access-control-request-headers 和 access-control-request-method 不需要再经过预检请求
        // res.header('access-control-max-age', 86400)
    }

    // 1. 简单请求
    if (Object.hasOwn(req.headers, 'origin') && allowOrigins.includes(req.headers.origin)) {
        res.header('access-control-allow-origin', req.headers.origin)
        // 对于附带身份凭证的请求，服务器不得设置 Access-Control-Allow-Origin 的值为 *，否则依然会显示跨域错误
        // res.header('access-control-allow-origin', '*')
    }

    // 额外补充：向 CORS 白名单的响应标头添加值，以便客户端可以访问到
    // res.header('access-control-expose-headers', 'access-control-allow-origin, Connection')
    next()
}
