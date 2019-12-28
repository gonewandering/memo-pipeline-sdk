const { Firestore } = require('@google-cloud/firestore')
const db = new Firestore()

module.exports = function(collection, id, data) {
  let doc = db.collection(collection).doc(id)
  return doc.set(data, {merge: true})
}
