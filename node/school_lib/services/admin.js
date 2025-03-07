const Admin = require('../models/Admin')
const md5 = require('md5')
const { Op } = require('sequelize')

exports.add = async function(obj) {
    obj.loginPwd = md5(obj.loginPwd)
    const ins = await Admin.create(obj)
    return ins.toJSON()
}

exports.delete = async function (id) {
    // // 方法一
    // // 1. 查询实例
    // const ins = await Admin.findByPk(id)
    // if (ins) {
    // // 2. 删除实例
    //     return await ins.destroy()
    // } else {
    //     return '数据不存在'
    // }
    
    // 方法二
    return await Admin.destroy({
        where: {
            id
        }
    })
}

exports.update = async function(id, obj = {}) {
    // // 方式1
    // const ins = await Admin.findByPk(id)
    // if (ins) {
    //     for(let k in obj) {
    //         ins[k] = obj[k]
    //     }
    //     return (await ins.save()).toJSON()
    // } else {
    //     return '数据不存在'
    // }
    // 方式2
    if (obj.loginPwd) {
        obj.loginPwd = md5(obj.loginPwd)
    }
    return await Admin.update(obj, {
        where: {
            id
        }
    })
}

exports.login = async function(loginId, loginPwd) {
    const result = await Admin.findOne({
        where: {
            loginId, loginPwd: md5(loginPwd)
        },
        attributes: {
            exclude: ['loginPwd']
        }
    })
    if (result) {
        return {
            code: 200,
            message: '登录成功',
            data: result.toJSON()
        }
    } else {
        return {
            code: 500,
            message: '请检查用户名或密码'
        }
    }
}

exports.getAdminById = async function(id) {
    const res = await Admin.findByPk(id)
    if (res) {
        return res.toJSON()
    } else {
        return null
    }
}

exports.getAdmins = async function(page = 1, limit = 10, name = '') {
    const ins = await Admin.findAndCountAll({
        limit,
        offset: (page - 1) * limit,
        where: {
            name: {
                [Op.like]: `%${name}%`
            }
        },
        attributes: {
            exclude: ['loginPwd']
        }
    })
    return JSON.parse(JSON.stringify(ins))
}