const functions = require('firebase-functions')
const axios = require('axios')
const request = require("request");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const token = '380d5b104e68b4171f84b6226b1c9704:77e36d0f1e1c3f04ac10ca4b95e93026'
const basicToken = 'MzgwZDViMTA0ZTY4YjQxNzFmODRiNjIyNmIxYzk3MDQ6NzdlMzZkMGYxZTFjM2YwNGFjMTBjYTRiOTVlOTMwMjY='

exports.helloWorld = functions.https.onRequest((req, res) => {
  const config = {
    headers: {'Authorization': "Basic " + basicToken}
  }
  axios
   .get('https://havelithreads.myshopify.com/admin/orders.json', config)
   .then(response => {
     if (response.status === 200){
       return res.send(response.data)
     } else {
       return res.send('Error getting shopify orders')
     }
   }).catch(error => {
     return res.send('Error', error)
   })

})


exports.processQueueEvent = functions
                             .firestore
                             .document('queue/{eventId}')
                             .onCreate((snapshot, context) => {

                               const event = snapshot.data()
                               const action = event.action
                               const data = event.data
                               const config = {
                                 headers: {'Authorization': "Basic " + basicToken}
                               }

                               return axios
                                      .get('https://havelithreads.myshopify.com/admin/orders.json', config)
                                      .then(response => {
                                        if (response.status === 200){
                                          return Promise.resolve(1)
                                        } else {
                                          return Promise.resolve(-1)
                                        }
                                      }).catch(error => {
                                        return Promise.resolve(-1)
                                      })
                             })
