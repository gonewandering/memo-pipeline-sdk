var assert = require('assert')
var Pipeline = require('../lib/Pipeline')

const config = {
  config: {
    name: 'test',
    topic: 'memo-pipeline',
    steps: [
      {
        name: 'Test',
        fn: 'test',
        retries: 3
      }, {
        name: 'Zap',
        fn: 'test',
        retries: 3
      }
    ]
  },
  data: {
    url: 'http://zipzap.com'
  },
  actions: []
}

describe('Pipeline', () => {
  describe('Constructor()', () => {
    it('should initialize without errors', () => {
      let pipeline = new Pipeline(config)
      assert(true)
    })
  })

  describe('Next()', () => {
    it('Should run next() without errors', async () => {
      let pipeline = new Pipeline(config)
      await pipeline.next()
      assert(pipeline.data.riot)
    })
  })
})
