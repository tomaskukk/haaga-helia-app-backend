const trafficRouter = require('express').Router()
const formidable = require('formidable')
const util = require('util')
const fs = require('fs')
const path = require('path')

// let numberOfDevices = 0

// var doc = new GoogleSpreadsheet('1oUYHjaw2t3ww-KfGEl90AVh6iFp7QdDQpafI341S_bQ');
const dirPath = 'C:/Users/tomsu/Desktop/docker-hhapp/haaga-helia-hpp-backend/public/img' 


trafficRouter.get('/picture', async (request, response) => {
  let imageName = ''
  fs.readdir(dirPath, (err, files) => {
    if (err) throw err;
      if (files.length !== 0) {
        imageName = files[0]
      } 
      response.send(imageName)
  })
})

trafficRouter.post('/picture', async (request, response) => {

  removeOldFiles(dirPath)

  const form = new formidable()
  form.uploadDir = dirPath

  form.on('fileBegin', (name, file) => {
    file.path = dirPath + '/' + file.name
  })
  form.parse(request, (err, fields, files) => {
    util.inspect({ fields: fields, files: files })
  })
  response.send('Picture saved succesfully')
})


const removeOldFiles = dirPath => {
  console.log('removing old files')
  fs.readdir(dirPath, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlinkSync(path.join(dirPath, file), err => {
        if (err) throw err;
      });
    }
  })
}

module.exports = trafficRouter