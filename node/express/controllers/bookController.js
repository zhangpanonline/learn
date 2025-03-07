// /controllers/bookController.js

const Book = require("../models/book");
const Author = require("../models/author");
const Genre = require("../models/genre");
const { body, validationResult } = require("express-validator");
const BookInstance = require("../models/bookinstance");
// 捕获路由处理器函数抛出的异常
const asyncHandler = require('express-async-handler')

exports.index = asyncHandler(async (req, res, next) => {
  // 并行获取书的详细信息、书实例、作者和体裁的数量
  const [
    numBooks,
    numBookInstance,
    numAvailableBookInstance,
    numAuthors,
    numGenres
  ] = await Promise.all([
    Book.countDocuments({}).exec(),
    BookInstance.countDocuments({}).exec(),
    BookInstance.countDocuments({status: 'Available'}).exec(),
    Author.countDocuments({}).exec(),
    Genre.countDocuments({}).exec(),
  ])
  res.render('index', {
    title: 'Local Library Home',
    book_count: numBooks,
    book_instance_count: numBookInstance,
    book_instance_available_count: numAvailableBookInstance,
    author_count: numAuthors,
    genre_count: numGenres
  })
})

// 显示完整的作者列表
exports.book_list = async function(req, res, next) {
  const list_books = await Book.find({}, "title author").populate('author').exec() 
  res.render('book_list', { title: 'Book List', book_list: list_books })
}
  
// 为每位作者显示详细信息的页面
exports.book_detail = asyncHandler(async(req, res, next) => {
  const [book, bookInstances] = await Promise.all([
    Book.findById(req.params.id).populate('author').populate('genre').exec(),
    BookInstance.find({ book: req.params.id }).exec()
  ])
  if (!book) {
    const err = new Error('Book not found')
    err.status = 404
    return next(err)
  }
  res.render('book_detail', {
    title: book.title,
    book,
    book_instances: bookInstances
  })
})
  
  // 由 GET 显示创建作者的表单
  exports.book_create_get = asyncHandler(async (req, res, next) => {
    const [authors, genres] = await Promise.all([
      Author.find().exec(),
      Genre.find().exec()
    ])
    res.render('book_form', {
      title: 'Create Book',
      authors,
      genres
    })
  })
  
  // 由 POST 处理作者创建操作
  exports.book_create_post = [
    asyncHandler((req, res, next) => {
      if (!(req.body.genre instanceof Array)) {
        if (typeof req.body.genre === "undefined") req.body.genre = [];
        else req.body.genre = new Array(req.body.genre);
      }
      next()
    }),
    body('title', 'Title must not be empty.').isLength({min: 1}).trim(),
    body('author', 'Author must not be empty.').isLength({min: 1}).trim(),
    body('summary', 'Summary must not be empty.').isLength({min: 1}).trim(),
    body('isbn', 'ISBN must not be empty.').isLength({ min: 1 }).trim(),

    body('*').trim().escape(),
    body('genre.*').escape(),

    asyncHandler(async (req, res, next) => {
      const errors = validationResult(req)
      const book = new Book({
        title: req.body.title,
        author: req.body.author,
        summary: req.body.summary,
        isbn: req.body.isbn,
        genre: req.body.genre
      })
      if (!errors.isEmpty()) {
        const [authors, genres] = await Promise.all([
          Author.find().exec(),
          Genre.find().exec()
        ])
        for (let i = 0; i < genres.length; i++) {
          if (book.genre.indexOf(genres[i]._id) > -1) {
            genres[i].checked = 'true'
          }
        }
        res.render('book_form', {
          title: 'Create Book',
          authors,
          genres,
          book,
          errors: errors.array()
        })
        return
      } else {
        await book.save()
        res.redirect(book.url)
      }
    })
  ]
  
  // 由 GET 显示删除作者的表单
  exports.book_delete_get = (req, res) => {
    res.send("未实现：作者删除表单的 GET");
  };
  
  // 由 POST 处理作者删除操作
  exports.book_delete_post = (req, res) => {
    res.send("未实现：删除作者的 POST");
  };
  
  // 由 GET 显示更新作者的表单
  exports.book_update_get = asyncHandler(async (req, res, next) => {
    const [book, authors, genres] = await Promise.all([
      Book.findById(req.params.id).populate('author').populate('genre').exec(),
      Author.find().exec(),
      Genre.find().exec()
    ])
    if (!book) {
      const err = new Error('Book not found');
      err.status = 404;
      return next(err)
    }
    for(let all_g_iter = 0; all_g_iter < genres.length; all_g_iter++) {
      for(let book_g_iter = 0; book_g_iter < book.genre.length; book_g_iter++) {
        if (genres[all_g_iter]._id.toString() === book.genre[book_g_iter]._id.toString()) {
          genres[all_g_iter].checked = 'true'
        }
      }
    }
    res.render('book_form', {
      title: 'Update Book',
      authors,
      genres,
      book
    })
  })
  
  // 由 POST 处理作者更新操作
  exports.book_update_post = [
    asyncHandler(async (req, res, next) => {
      if (!(req.body.genre instanceof Array)) {
        if (typeof req.body.genre === "undefined") req.body.genre = [];
        else req.body.genre = new Array(req.body.genre);
      }
      next();
    }),
    body("title", "Title must not be empty.").isLength({ min: 1 }).trim(),
    body("author", "Author must not be empty.").isLength({ min: 1 }).trim(),
    body("summary", "Summary must not be empty.").isLength({ min: 1 }).trim(),
    body("isbn", "ISBN must not be empty").isLength({ min: 1 }).trim(),
  
    // Sanitize fields.
    body("title").trim().escape(),
    body("author").trim().escape(),
    body("summary").trim().escape(),
    body("isbn").trim().escape(),
    body("genre.*").trim().escape(),

    asyncHandler(async (req, res, next) => {
      const errors = validationResult(req)
      const book = new Book({
        title: req.body.title,
        author: req.body.author,
        summary: req.body.summary,
        isbn: req.body.isbn,
        genre: typeof req.body.genre === "undefined" ? [] : req.body.genre,
        _id: req.params.id, //This is required, or a new ID will be assigned!
      })
      if (!errors.isEmpty()) {
        const [authors, genres] = await Promise.all([
          Author.find(),
          Genre.find()
        ])
        for (let i = 0; i < genres.length; i++) {
          if (book.genre.indexOf(genres[i]._id) > -1) {
            genres[i].checked = 'true'
          }
        }
        res.render('book_form', {
          title: "Update Book",
          authors,
          genres,
          book,
          errors: errors.array(),
        })
      } else {
        await Book.findByIdAndUpdate(req.params.id, book, {})
        res.redirect(book.url)
      }
    })
  ]

