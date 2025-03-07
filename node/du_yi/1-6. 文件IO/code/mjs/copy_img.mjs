// import fs from 'node:fs/promises'

import { fileURLToPath } from "url";

// const fromFileName = new URL('../../myfiles/1.jpeg', import.meta.url)

// const buffer = await fs.readFile(fromFileName)

// const toFileName = new URL('../../myfiles/1.copy.jpeg', import.meta.url)

// await fs.writeFile(toFileName, buffer)
// console.log('SUCCESS')

// console.log(new URL(import.meta.url).href) // file:///D:/code/video/03%20node_code/1-6.%20%E6%96%87%E4%BB%B6IO/code/mjs/copy_img.mjs
// console.log(new URL('./', import.meta.url).href) // file:///D:/code/video/03%20node_code/1-6.%20%E6%96%87%E4%BB%B6IO/code/mjs/
// console.log(new URL('../', import.meta.url).href) // file:///D:/code/video/03%20node_code/1-6.%20%E6%96%87%E4%BB%B6IO/code/

console.log(fileURLToPath(new URL(import.meta.url)) === fileURLToPath(import.meta.url)) // true

console.log(JSON.stringify(import.meta.url))
console.log(new URL(import.meta.url).toString())

console.log('__dirname ===>', fileURLToPath(new URL('./', import.meta.url)))
console.log('__filename ===>', fileURLToPath(import.meta.url))