const uuidv4 = require('uuid/v4')
const sha = require('sha.js')
const _ = require('underscore')

const Storage = require('./Storage')
const State = require('./State')

const actions = require('../actions')
const publish = require('../lib/publish')

const { PubSub } = require('@google-cloud/pubsub')
const pubsub = new PubSub()

class Pipeline {
  constructor(cnf) {
    Object.assign(this, cnf)

    let id = Math.round(Math.random() * 1000000000000000)
    this.config.pid = this.config.pid || sha('sha256').update(this.config.name).digest('hex')
    this.config.jid = this.config.jid || sha('sha256').update(id.toString()).digest('hex')

    this.actions = _.extend({}, actions, cnf.actions || {})

    this.storage = new Storage(this.config.pid, this.config.jid)
    this.state = new State(this.config.pid, this.config.jid)
  }

  async init() {
    try {
      await pubsub.createTopic(this.config.topic || this.config.name)
    } catch(e) { }
  }

  incomplete() {
    return this.config.steps.filter(d => {
      if (!d.complete && d.retries > 0) { return true }
      else { return false }
    }) || []
  }

  async next() {
    let next = this.step || this.incomplete()[0]
    if (!next) { return }

    let action = this.actions[next.fn || next.name]
    if (!action) { return }

    try {
      await action.bind(this)(next)
      next.complete = true
    } catch(e) {
      next.errors = e.toString()
      next.retries = next.retries > 0 ? next.retries - 1 : 0
    }

    await this.publish()

    return next
  }

  async publish() {
    let inc = this.incomplete()

    let data = {
      config: this.config,
      data: this.data
    }

    if (inc.length > 0) {
      await publish(this.config.topic || this.config.name, data)
    }

    return true
  }
}

module.exports = Pipeline
