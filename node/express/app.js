var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const compression = require('compression')
var helmet = require('helmet');

const mongoose = require("mongoose");
const mongoDB = "mongodb+srv://zhangpanhtml:SEUMKhPi1cbLYsJJ@cluster0.hmj1wlt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB 连接错误："));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const catalogRouter = require('./routes/catalog')

var app = express();

// view engine setup 设置视图引擎
// 指定模板的存储文件夹
app.set('views', path.join(__dirname, 'views'));
// 指定模板库
app.set('view engine', 'pug');

app.use(compression())
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public',express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter.genreRouter);
app.use('/catalog', catalogRouter.bookRouter);
app.use('/catalog', catalogRouter.bookinstanceRouter);
app.use('/catalog', catalogRouter.authorRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
