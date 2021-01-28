//https://github.com/GoogleCloudPlatform/nodejs-docs-samples/tree/master/functions/imagemagick

// Production
// gcloud functions deploy blurOffensiveImages \
//                                                     --runtime nodejs12 \
//                                                     --tempBucket stevent-backend-temp-image-store \
//                                                     --finalBucket stevent-backend-image-store \
//                                                     --projectId stevent-backend

// Development
// gcloud functions deploy blurOffensiveImages \
//                                                     --runtime nodejs12 \
//                                                     --trigger-bucket stevent-backend-temp-image-store-development \
//                                                     --set-env-vars = [finalBucket = stevent-backend-image-store-development, --projectId = stevent-development-rmit]
//                                                     

const gm = require('gm').subClass({imageMagick: true});
const fs = require('fs');
const {promisify} = require('util');
const path = require('path');
const vision = require('@google-cloud/vision');
const {Storage} = require('@google-cloud/storage');

const {finalBucket} = process.env;

const storage = new Storage();

const client = new vision.ImageAnnotatorClient();

exports.blurOffensiveImages = async event => {
  // This event represents the triggering Cloud Storage object.
  const object = event;

  const file = storage.bucket(object.bucket).file(object.name);
  const filePath = `gs://${object.bucket}/${object.name}`;

  console.log(`Analyzing ${file.name}.`);

  try {
    const [result] = await client.safeSearchDetection(filePath);
    const detections = result.safeSearchAnnotation || {};

    if (
      // Levels are defined in https://cloud.google.com/vision/docs/reference/rest/v1/AnnotateImageResponse#likelihood
      detections.adult === 'VERY_LIKELY' ||
      detections.violence === 'VERY_LIKELY'
    ) {
      console.log(`Detected ${file.name} as inappropriate.`);
      return await blurAndUpload(file, finalBucket, true);
    } else {
      console.log(`Detected ${file.name} as OK.`);
      return await blurAndUpload(file, finalBucket, false);
    }
  } catch (err) {
    console.error(`Failed to analyze ${file.name}.`, err);
    throw err;
  }
};
// [END functions_imagemagick_analyze]

// [START functions_imagemagick_blur]
// Blurs the given file using ImageMagick, and uploads it to another bucket.
const blurAndUpload = async (file, finalBucket, blur) => {
  const tempLocalPath = `/tmp/${path.parse(file.name).base}`;

  // Download file from bucket.
  try {
    await file.download({destination: tempLocalPath});

    console.log(`Downloaded ${file.name} to ${tempLocalPath}.`);
  } catch (err) {
    throw new Error(`File download failed: ${err}`);
  }

  if (blur) {
    await new Promise((resolve, reject) => {
        gm(tempLocalPath)
          .blur(0, 16)
          .write(tempLocalPath, (err, stdout) => {
            if (err) {
              console.error('Failed to blur image.', err);
              reject(err);
            } else {
              console.log(`Blurred image: ${file.name}`);
              resolve(stdout);
            }
          });
      });
  }
  // Upload result to a different bucket, to avoid re-triggering this function.

  // Upload the Blurred image back into the bucket.
  const gcsPath = `gs://${finalBucket}/${file.name}`;
  try {
    await storage.bucket(finalBucket).upload(tempLocalPath, {destination: file.name});
    console.log(`Uploaded image to: ${gcsPath}`);
  } catch (err) {
    throw new Error(`Unable to upload image to ${gcsPath}: ${err}`);
  }

  // Delete the temporary file.
  const unlink = promisify(fs.unlink);
  return unlink(tempLocalPath);
};