const uuidv4 = require('uuid/v4')
const sha = require('sha.js')
const _ = require('underscore')

const actions = require('../actions')
const save = require('../lib/save')
const publish = require('../lib/publish')

class Pipeline {
  constructor(cnf) {
    Object.assign(this, cnf)

    this.actions = _.extend({}, actions, cnf.actions || {})
    !this.data.id && this.id()

    this.save = save.bind(this, cnf.config.name)
  }

  id() {
    if (!this.data.id) {
      let id = Math.round(Math.random() * 1000000000000000)
      this.data.id = sha('sha256').update(id.toString()).digest('hex')
    }

    return this.data.id
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
      next.retries = step.retries > 0 ? step.retries - 1 : 0
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
