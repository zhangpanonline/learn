const Book = require('../models/Book')
const { Op } = require('sequelize')

exports.add = async function(obj) {
    const ins = await Book.create(obj)
    return ins.toJSON()
}

exports.delete = async function (id) {
    // // 方法一
    // // 1. 查询实例
    // const ins = await Book.findByPk(id)
    // if (ins) {
    // // 2. 删除实例
    //     return await ins.destroy()
    // } else {
    //     return '数据不存在'
    // }
    
    // 方法二
    return await Book.destroy({
        where: {
            id
        }
    })
}

exports.update = async function(id, obj = {}) {
    // // 方式1
    // const ins = await Book.findByPk(id)
    // if (ins) {
    //     for(let k in obj) {
    //         ins[k] = obj[k]
    //     }
    //     return (await ins.save()).toJSON()
    // } else {
    //     return '数据不存在'
    // }
    // 方式2
    return await Book.update(obj, {
        where: {
            id
        }
    })
}

exports.get = async function(page = 1, limit = 10, name = '') {
    try {
        const where = {}
        if (name) {
            where.name = {
                [Op.like]: `%${name}%`
            }
        }
        const ins = await Book.findAndCountAll({
            limit,
            offset: (page - 1) * limit,
            where
        })
        return JSON.parse(JSON.stringify(ins))
    } catch (error) {
        console.error(error.message)
    }
}

exports.getById = async function(id) {
    const ins = await Book.findByPk(id)
    return ins.toJSON()
}