const os = require("os");

/**
 * Node.js os 模块提供了一些基本的系统操作函数。
 * os 模块是 Node.js 的内置模块之一，用于获取操作系统的相关信息，如平台、CPU、内存、网络接口等。
 * os 模块中的方法可以帮助开发者在跨平台环境中适配和监控系统信息，确保程序运行在各种操作系统上。
 */

// 1. 返回当前操作系统的行尾标识符（\n 或 \r\n），方便处理跨平台的文件读写。
console.log('os.EOL ===>',  JSON.stringify(os.EOL)); // "\r\n"

// 2. 返回操作系统的 CPU 架构。
console.log('os.arch() ===>', os.arch()); // x64

// 3. 返回包含操作系统特定常量的对象（如错误码、信号等）。
// console.log('os.constants ===>', os.constants)

// 4. 返回一个对象数组，每个对象包含 CPU 内核的信息，如型号、速度、使用情况等。
// console.log('os.cpus ===>', os.cpus())

// 5. 返回 CPU 的字节序（BE 表示大端字节序，LE 表示小端字节序）。
console.log('os.endianness() ===>', os.endianness())

// 6. 返回系统的空闲内存量（以字节为单位），可用于监控系统资源。
console.log('os.freemem() ===>', os.freemem()) // 3722973184

// 7. 返回当前用户的主目录路径。
console.log('os.homedir() ===> ', os.homedir()) // C:\Users\zhang

// 8. 返回主机名。
console.log('os.hostname() ===>', os.hostname()) // DESKTOP-45FMU3R

// 9. 返回一个包含 1、5 和 15 分钟平均负载的数组，仅在 Unix 系统上有效。
console.log('os.loadavg() ===>', os.loadavg()) // [ 0, 0, 0 ]

// 10. 返回一个对象，包含每个网络接口的地址信息，如 IP 地址、MAC 地址。
// console.log('os.networkInterfaces() ===>', os.networkInterfaces())
//    {
//     '以太网': [
//       {
//         address: 'fe80::9d0f:255f:a2d7:d643',
//         netmask: 'ffff:ffff:ffff:ffff::',
//         family: 'IPv6',
//         mac: 'd0:f4:05:1b:2d:39',
//         internal: false,
//         cidr: 'fe80::9d0f:255f:a2d7:d643/64',
//         scopeid: 14
//       },
//       {
//         address: '192.100.4.103',
//         netmask: '255.255.255.0',
//         family: 'IPv4',
//         mac: 'd0:f4:05:1b:2d:39',
//         internal: false,
//         cidr: '192.100.4.103/24'
//       }
//     ],
//     'Loopback Pseudo-Interface 1': [
//       {
//         address: '::1',
//         netmask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff', 
//         family: 'IPv6',
//         mac: '00:00:00:00:00:00',
//         internal: true,
//         cidr: '::1/128',
//         scopeid: 0
//       },
//       {
//         address: '127.0.0.1',
//         netmask: '255.0.0.0',
//         family: 'IPv4',
//         mac: '00:00:00:00:00:00',
//         internal: true,
//         cidr: '127.0.0.1/8'
//       }
//     ]
//   }

// 11. 返回操作系统平台的标识符，而不是特指操作系统的位数，如 'darwin'、'win32'、'linux' 等。
console.log('os.platform() ===> ', os.platform()) // win32

// 12. 返回操作系统的发行版本。
console.log('os.release() ===> ', os.release()) // 10.0.22631

// 13. 返回操作系统默认的临时文件目录路径。
console.log('os.tmpdir() ===>', os.tmpdir()) // C:\Users\zhang\AppData\Local\Temp

// 14. 返回系统总内存量（以字节为单位）。
console.log('os.totalmem() ===> ', os.totalmem()) // 16828239872

// 15. 返回操作系统的名称，如 'Linux'、'Darwin'（macOS）、'Windows_NT' 等
console.log('os.type() ===>', os.type()) // Windows_NT

// 16. 返回操作系统运行时间，以秒为单位。
console.log('os.uptime() ===>', os.uptime()) // 11724.906

// 17. 返回当前用户的详细信息，如用户名、主目录、UID、GID 等。支持配置 options 对象，可设置字符编码（默认是 'utf8'）。
console.log('os.userInfo() ===>', os.userInfo())
//   {
//     uid: -1,
//     gid: -1,
//     username: 'zhang',
//     homedir: 'C:\\Users\\zhang',
//     shell: null
//   }
