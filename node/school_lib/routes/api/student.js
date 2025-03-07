const express = require('express')
const route = express.Router()
const stuServ = require('../../services/student')

route.get('/', async (req, res) => {
    const page = req.query.page || 1
    const limit = req.query.limit || 10
    const sex = req.query.sex || -1
    const name = req.query.name || ''
    const result = await stuServ.getStudents(+page, +limit, +sex, name)
    res.send({
        total: result.count,
        data: result.rows
    })
    return
})

route.get('/:id', async (req, res) => {
    res.send(await stuServ.getStudentById(req.params.id))
    return
})

route.post('/', async (req, res) => {
    try {
        const result = await stuServ.add({
            ...req.query,
            sex: req.query === 'true',
            ClassId: Number(req.query.ClassId),
        })
        res.send(result)
        return
    } catch(err) {
        console.log(err)
        throw new Error(err)
    }
})

route.put('/:id', async (req, res) => {
    try {
        const obj = req.query
        for(let k in obj) {
            if (!obj[k]) {
                delete obj[k]
            }
        }
        if (obj.sex) {
            obj.sex = obj.sex === 'true'
        }
        if (obj.ClassId) {
            obj.ClassId = Number(obj.ClassId)
        }
        const result = await stuServ.update(req.params.id, obj)
        if (Array.isArray(result) && result[0] === 1) {
            res.send(await stuServ.getStudentById(req.params.id))
            return
        } else {
            res.send({
                code: 200,
                message: '操作失败'
            })
            return
        }
    } catch (error) {
        console.log(error)
    }
})

route.delete('/:id', async (req, res) => {
    try {
        const result = await stuServ.delete(req.params.id)
        res.send({
            code: 200,
            message: result === 1 ? '操作成功' : '操作失败'
        })
        return
    } catch (error) {
        console.error(error)
    }
})

module.exports = route