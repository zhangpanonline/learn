const jwt = require('jsonwebtoken')
const secret = 'nodejs'

exports.publish = (res, data, maxAge = 3600 * 24) => {
    const token = jwt.sign({
        data
    }, secret, {
        expiresIn: maxAge
    })
    res.header('authorization', token)
    res.header('access-control-expose-headers', 'authorization')
}

exports.verify = (req) => {
    let token = req.headers.authorization.split(' ')
    token = token[1] || token[0]
    if (!token) {
        return null
    }
    try {
        const result = jwt.verify(token, secret)
        return result
    } catch (error) {
        console.error(error.message)
        return null
    }
}