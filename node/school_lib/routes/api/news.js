const express = require('express')
const router = express.Router()
const cacheNews = require('../cacheNews')

router.get('/:id', cacheNews({ ttl: 10 }), (req, res) => {
  console.log('没有使用缓存')
  res.send({
    title: '新闻标题' + req.params.id,
    content: '新闻内容' + req.params.id
  })
})

module.exports = router
