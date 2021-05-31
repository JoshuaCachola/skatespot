const s3 = require('../config/s3');
const async = require('neo-async');
import { v4 as uuidv4 } from 'uuid';
import { Upload } from '../types/Upload';

export const s3MultipleUpload = async (imgFiles: Array<Upload>) => {
  // return await Promise.all(imgFiles).then((files) => {
  //   let imgLinks: Array<any> = [];
  //   files.map(async (file) => {
  //     const { Location } = await s3
  //       .upload({
  //         Body: file.createReadStream(),
  //         Key: `${uuidv4()}`,
  //         ContentType: file.mimetype,
  //       })
  //       .promise();

  //     await new Promise(async (resolve, reject) => {
  //       if (Location) {
  //         resolve(imgLinks);
  //       } else {
  //         reject(undefined);
  //       }
  //     }).then((url) => {
  //       url && imgLinks.push(url);
  //       return imgLinks;
  //     });
  //   });
  // });

  const tasks = [
    function (imgFiles: Array<Upload>) {
      let imgLinks = [];
      imgFiles.map(async (file) => {
        const { Location } = await s3
          .upload({
            Body: file.createReadStream(),
            Key: `${uuidv4()}`,
            ContentType: file.mimetype,
          })
          .promise();

        await new Promise(async (res, rej) => {
          Location ? res(Location) : rej(undefined);
        }).then((url) => url && imgLinks.push(url));
      });
    },
  ];

  async.parallel(tasks, (err, res) => {});
};
