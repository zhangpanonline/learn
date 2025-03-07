// import fs from 'node:fs/promises'
// try {
//     const filename = new URL('../../myfiles/1.txt', import.meta.url)
//     const res = await fs.readFile(filename)
//     console.log(res.toString('utf-8'))


// } catch (error) {
//     console.error(error)
// }

import fs from 'node:fs/promises'
import url from 'node:url'
try {
    const filename = new URL('../../myfiles/2.txt', import.meta.url)
    console.log(url.fileURLToPath(filename))
    const res = await fs.readFile(filename, 'utf8')
    console.log(res)
} catch (error) {
    console.error(error)
}