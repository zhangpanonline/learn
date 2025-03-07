const Class = require('../models/Class')
const {Op} = require('sequelize')

exports.add = async function(obj) {
    const ins = await Class.create(obj)
    return ins.toJSON()
}

exports.delete = async function (id) {
    // // 方法一
    // // 1. 查询实例
    // const ins = await Class.findByPk(id)
    // if (ins) {
    // // 2. 删除实例
    //     return await ins.destroy()
    // } else {
    //     return '数据不存在'
    // }
    
    // 方法二
    return await Class.destroy({
        where: {
            id
        }
    })
}

exports.update = async function(id, obj = {}) {
    // // 方式1
    // const ins = await Class.findByPk(id)
    // if (ins) {
    //     for(let k in obj) {
    //         ins[k] = obj[k]
    //     }
    //     return (await ins.save()).toJSON()
    // } else {
    //     return '数据不存在'
    // }
    // 方式2
    return await Class.update(obj, {
        where: {
            id
        }
    })
}

exports.get = async function(page = 1, limit = 10, name = '') {
    const where = {}
    if (name) {
        where.name = {
            [Op.like]: `%${name}%`
        }
    }
    const ins = await Class.findAndCountAll({
        limit,
        offset: (page - 1) * limit,
        where
    })
    return JSON.parse(JSON.stringify(ins))
}

exports.getById = async function(id) {
    const ins = await Class.findByPk(id)
    return ins.toJSON()
}