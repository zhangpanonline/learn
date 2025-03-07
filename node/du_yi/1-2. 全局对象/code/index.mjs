import { setTimeout, setInterval } from "node:timers/promises";

// const res = setTimeout(100, 'setTimeout')
// console.log(res)
// const ac = new AbortController();
// const signal = ac.signal;

// try {
//     for await (const st of setInterval(1000, Date.now(), { signal })) {
//         console.log(st);
//         const n = Date.now()
//         console.log(n)
//         if (n - st > 10000) {
//             // ac.abort()
//             console.log("abort")
//         }
//     }
// } catch (error) {
//     console.log(error)
// }

// console.log(await res)

// 当前nodejs进程的工作目录，默认是启动nodejs进程的目录
console.log('process.cwd() ===>', process.cwd()) // D:\code\video\03 node_code

// 退出进程，process.exit 后面的代码不会执行
// process.exit(0)

// 获取命令中的所有参数
console.log('process.argv ===>', process.argv)
// [
//     'C:\\Program Files\\nodejs\\node.exe',
//     'D:\\code\\video\\03 node_code\\1-2. 全局对象\\code\\index.mjs',
//     'a',
//     'b',
//     'c'
// ]

// 获取编译 Node.js 二进制文件的操作系统平台的字符串
console.log('process.platform ===>', process.platform) // win32

// 环境变量
// console.log('process.env ===>', process.env)