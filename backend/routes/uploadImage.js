const util = require('util')
const gc = require('../config/')
const bucket = gc.bucket('stevent-storage') // should be your bucket name

uploadImage = (file) => new Promise((resolve, reject) => {
  const { originalname, buffer } = file

  const blob = bucket.file(originalname.replace(/ /g, "_"))
  const blobStream = blob.createWriteStream({
    resumable: false
  })
  blobStream.on('finish', () => {
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    )
    resolve(publicUrl)
  })
  .on('error', () => {
    reject(`Unable to upload image, something went wrong`)
  })
  .end(buffer)
})

module.exports = function(app, datastore) {
  app.post('/uploadImage', async (req, res, next) => {
      try {
        const myFile = req.file
        const imageUrl = await uploadImage(myFile)
        res
          .status(200)
          .json({
            message: "Upload was successful",
            data: imageUrl
          })
      } catch (error) {
        next(error)
      }
    })
  }