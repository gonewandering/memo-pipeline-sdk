var assert = require('assert')
var Step = require('../Step')

describe('Step', () => {
  describe('#constructor()', () => {
    it('should initialize without errors', () => {
      let step = new Step({
        attributes: {
          type: 'test',
          step: 'console',
          completed: ''
        },
        data: Buffer.from(JSON.stringify({
          url: 'http://google.com'
        }))
      })

      console.log(step)

      assert(true)
    })
  })
})
