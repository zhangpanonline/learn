const express = require('express')
const router = express.Router()
const bookinstance_controller = require('../controllers/bookinstanceController')

router.get('/bookinstances', bookinstance_controller.bookinstance_list)

router.get('/bookinstance/create', bookinstance_controller.bookinstance_create_get)

router.post('/bookinstance/create', bookinstance_controller.bookinstance_create_post)

router.get('/bookinstance/:id', bookinstance_controller.bookinstance_detail)

module.exports = router