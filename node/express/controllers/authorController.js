const Author = require("../models/author");
const Book = require('../models/book')
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require("express-validator");

// 显示完整的作者列表
exports.author_list = asyncHandler(async (req, res, next) => {
  const list_authors = await Author.find().sort([['family_name', 'ascending']]).exec()
  res.render('author_list', {title: 'Author List', author_list: list_authors})
})

// 为每位作者显示详细信息的页面
exports.author_detail = asyncHandler(async(req, res, next) => {
  const [author, authors_books] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Book.find({ author: req.params.id }, "title summary").exec()
  ])
  if (!author) {
    const err = new Error('Author not found')
    err.status = 404
    return next(err)
  }
  res.render('author_detail', {
    title: 'Author Detail',
    author: author,
    author_books: authors_books
  })
})

// 由 GET 显示创建作者的表单
exports.author_create_get = (req, res) => {
  res.render('author_form', { title: 'Create Author' })
};

// 由 POST 处理作者创建操作
exports.author_create_post = [
  body('first_name').isLength({ min: 1 }).trim().withMessage("First name must be specified."),
  body('family_name').isLength({ min: 1 }).trim().withMessage('Family name must be specified.'),
  body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }),
  body("date_of_death", "Invalid date of death").optional({ checkFalsy: true }),
  body("first_name").trim().escape(),
  body("family_name").trim().escape(),
  body("date_of_birth").toDate(),
  body("date_of_death").toDate(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.render("author_form", {
        title: "Create Author",
        author: req.body,
        errors: errors.array(),
      });
      return
    } else {
      const author = new Author({
        first_name: req.body.first_name,
        family_name: req.body.family_name,
        date_of_birth: req.body.date_of_birth,
        date_of_death: req.body.date_of_death
      })
      await author.save()
      res.redirect(author.url)
    }
  })
]

// 由 GET 显示删除作者的表单
exports.author_delete_get = asyncHandler(async (req, res, next) => {
  const [author, authors_books] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Book.find({ author: req.params.id }).exec()
  ])
  if (!author) {
    res.redirect('/catalog/authors')
  }
  res.render('author_delete', {
    title: 'Delete Author',
    author,
    author_books: authors_books
  })
})

// 由 POST 处理作者删除操作
exports.author_delete_post = asyncHandler(async (req, res, next) => {
  const [author, authors_books] = await Promise.all([
    Author.findById(req.body.authorid).exec(),
    Book.find({ author: req.body.authorid }).exec()
  ])
  if (authors_books.length > 0) {
    res.render('author_delete', {
      title: 'Delete Author',
      author,
      author_books: authors_books
    })
    return
  } else {
    await Author.findByIdAndDelete(req.body.authorid)
    res.redirect('/catalog/authors')
  }
})

// 由 GET 显示更新作者的表单
exports.author_update_get = (req, res) => {
  res.send("未实现：作者更新表单的 GET");
};

// 由 POST 处理作者更新操作
exports.author_update_post = (req, res) => {
  res.send("未实现：更新作者的 POST");
};
