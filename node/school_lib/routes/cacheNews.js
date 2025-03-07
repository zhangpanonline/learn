const client = require('../redis')

module.exports = function (opt = {}) {
  return async (req, res, next) => {
    const key = req.originalUrl

    const content = await client.get(key)
    if (content) {
      res.send(JSON.parse(content))
      console.log(
        '使用了sedis缓存：',
        key,
        '过期时间：',
        await client.sendCommand(['TTL', key])
      )
    } else {
      const chunks = []
      const defaultWrite = res.write.bind(res)
      const defaultEnd = res.end.bind(res)
      res.write = function (chunk, ...args) {
        chunks.push(chunk)
        defaultWrite(chunk, ...args)
      }
      res.end = async function (chunk, ...args) {
        defaultEnd(chunk, ...args)
        if (chunk) {
          chunks.push(chunk)
        }
        const body = chunks.map((v) => v.toString('utf8')).join()
        await client.set(key, body)
        await client.expire(key, opt.ttl)
      }
      next()
    }
  }
}
