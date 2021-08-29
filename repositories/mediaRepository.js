// TODO don`t use var 
var cloudinary = require('cloudinary');

const config = require('../config');

const cloud = config["cloudinary"];

cloudinary.config({
  cloud_name: cloud["cloud_name"],
  api_key: cloud["api_key"],
  api_secret: cloud["api_secret"]
});

module.exports = {
  async addMedia(buffer) {
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream(
          { resource_type: 'raw' },
          (err, result) => {
            if (err) {

              reject(err);
            } else {

              resolve(result);
            }
          })
        .end(buffer);
    });
  }

  // async deleteMedia(public_id) {
  //   return await cloudinary.v2.uploader.destroy(public_id, { resource_type: 'raw' }, function (error, result) { console.log(result, error); })
  // }

}
