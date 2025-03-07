var buf = Buffer.from('tobi', 'ascii')
console.log(buf) // <Buffer 74 6f 62 69>

/**
 * Node.js 目前支持的字符编码包括：
    ascii - 仅支持 7 位 ASCII 数据。如果设置去掉高位的话，这种编码是非常快的。
    utf8 - 多字节编码的 Unicode 字符。许多网页和其他文档格式都使用 UTF-8 。
    utf16le - 2 或 4 个字节，小字节序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）。
    ucs2 - utf16le 的别名。
    base64 - Base64 编码。
    latin1 - 一种把 Buffer 编码成一字节编码的字符串的方式。
    binary - latin1 的别名。
    hex - 将每个字节编码为两个十六进制字符。
 */
console.log(buf.toString('hex')) // 746f6269
console.log(buf.toString('base64')) // dG9iaQ==
console.log(buf.toString('utf8')) // tobi

/**
 * 创建 Buffer 类
    Buffer 提供了以下 API 来创建 Buffer 类，默认使用 UTF-8：
    Buffer.alloc(size[, fill[, encoding]])： 创建了一个长度为 size 字节的 Buffer，相当于申请了 size 字节的内存空间，每个字节的值为 0。
    Buffer.allocUnsafe(size)： 建了一个长度为 size 字节且未初始化的 Buffer，但 Buffer 中可能存在旧的数据，可能会影响执行结果，所以叫 unsafe。
    Buffer.allocUnsafeSlow(size)：用于分配给定大小 size 的新 Buffer 实例，但不对其进行初始化。
    Buffer.from(array)： 返回一个被 array 的值初始化的新的 Buffer 实例（传入的 array 的元素只能是数字，不然就会自动被 0 覆盖）
    Buffer.from(arrayBuffer[, byteOffset[, length]])： 返回一个新建的与给定的 ArrayBuffer 共享同一内存的 Buffer。
    Buffer.from(buffer)： 复制传入的 Buffer 实例的数据，并返回一个新的 Buffer 实例
    Buffer.from(string[, encoding])： 通过字符串创建 Buffer，可以指定编码，默认为 UTF-8。
 */
// 创建一个长度为 10、且用 0 填充的 Buffer。
console.log(Buffer.alloc(10)) // <Buffer 00 00 00 00 00 00 00 00 00 00>
// 创建一个长度为 10、且用十进制为50，16进制为 0x32填充的 Buffer
console.log(Buffer.alloc(10, 50)) // <Buffer 32 32 32 32 32 32 32 32 32 32>
// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill() 或 write() 重写
console.log(Buffer.allocUnsafe(10))
// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer
console.log(Buffer.from([1,2,3])) // <Buffer 01 02 03>
// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer
console.log(Buffer.from('tést')) // <Buffer 74 c3 a9 73 74>
console.log(Buffer.from('tést').toString()) // tést
// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
console.log(Buffer.from('tést', 'latin1')) // <Buffer 74 e9 73 74>

/**
 * 写入缓冲区：buf.write(string[, offset[, length]][, encoding]), 返回实际写入的大小。
 * string - 写入缓冲区的字符串。
 * offset - 缓冲区开始写入的索引值，默认为 0 
 * length - 写入的字节数，默认为 buffer.length
 * encoding - 使用的编码。默认为 'utf8' 
 */
console.log(Buffer.alloc(256).write('www.runoob.com')) // 14

/**
 * 从缓冲区读取数据：buf.toString([encoding[, start[, end]]])
 * encoding - 使用的编码。默认为 'utf8'
 * start - 指定开始读取的索引位置，默认为 0
 * end - 指定结束读取的索引位置，默认为缓冲区的末尾
 * 返回值：解码缓冲区数据并使用指定的编码返回字符串。
 */
buf = Buffer.alloc(26)
for (var i = 0 ; i < 26 ; i++) {
  buf[i] = i + 97 // 97 是 'a' 的十进制值
}
console.log(buf.toString()) // abcdefghijklmnopqrstuvwxyz

/**
 * 将 Buffer 转换为 JSON 对象：buf.toJSON()
 * 返回值：返回一个表示该 Buffer 实例的对象。
 * 当字符串化一个 Buffer 实例时，JSON.stringify() 会隐式地调用该 toJSON()。
 */
console.log(typeof buf.toJSON(), buf.toJSON())
// object {
//   type: 'Buffer',
//   data: [
//      97,  98,  99, 100, 101, 102,
//     103, 104, 105, 106, 107, 108,
//     109, 110, 111, 112, 113, 114,
//     115, 116, 117, 118, 119, 120,
//     121, 122
//   ]
// }
console.log(typeof JSON.stringify(buf), JSON.stringify(buf))
// string {"type":"Buffer","data":[97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122]}
console.log(JSON.parse(JSON.stringify(buf), (k, v) => {
   if (k && v.type === 'Buffer') {
      return Buffer.from(v.data)
   } else {
      return v
   }
}))
// {
//   type: 'Buffer',
//   data: [
//      97,  98,  99, 100, 101, 102,
//     103, 104, 105, 106, 107, 108,
//     109, 110, 111, 112, 113, 114,
//     115, 116, 117, 118, 119, 120,
//     121, 122
//   ]
// }

// 还有缓冲区合并、比较、拷贝等方法，具体参考官方文档 或 https://www.runoob.com/nodejs/nodejs-buffer.html