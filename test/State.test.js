var assert = require('assert')
var State = require('../lib/State')

describe('State', () => {
  describe('Constructor()', () => {
    it('should initialize without errors', () => {
      let test, storage

      try {
        let state = new State('123', '345')
        test = true
      } catch(e) {
        test = false
        console.log(e)
      }

      assert(test)
    })
  })

  describe('Set()', () => {
    it('Should save a value successfully', async () => {
      let test
      let storage = new State('z123', 'z345')
      let buff = {dig: 'dog'}

      try {
        await storage.set(buff)
        test = true
      } catch(e) {
        test = false
      }

      assert(test)
    })
  })

  describe('Get()', () => {
    it('it should get a file successfully', async () => {
      let test, contents
      let storage = new State('123', '345')

      try {
        contents = await storage.get()
        test = true
      } catch(e) {
        test = false
        console.log(e)
      }

      assert(test)
    })
  })
})
