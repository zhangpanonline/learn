// import fs from 'node:fs/promises'
// import { URL } from 'node:url'

// const dirname = new URL('../../myfiles', import.meta.url)

// const pathes = await fs.readdir(dirname)


// console.log(pathes) // [ '1', '1.jpeg', '1.txt', '2.txt' ]

// console.log(URL === globalThis.URL) // true

import fs from 'node:fs/promises'

const dirname = new URL('../../myfiles', import.meta.url)

// fs.readdir(dirname, (err, list) => {
//     console.log(err, list)
// })

const list = await fs.readdir(dirname)
console.log(list)
