const bookRouter = require('./book')
const bookinstanceRouter = require('./bookinstance')
const authorRouter = require('./author')
const genreRouter = require('./genre')

/// 藏书副本、藏书种类、作者的路由与藏书路由结构基本一致，只是无需获取主页 ///


module.exports.bookRouter = bookRouter
module.exports.bookinstanceRouter = bookinstanceRouter
module.exports.authorRouter = authorRouter
module.exports.genreRouter = genreRouter
