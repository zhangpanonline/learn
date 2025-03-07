// import fs from 'node:fs/promises'
// import { Buffer } from 'node:buffer'

// const filename = new URL('../../myfiles/1.txt', import.meta.url)


// await fs.writeFile(filename, 'abc12', { flag: 'a' })

// const buf = Buffer.from('AAAAAAAAAAA', 'utf8')
// await fs.writeFile(filename, buf) 

import fs from 'node:fs/promises'

const filename = new URL('../../myfiles/3.txt', import.meta.url)

// 覆盖
await fs.writeFile(filename, Buffer.from([97, 97, 97]))
// 追加
await fs.appendFile(filename, Buffer.from([98, 98, 98]))












console.log('SUCCESS')