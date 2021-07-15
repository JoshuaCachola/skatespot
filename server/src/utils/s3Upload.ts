const s3 = require('../config/s3');
import { v4 as uuidv4 } from 'uuid';
import { Upload } from '../types/Upload';

export const s3MultipleUpload = async (imgFiles: Array<Upload>, imgLinks: Array<string>) => {
  await Promise.all(imgFiles).then((files) => {
    files.forEach(async (file) => {
      const { Location } = await s3
        .upload({
          Body: file.createReadStream(),
          Key: `${uuidv4()}`,
          ContentType: file.mimetype,
        })
        .promise();

      return new Promise(async (res) => {
        if (Location) {
          imgLinks.push(Location);
          setTimeout(res, 1000);
        }
      });
    });

    return imgLinks;
  });
};

export const s3Upload = async (imgFile: Upload) => {
  const { Location } = await s3
    .upload({
      Body: imgFile.createReadStream(),
      Key: `${uuidv4()}`,
      ContentType: imgFile.mimetype,
    })
    .promise();

  return Location as string;
};
