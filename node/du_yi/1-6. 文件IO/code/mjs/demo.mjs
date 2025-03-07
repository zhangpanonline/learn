import fs from 'node:fs/promises'
import { URL, fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

class File {
    constructor(filename, name, ext, isFile, size, createTime, updateTime) {
        this.filename = filename
        this.name = name
        this.ext = ext
        this.isFile = isFile
        this.size = size
        this.createTime = createTime
        this.updateTime = updateTime
    }

    static async getFile(filename) {
        const stat = await fs.stat(filename)
        const name = path.basename(filename)
        const ext = path.extname(filename)
        return new File(filename, name, ext, stat.isFile(), stat.size, stat.birthtime, stat.mtime)
    }

    async getContent(isBuffer = false) {
        if (this.isFile) {
            if (isBuffer) {
                return await fs.readFile(this.filename)
            } else {
                return await fs.readFile(this.filename, 'utf8')
            }
        } else {
            return null
        }
    }

    async getChildren() {
        if (this.isFile) {
            return []
        } else {
           const paths = await fs.readdir(this.filename)
           const children = paths.map(name => {
            // const result = path.resolve(this.filename, name)
            const result = fileURLToPath(new URL(name, pathToFileURL(this.filename)))
            return File.getFile(result)
           })
           return Promise.all(children)
        }
    }
}
const filename = fileURLToPath(new URL('../../myfiles/sub/', import.meta.url))


const res = await readDir(filename)
console.log(res)

async function readDir(dirname) {
    const file = await File.getFile(dirname)
    return await file.getChildren()
    
}



