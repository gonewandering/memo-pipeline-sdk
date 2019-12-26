let language = require('@google-cloud/language')
const client = new language.LanguageServiceClient()

module.exports = async function () {
  let content = page.content

  const document = {
    content: content.paras.join(' '),
    type: 'PLAIN_TEXT'
  }

  let s = await client.analyzeSentiment({document: document})
  let e = await client.analyzeEntities({document: document})

  page.entities = e[0].entities
  page.sentiment = s[0]

  return page
}
