// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');
const pubsub = new PubSub()
const pp = require('../index')

async function topic() {
  try {
    const [topic] = await pubsub.createTopic('memo-pipeline')
    console.log(`Topic ${topic.name} created.`)
  } catch(e) { }
}

async function subscribe() {
  await topic()

  try {
    await pubsub.createSubscription('memo-pipeline', 'memo-subscription')
  } catch(e) { }

  const subscription = pubsub.subscription('memo-subscription')

  subscription.on('message', async function(message) {
    await pp(message)
    message.ack()
  })

  setTimeout(() => { subscription.close() }, 30000)
}

subscribe()
