const request = require('request-promise-native')

module.exports = async function () {
  this.data.body = await request.get(this.data.url)
}
