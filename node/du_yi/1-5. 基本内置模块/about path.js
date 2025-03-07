const path = require("path");

// 1. 返回路径中的最后一部分（文件名）。第二个可选参数 用于去除文件扩展名。
console.log('path.basename() ===>', path.basename('/foo/bar/baz.txt')) // baz.txt
console.log('path.basename() ===>', path.basename('/foo/bar/baz.txt', '.txt')) // baz

// 2. 返回路径中的目录部分,不包含分隔符
console.log('path.dirname() ===>', path.dirname('/foo/bar/baz.txt')) // /foo/bar
console.log('path.dirname() ===>', path.dirname('/foo/bar/')) // /foo

// 3. 返回路径中文件的扩展名。
console.log('path.extname() ===>', path.extname('/foo/bar/baz.txt')) // .txt

// 4. 将多个路径拼接为一个路径，末尾不包含分隔符，自动处理路径分隔符。
console.log('path.join() ===>', path.join('a/b', '../', 'd.js')) // a\d.js
console.log('path.join() ===>', path.join('/foo', 'bar/', 'baz/asdf/', 'quux', '..')) // \foo\bar\baz\asdf

// 5. 将路径序列解析为绝对路径，从右到左依次处理每个路径片段，直到构建出一个绝对路径为止
console.log('path.resolve() ===>', path.resolve(__dirname, "./a.js")) // d:\code\video\03 node_code\1-5. 基本内置模块\a.js
console.log('path.resolve() ===>', path.resolve(__dirname, "../a.js")) // d:\code\video\03 node_code\a.js

// 6. 规范化路径，删除冗余的 . 和 ..，并根据当前操作系统替换路径分隔符。
console.log('path.normalize() ===>', path.normalize('/foo/bar//baz/asdf/quux/..')) // \foo\bar\baz\asdf  

// 7. 检查路径是否为绝对路径。
console.log('path.isAbsolute() ===>', path.isAbsolute('/foo/bar')) // true

// 8. path.relative(from, to) 返回从 from 路径到 to 路径的相对路径。
console.log('path.relative() ===>', path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb')) // ..\..\impl\bbb
console.log('path.relative() ===>', path.relative('/foo/bar/baz', '/foo/bar/qux')) // ..\qux

// 9. 将路径字符串解析为对象，包含 root、dir、base、ext 和 name 属性。
console.log('path.parse() ===>', path.parse('/foo/bar/qux/'))
// { root: '/', dir: '/foo/bar', base: 'qux', ext: '', name: 'qux' }
console.log('path.parse() ===>', path.parse('/home/user/dir/file.txt'))
//   {
//     root: '/',
//     dir: '/home/user/dir',
//     base: 'file.txt',
//     ext: '.txt',
//     name: 'file'
//   }

// 10. 将路径对象格式化为路径字符串，与 path.parse 相反。
console.log('path.format() ===>', path.format({ root: '/', dir: '/home/user/dir', base: 'file.txt' })) // /home/user/dir\file.txt
console.log('path.format() ===>', path.format({ root: '/', dir: '/foo/bar', base: 'qux', ext: '', name: 'qux' })) // /foo/bar\qux

// 11. 提供当前操作系统的路径分隔符（POSIX 为 '/'，Windows 为 '\'）。
console.log('path.sep ===>', path.sep); // \

// 12. 提供路径分隔符（环境变量中路径的分隔符），POSIX 为 :（冒号），Windows 为 ;（分号）。
console.log('path.delimiter ===>', path.delimiter) // ;
// console.log(process.env.PATH.split(path.delimiter))
//   [
//     'C:\\Users\\zhang\\bin',
//     'D:\\Soft\\Git\\mingw64\\bin',      
//     'D:\\Soft\\Git\\usr\\local\\bin',   
//     'D:\\Soft\\Git\\usr\\bin',
//     'D:\\Soft\\Git\\usr\\bin',
//     'D:\\Soft\\Git\\mingw64\\bin',      
//     'D:\\Soft\\Git\\usr\\bin',
//     'C:\\Users\\zhang\\bin',
//     'C:\\Users\\zhang\\AppData\\Local\\Programs\\cursor\\resources\\app\\bin',
//     'C:\\Program Files (x86)\\Common Files\\Oracle\\Java\\javapath',
//     'C:\\Windows\\system32',
//     'C:\\Windows',
//     'C:\\Windows\\System32\\Wbem',      
//     'C:\\Windows\\System32\\WindowsPowerShell\\v1.0',
//     'C:\\Windows\\System32\\OpenSSH',   
//     'C:\\Users\\15752\\AppData\\Roaming\\nvm',
//     'C:\\Program Files\\nodejs',        
//     'D:\\Soft\\Git\\cmd',
//     'C:\\Users\\zhang\\AppData\\Local\\Microsoft\\WindowsApps',
//     'C:\\program files\\esafenet\\cobra docguard client',
//     'C:\\Users\\15752\\AppData\\Roaming\\nvm',
//     'C:\\Program Files\\nodejs',        
//     'C:\\Users\\zhang\\AppData\\Local\\Programs\\cursor\\resources\\app\\bin',
//     'C:\\Users\\zhang\\AppData\\Local\\Programs\\cursor\\resources\\app\\bin',
//     'C:\\Users\\zhang\\AppData\\Local\\Microsoft\\WindowsApps',
//     'C:\\program files\\esafenet\\cobra docguard client',
//     'C:\\Users\\15752\\AppData\\Roaming\\nvm',
//     'C:\\Program Files\\nodejs',        
//     'C:\\Users\\zhang\\AppData\\Local\\Programs\\Microsoft VS Code\\bin',     
//     'D:\\Soft\\Git\\usr\\bin\\vendor_perl',
//     'D:\\Soft\\Git\\usr\\bin\\core_perl'
//   ] 





