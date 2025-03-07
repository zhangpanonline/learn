const axios = require('axios').default
const cheerio = require('cheerio')
const Books = require('../models/Book')

const url = 'https://book.douban.com/latest?subcat=全部&p=2'

async function getBooksHTML() {
    const res = await axios.get(url)
    return res.data
}

async function getBookLinks() {
    const html = await getBooksHTML()
    const $ = cheerio.load(html)
    const list = $('.chart-dashed-list li .media__img a')
    const links = list.map((i, el) => el.attribs['href']).get()
    return links
}

async function getBookDetail(url) {
    const res = await axios.get(url)
    const $ = cheerio.load(res.data)
    const name = $('#wrapper > h1 > span').text().trim()
    const imgurl = $('#mainpic > a > img').attr('src')
    const author = $('#info > span:nth-child(1) > a').text()
    const publishDate = $('#info > span.pl').filter((i, el) => $(el).text().includes('出版年'))[0].nextSibling.nodeValue.trim()
    return {
        name, imgurl, author, publishDate
    }
}

async function fetchAll() {
    const links = await getBookLinks()
    return await Promise.all(links.map(getBookDetail))
}

save2DB()
async function save2DB() {
    const books = await fetchAll()
    await Books.bulkCreate(books)
    console.log('抓取成功')
}
