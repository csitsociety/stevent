const { Storage } = require('@google-cloud/storage');
const config = require('./config');
const { v4: uuidv4 } = require('uuid');

const storage = new Storage({
	projectId: config.projectId,
});

const bucket = storage.bucket(config.uploadBucketName);

const uploadImage = (file) => new Promise((resolve, reject) => {
	const { originalname, buffer } = file;
	const filename = `${uuidv4()}_${originalname.replace(/ /g, "_")}`;
	const blob = bucket.file(filename);
	const blobStream = blob.createWriteStream({
		resumable: false
	});
	blobStream
		.on('finish', () => resolve(`https://storage.googleapis.com/${config.accessBucketName}/${blob.name}`))
		.on('error', (e) => reject(e))
		.end(buffer);
});

module.exports = uploadImage;
