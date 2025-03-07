const fs = require("node:fs");
const path = require("node:path")

async function fn1() {
    const from = path.resolve(__dirname, '../../abc.txt')
    const to = path.resolve(__dirname, '../../abc1.txt')
    console.time('fn1')
    const rf = await fs.promises.readFile(from)
    const wf = await fs.promises.writeFile(to, rf)
    console.log(wf)
    console.timeEnd('fn1') 
}

async function fn2() {
    const from = path.resolve(__dirname, '../../abc.txt')
    const to = path.resolve(__dirname, '../../abc1.txt')

    const rs = fs.createReadStream(from)
    const ws = fs.createWriteStream(to)
    rs.pipe(ws)

    rs.on('close', () => {
        console.log('END')
    })
}

fn2()