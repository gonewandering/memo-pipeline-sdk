const _ = require('underscore')
const request = require('request-promise-native')

module.exports = async function () {
  let defaults = {
    method: 'POST'
  }

  let req = this.step.request

  let result = await request(req)

  return
}
