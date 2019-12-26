const uuidv4 = require('uuid/v4')
const actions = require('../actions')
const sha = require('sha.js')

const save = require('../lib/save')
const publish = require('../lib/publish')

class Pipeline {
  constructor(cnf) {
    this.pipeline = cnf.pipeline
    this.data = cnf.data
    this.actions = _.extend({}, actions, cnf.actions || {})
    !this.data.id && this.id()
  }

  id() {
    this.data.id = sha(method).update(id.toString()).digest('hex')
  }

  incomplete() {
    return this.steps.filter(d => {
      if (!d.complete && d.retries > 0) { return true }
      else { return false }
    }) || []
  }

  async next() {
    let next = this.incomplete()[0]
    if (!next) { return }

    let action = steps[next.fn || next.name]
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
      pipeline: this.pipeline,
      data: this.data
    }

    if (inc.length > 0) {
      await publish('memo-pipeline', data)
    }

    return true
  }
}

module.exports = Pipeline
