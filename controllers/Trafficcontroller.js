// const trafficRouter = require('express').Router()
// const fs = require('fs')
// // var GoogleSpreadsheet = require('google-spreadsheet');
// // var creds = require('../client_secret.json');

// // let numberOfDevices = 0

// // var doc = new GoogleSpreadsheet('1oUYHjaw2t3ww-KfGEl90AVh6iFp7QdDQpafI341S_bQ');


// // trafficRouter.get('/traffic', async (request, response) => {

// //     response.send(numberOfDevices.toString())
// // })

// // trafficRouter.get('/:maara', async (request, response) => {
// //     try {
// //         console.log(`${request.params.maara} devices found nearby`)
// //         numberOfDevices = request.params.maara

// //         doc.useServiceAccountAuth(creds, function (err) {
// //             doc.addRow(1, { Date: new Date().toTimeString().substr(0, 8).toString(), 
// //                 NumberOfDevices: numberOfDevices }, function(err) {
// //               if(err) {
// //                 console.log(err);
// //               }
// //             });
// //           });

// //         fs.appendFile('traffic.txt', '\n' + new Date().toTimeString() + " " + 
// //         numberOfDevices.toString() + " devices found", (err) => {
// //           if (err) throw err;
// //         })

// //         response.send(numberOfDevices.toString())
// //     } catch (exception) {
// //         console.log(exception)
// //         response.status(500).json({ error: 'something went wrong' })
// //     }
// // })

// // module.exports = trafficRouter