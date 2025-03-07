const BookInstance = require("../models/bookinstance");
const Book = require('../models/book')
// 捕获路由处理器函数抛出的异常
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require("express-validator");

exports.bookinstance_list = asyncHandler(async function(req, res, next) {
    const list_bookinstance = await BookInstance.find().populate('book').exec()
    res.render('bookinstance_list', {
        title: 'Book Instance List',
        bookinstance_list: list_bookinstance
    })
})

exports.bookinstance_detail = asyncHandler(async (req, res, next) => {
    const bookinstance = await BookInstance.findById(req.params.id).populate('book').exec()
    if (!bookinstance) {
        const err = new Error('Book copy not found')
        err.status = 404
        return next(err)
    }
    res.render('bookinstance_detail', {
        title: 'Book',
        bookinstance
    })
})

exports.bookinstance_create_get = asyncHandler(async (req, res, next) => {
    const books = await Book.find({}, 'title').exec()
    res.render('bookinstance_form', {
        title: 'Create BookInstance',
        book_list: books
    })
})

exports.bookinstance_create_post = [
    body('book', 'Book must be specified').isLength({min: 1}).trim(),
    body('imprint', 'Imprint must be sepcified.').isLength({min: 1}).trim(),
    body('due_back', 'Invalid date').optional({checkFalsy: true}),

    body('book').trim().escape(),
    body('imprint').trim().escape(),
    body('status').trim().escape(),
    body('due_back').toDate(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)
        const bookinstance = new BookInstance({
            book: req.body.book,
            imprint: req.body.imprint,
            status: req.body.status,
            due_back: req.body.due_back
        })
        if (!errors.isEmpty()) {
            const books = await Book.find({}, 'title').exec()
            res.render('bookinstance_form', {
                title: 'Create BookInstance',
                book_list: books,
                selected_book: bookinstance.book._id,
                errors: errors.array(),
                bookinstance
            })
            return
        } else {
            await bookinstance.save()
            res.redirect(bookinstance.url)
        }
    })
]