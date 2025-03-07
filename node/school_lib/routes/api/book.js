const bookServ = require('../../services/book')
const express = require('express')
const route = express.Router()

route.get('/', async(req, res) => {
    try {
        const page = req.query.page || 1
        const limit = req.query.limit || 10
        const { count, rows } = await bookServ.get(+page, +limit, req.query.name)
        res.send({
            total: count,
            data: rows
        })
        return
    } catch (error) {
        console.error(error)
    }
})

route.post('/', async(req, res) => {
    try {
        const result = await bookServ.add(req.query)
        res.send(result)
        return
    } catch (error) {
        console.error(error)
    }
})

route.put('/:id', async(req, res) => {
    try {
        const obj = req.query
        for(let k in obj) {
            if (!obj[k]) delete obj[k]
        }
        const result = await bookServ.update(req.params.id, obj)
        if (Array.isArray(result) && result[0] === 1) {
            res.send(await bookServ.getById(req.params.id))
            return
        } else {
            res.send({
                code: 200,
                message: '操作失败'
            })
            return
        }
    } catch (error) {
        console.error(error)
    }
})

route.delete('/:id', async(req, res) => {
    try {
        const result = await bookServ.delete(req.params.id)
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