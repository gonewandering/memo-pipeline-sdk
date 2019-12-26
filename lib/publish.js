const { PubSub } = require('@google-cloud/pubsub')
const config = require('../config')

const pubsub = new PubSub()

module.exports = function (topicName, data) {
  let topic = pubsub.topic(topicName)
  return topic.publishJSON(data)
}
