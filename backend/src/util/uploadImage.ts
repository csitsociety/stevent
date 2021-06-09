import { Storage } from '@google-cloud/storage'
import config from '../config'
import { v4 as uuidv4 } from 'uuid'

const storage = new Storage({
  projectId: config.projectId,
})

const bucket = storage.bucket(config.bucketName)

const uploadImage = (file: Express.Multer.File): Promise<string> =>
  new Promise((resolve, reject) => {
    const { originalname, buffer } = file
    const filename = `${uuidv4()}_${originalname.replace(/ /g, '_')}`
    const blob = bucket.file(filename)
    const blobStream = blob.createWriteStream({ resumable: false })
    blobStream
      .on('finish', () =>
        resolve(`https://storage.googleapis.com/${config.bucketName}/${blob.name}`)
      )
      .on('error', (e) => reject(e))
      .end(buffer)
  })

export default uploadImage
