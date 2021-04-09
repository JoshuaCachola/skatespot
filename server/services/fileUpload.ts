import multer from 'multer';
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';


aws.config.update({
  secretAccessKey: process.env.IAM_SECRET,
  accessKeyId: process.env.IAM_ACCESS_KEY,
  region: process.env.AWS_S3_REGION,
});

const s3 = new aws.S3();

const upload = (mediaType: 'image' | 'video') => {
  let key: string = null;
  if (mediaType === 'image') {
    key = Date.now().toString();
  } else if (mediaType === 'video') {
    key = `${Date.now().toString()}.mp4`;
  }

  return multer({
    storage: multerS3({
      s3,
    bucket: process.env.S3_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: "TESTING_METADATA" });
    },
    key: (req, file, cb) => {
      cb(null, `${key}`)
    },
    })
  })
};

module.exports = upload;