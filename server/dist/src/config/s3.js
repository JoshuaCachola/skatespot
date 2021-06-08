"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const s3 = new aws_sdk_1.S3({
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
    region: process.env.REGION,
    params: {
        ACL: 'public-read',
        Bucket: process.env.AWS_BUCKET
    }
});
module.exports = s3;
//# sourceMappingURL=s3.js.map