const Student = require('../models/Student')
const Class = require('../models/Class')
const { Op } = require('sequelize')
const { async, validators } = require('validate.js')

exports.add = async function(obj) {
    validators.classExits = async function(value) {
        const ins = await Class.findByPk(value)
        if (!ins) {
            return '班级不存在'
        }
        return
    }
    const rule = {
        name: {
            presence: {
                allowEmpty: false
            },
            type: 'string',
            length: {
                minimum: 1,
                maximum: 10
            }
        },
        birthday: {
            presence: true,
            datetime: {
                dateOnly: true,
                earliest: '1949-10-01',
                latest: new Date()
            }
        },
        sex: {
            presence: true,
            type: 'boolean',
        },
        mobile: {
            presence: true,
            format: {
                pattern: /^1[3456789]\d{9}$/
            }
        },
        ClassId: {
            presence: true,
            numericality: {
                onlyInteger: true,
                strict: false
            },
            classExits: true
        }
    }
    await async(obj, rule)
    const ins = await Student.create(obj)
    return ins.toJSON()
}

exports.delete = async function (id) {
    // // 方法一
    // // 1. 查询实例
    // const ins = await Student.findByPk(id)
    // if (ins) {
    // // 2. 删除实例
    //     return await ins.destroy()
    // } else {
    //     return '数据不存在'
    // }
    
    // 方法二
    return await Student.destroy({
        where: {
            id
        }
    })
}

exports.update = async function(id, obj = {}) {
    // // 方式1
    // const ins = await Student.findByPk(id)
    // if (ins) {
    //     for(let k in obj) {
    //         ins[k] = obj[k]
    //     }
    //     return (await ins.save()).toJSON()
    // } else {
    //     return '数据不存在'
    // }
    // 方式2
    validators.classExits = async function(value) {
        const ins = await Class.findByPk(value)
        if (!ins) {
            return '班级不存在'
        }
        return
    }
    const rule = {
        name: {
            type: 'string',
            length: {
                minimum: 1,
                maximum: 10
            }
        },
        birthday: {
            datetime: {
                dateOnly: true,
                earliest: '1949-10-01',
                latest: new Date()
            }
        },
        sex: {
            type: 'boolean',
        },
        mobile: {
            format: {
                pattern: /^1[3456789]\d{9}$/
            }
        },
        ClassId: {
            numericality: {
                onlyInteger: true,
                strict: false
            },
            classExits: false
        }
    }
    await async(obj, rule)
    return await Student.update(obj, {
        where: {
            id
        }
    })
}

exports.getStudents = async function(page = 1, limit = 10, sex = -1, name = '') {
    // 方式一
    //    const res = await Student.findAll({
    //         offset: (page - 1) * limit,
    //         limit
    //    })
    //    const total = await Student.count()
    //    return {
    //      data: JSON.parse(JSON.stringify(res)),
    //      total,
    //    }

    // 方式二
    const where = {}
    if (sex !== -1) {
        where.sex = Boolean(sex)
    }
    if (name) {
        // 模糊查询
        where.name = {
            [Op.like]: `%${name}%`
        }
    }
    const res = await Student.findAndCountAll({
        offset: (page - 1) * limit,
        limit,
        where,
        // 查询部分字段
        attributes: ['id', 'name', 'sex', 'birthday', 'mobile', 'age'],
        // 查询关联关系
        include: [Class]
    })
    return JSON.parse(JSON.stringify(res))
}

exports.getStudentById = async function(id) {
    try {
        const stu = await Student.findByPk(id)
        const clas = await Class.findByPk(stu.ClassId)
        return {
            ...stu.toJSON(),
            Class: clas.toJSON()
        }
    } catch (error) {
        return {
            code: 500,
            message: error.message
        }
    }
}