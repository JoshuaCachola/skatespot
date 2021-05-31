const s3 = require('../config/s3');
import { v4 as uuidv4 } from 'uuid';
import { Upload } from '../types/Upload';

export const s3MultipleUpload = async (imgFiles: Array<Upload>, imgLinks: Array<string>) => {
  return await Promise.all(imgFiles).then((files) => {
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
      // imgLinks.push(await Location);
    });
  });

  // let imgLinks: Array<string> = [];
  // const tasks = [
  //   async function (done: any) {
  //     await Promise.all(imgFiles).then((files) => {
  //       files.forEach(async (file: Upload) => {
  //         const { Location } = await s3
  //           .upload({
  //             Body: file.createReadStream(),
  //             Key: `${uuidv4()}`,
  //             ContentType: file.mimetype,
  //           })
  //           .promise();

  //         await new Promise(async (res, rej) => {
  //           if (Location) {
  //             res(Location);
  //           } else {
  //             rej(undefined);
  //           }
  //         }).then((url) => url && imgLinks.push(url as string));
  //       });
  //     });
  //     setTimeout(() => done(null), 5000);
  //   },

  //   function (done: any) {
  //     // console.log(imgLinks);
  //     done(null, imgLinks);
  //   },
  // ];

  // async.parallel(tasks, (err: any, res: any) => {
  //   console.log('err', err);
  //   return res;
  // });
};
