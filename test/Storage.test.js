var assert = require('assert')
var Storage = require('../lib/Storage')

describe('Storage', () => {
  describe('Constructor()', () => {
    it('should initialize without errors', () => {
      let test, storage

      try {
        let storage = new Storage('123', '345')
        test = true
      } catch(e) {
        test = false
        console.log(e)
      }

      assert(test)
    })
  })

  describe('Set()', () => {
    it('Should save a file successfully', async () => {
      let test
      let storage = new Storage('123', '345')
      let buff = 'This is a zap'

      try {
        await storage.set('test', buff)
        test = true
      } catch(e) {
        test = false
        console.log(e)
      }

      assert(test)
    })
  })

  describe('Get()', () => {
    it('it should get a file successfully', async () => {
      let test, contents
      let storage = new Storage('123', '345')
      try {
        contents = await storage.get('test')
        test = true
      } catch(e) {
        test = false
        console.log(e)
      }

      assert(test)
    })
  })
})
