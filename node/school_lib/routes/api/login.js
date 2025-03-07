const adminServ = require('../../services/admin')
const express = require('express')
const route = express.Router()
const { encrypt } = require('../../utils/crypt')
const jwt = require('../jwt')

route.post('/', async (req, res) => {
    const result = await adminServ.login(req.query.loginId, req.query.loginPwd)
    if (result.data?.id) {
        jwt.publish(res, result.data.id)
        // req.session.userInfo = result.data
        // // 加密
        // const auth = encrypt(result.data.id.toString())
        // // 只有浏览器才会自动处理cookie
        // res.cookie('token', auth, {
        //     // path: '/',
        //     // domain: 'localhost'
        //     // maxAage: 1000 // 毫秒
        //     // httpOnly: true
        // })
        // // 对于其他终端
        // res.header('authorization', auth)
    }
    res.send(result)
    return
})

route.get('/whoami', async (req, res) => {
    const result = await adminServ.getAdminById(req.userId)
    res.send(result)
})

module.exports = route