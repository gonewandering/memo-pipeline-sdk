const {Storage} = require('@google-cloud/storage')
const storage = new Storage()
const bucket = storage.bucket('memo-data')

class StorageClass {
  constructor(pid, jid) {
    this.pid = pid
    this.jid = jid
    this.bucket = bucket
  }

  async exits(name) {
    let response
    let filename = `${ this.pid }/${ this.jid }/${ name }`

    try {
      response = await file.exists()
    } catch(e) {
      response = false
    }

    return response
  }

  async get(name) {
    let filename = `${ this.pid }/${ this.jid }/${ name }`
    let file = bucket.file(filename)

    let contents = await file.download()

    return contents
  }

  async set(name, contents) {
    let response
    let filename = `${ this.pid }/${ this.jid }/${ name }`
    let file = bucket.file(filename)

    try {
      response = await file.save(contents)
      await file.makePublic()
    } catch(e) {
      response = e
    }

    return response
  }
}

module.exports = StorageClass
