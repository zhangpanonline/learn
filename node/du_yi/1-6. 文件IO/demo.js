const fs = require('fs')
const util = require('util')
const path = require('path')
const os = require("os");
const filename = path.resolve(__dirname, './myfiles/1.txt')
const filename2 = path.resolve(__dirname, './myfiles/sub/2.txt')

/**
 * 读取文件
 */

// fs.readFile(path.resolve(__dirname, './myfiles/1.txt'), 'utf-8', (err, res) => {
//     console.log(res, '222')
// })
// fs.readFile(path.resolve(__dirname, './myfiles/1.txt'), (err, res) => {
//     console.log(res.toString('utf-8'), '333')
// })

// Sync函数是同步的，会导致JS运行阻塞，一般在程序启动时运行有限的次数即可
// const res = fs.readFileSync(path.resolve(__dirname, './myfiles/1.txt'), 'utf-8')
// console.log(res, '111')

async function fn() {
    const res = await fs.promises.readFile(path.resolve(__dirname, './myfiles/1.txt'), 'utf-8')
    console.log(res, '444')
}
/**
 * 写入文件
 */
// f1()
async function f1() {
    const res = await fs.promises.writeFile(filename, `1${os.EOL}2`, {flag: 'a'})
    console.log(res, '555')
    fn()
}

// f2()
async function f2() {
    try {
        const buffer = Buffer.from(`abcdef${os.EOL}`, 'utf-8')
        await fs.promises.writeFile(filename2, buffer, { flag: 'a' })
        const res = await fs.promises.readFile(filename2, 'utf-8')
        console.log(res, '666')
    } catch (error) {
        console.log(error, 'error')
    }
}

/**
 * 手动复制文件
 */
// f3() 
async function f3() {
    const fromFile = path.resolve(__dirname, './myfiles/1.jpeg')
    const buffer = await fs.promises.readFile(fromFile)
    console.log(buffer)
    const toFile = path.resolve(__dirname, './myfiles/1.copy.jpeg')
    await fs.promises.writeFile(toFile, buffer)
}
/** 获取文件或目录信息 fs.stat
 * 
 */
// f4()
async function f4() {
    const res1 = await fs.promises.stat(path.resolve(__dirname, './myfiles/1.jpeg'))
    console.log(res1)
    // {
    //     dev: 441543861,
    //     mode: 33206,
    //     nlink: 1,
    //     uid: 0,
    //     gid: 0,
    //     rdev: 0,
    //     blksize: 4096,
    //     ino: 562949953578719,
    //     size: 13305,
    //     blocks: 32,
    //     atimeMs: 1723771339862.5334,
    //     mtimeMs: 1628138605000,
    //     ctimeMs: 1723186419292.7527,
    //     birthtimeMs: 1723186419291.605,
    //     atime: 2024-08-16T01:22:19.863Z,
    //     mtime: 2021-08-05T04:43:25.000Z,
    //     ctime: 2024-08-09T06:53:39.293Z,
    //     birthtime: 2024-08-09T06:53:39.292Z
    //   }
    const res2 = await fs.promises.stat(path.resolve(__dirname, './myfiles/'))
    console.log(res1.isFile(), res2.isDirectory()) // true true
}

/** 
 * 获取目录中的子文件和子目录
 */
// fn5()
async function fn5() {
    const res = await fs.promises.readdir(path.resolve(__dirname, './myfiles'))
    console.log(res) // [ '1.copy.jpeg', '1.jpeg', '1.txt', '2.txt', 'sub' ]
}
/**
 * 创建目录
 */
fn6()
async function exist(path) {
    try {
        await fs.promises.stat(path)
        // 文件存在
        return true
    } catch (error) {
        if (error.code === 'ENOENT') {
            // 文件不存在
            return false
        }
        return error
    }
}
async function fn6() {
    // const res = await fs.promises.mkdir(path.resolve(__dirname, './myfiles/1'))
    // console.log(res)
    console.log(await exist(path.resolve(__dirname, './myfiles/1')))
}

/**
 * 练习：读取一个目录中的所有子目录和文件
 */