const Genre = require('../models/genre')
const Book = require('../models/book')
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require("express-validator");
exports.genre_list = asyncHandler(async (req, res, next) => {
    const list_genre = await Genre.find().sort([['name', 'ascending']]).exec()
    res.render('genre_list', { title: 'Genre List', genre_list: list_genre })
})

exports.genre_detail = asyncHandler(async(req, res, next) => {
    const [genre, genre_books] = await Promise.all([Genre.findById(req.params.id).exec(), Book.find({ genre: req.params.id }).exec()])
    if (!genre) {
        const err = new Error('Genre not found')
        err.status = 404
        return next(err)
    }
    res.render('genre_detail', {
        title: 'Genre Detial',
        genre,
        genre_books
    })
})

exports.genre_create_get = (req, res, next) => {
    res.render('genre_form', { title: 'Create Genre' })
}

exports.genre_create_post = [
    body('name', 'Genre name required').isLength({ min: 1 }).trim(),
    body('name').trim().escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)
        const genre = new Genre({ name: req.body.name })
        if (!errors.isEmpty()) {
            res.render('genre_form', {
                title: 'Create Genre',
                genre: genre,
                errors: errors.array()
            })
            return
        } else {
            const found_genre = await Genre.findOne({ name: req.body.name }).exec()
            if (found_genre) {
                res.redirect(found_genre.url)
            } else {
                await genre.save()
                res.redirect(genre.url);
            }
        }
    })
]