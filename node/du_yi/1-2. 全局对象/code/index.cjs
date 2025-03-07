const path = require('node:path')


// path.dirname() 方法返回路径的目录名称,结尾目录分隔符将被忽略
console.log('path.dirname ===>', path.dirname(__filename)) // D:\code\video\03 node_code\1-2. 全局对象\code
// path.basename() 方法返回路径的最后一部分
console.log('path.basename ===>', path.basename(__filename)) // index.cjs
// path.extname() 方法返回路径的扩展名
console.log('path.extname ===>', path.extname(__filename)) // .cjs

// 当前模块的目录名称
console.log('__dirname ===>', __dirname, __dirname === path.dirname(__filename)) // D:\code\video\03 node_code\1-2. 全局对象\code true
// 当前模块的文件名。这是解析了符号链接的当前模块文件的绝对路径。
console.log('__filename ===>', __filename); // D:\code\video\03 node_code\1-2. 全局对象\code\index.cjs
