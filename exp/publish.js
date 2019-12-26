const { PubSub } = require('@google-cloud/pubsub')
const pubsub = new PubSub()
const top = pubsub.topic('memo-pipeline')
const sha = require('sha.js')

const pipeline = {
  name: 'default pipeline',
  retries: 5,
  collection: 'pages',
  steps: [
    {
      name: 'Scrape',
      func: 'scrape',
      retries: 4,
      save: false
    },
    {
      name: 'Get Content',
      func: 'content',
      retries: 4,
      save: true
    }
  ]
}

const url = 'https://www.wired.com/story/the-year-humanity-declared-war-on-microplastics/'

const data = {
  id: sha('sha256').update(url).digest('hex'),
  _pipeline: pipeline,
  url: url
}

top.publishJSON(data)
