const { Firestore } = require('@google-cloud/firestore')
const db = new Firestore()

class StateClass {
  constructor(pid, jid) {
    this.pid = pid
    this.jid = jid
    this.doc = db.collection(this.pid).doc(this.jid)
  }

  async get(key) {
    let results = await this.doc.get()
    let data = results.data()

    return key ? data[key] : data
  }

  async set(data) {
    try {
      await this.doc.set(data, { merge: true })
    } catch(e) {
      console.log(e)
    }

    return
  }
}

module.exports = StateClass
