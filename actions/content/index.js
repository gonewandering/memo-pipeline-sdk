const cheerio = require('cheerio')

module.exports = async function () {
  let $ = cheerio.load(this.data.body)
  let doc = {}
  let aHash = {}

  doc.headlines = []
  doc.paras = []
  doc.a = []
  doc.imgs = []

  doc.title = $('title').text()
  doc.meta = {}

  $('meta').each((i, d) => {
    let val = $(d).attr('content') || $(d).attr('value') || ''
    let key = $(d).attr('name') || $(d).attr('property')

    doc.meta[key] = val
  })

  doc.description = $('[type="description"],[property="og:description"]').attr('content') || ''
  doc.keywords = $('[type="keywords"],[property="og:keywords"]').attr('content') || ''

  $('h1,h2,h3').each((i, d) => {
    let txt = $(d).text()
    doc.headlines.push(txt)
  })

  $('p').each((i, d) => {
    let para = $(d).text()
    doc.paras.push(para)
  })

  $('img').each((i, d) => {
    let img = {
      alt: $(d).attr('alt') || '',
      src: $(d).attr('src') || '',
      title: $(d).attr('title') || ''
    }

    doc.imgs.push(img)
  })

  $('a').each((i, d) => {
    let a = {
      text: $(d).text() || '',
      href: $(d).attr('href') || '',
      target: $(d).attr('target') || ''
    }

    aHash[a.href] = aHash[a.href] || {
      href: a.href,
      count: 0,
      titles: []
    }

    aHash[a.href].count++
    aHash[a.href].titles.push(a.text)
  })

  let aArr = Object.values(aHash)

  aArr.sort((a, b) => {
    return a.count < b.count ? 1 : -1
  })

  doc.a = aArr
  doc.iframes = $('iframe').length
  doc.scripts = $('script').length
  doc.linkedFiles = $('link').length

  delete this.data.body
  this.data.content = doc
}
