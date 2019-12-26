const _ = require('underscore')
const request = require('request-native-promise')

module.exports = async function () {
  let defaults = {
    method: 'POST'
  }

  let req = _.({}, defaults, this.step.request || {} })

  let result = await request(req)
  this.re
  return
}
