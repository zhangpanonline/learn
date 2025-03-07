const express = require('express')
const router = express.Router()


const genre_controller = require('../controllers/genreController')

router.get('/genres', genre_controller.genre_list)
router.post('/genre/create', genre_controller.genre_create_post)

router.get('/genre/create', genre_controller.genre_create_get)
router.get('/genre/:id', genre_controller.genre_detail)


module.exports = router