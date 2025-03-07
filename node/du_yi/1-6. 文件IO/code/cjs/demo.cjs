const fs = require('node:fs')
const path = require('node:path')


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

    static async getFile(pathname) {
        return new Promise((res, rej) => {
            fs.stat(pathname, (err, stat) => {
                if (err) rej(err)
                const file = new File(pathname, path.basename(pathname), path.extname(pathname), stat.isFile(), stat.size, stat.birthtime, stat.mtime)
                res(file)
            })
        })
    }

    async getContent(isBuffer = false) {
        return new Promise(r => {
            if (this.isFile) {
                fs.readFile(this.filename, (err, res) => {
                    if (isBuffer) {
                        r(res)
                    } else {
                        r(res.toString('utf8'))
                    }
                })
            } else {
                return null
            }
        })
    }

    async getChildren() {
        return new Promise(r => {
            if (this.isFile) {
                r([])
            } else {
                fs.readdir(this.filename, (err, list) => {
                    const paths = list.map(async v => await File.getFile(path.resolve(this.filename, v)))
                    r(Promise.all(paths))
                })
            }
        })
    }
}


fn()
async function fn() {
    const res = await readDir(path.resolve(__dirname, '../../myfiles/sub'))
    console.log(res)
}

async function readDir(pathname) {
    const file = await File.getFile(pathname)
    return file.getChildren()
}
