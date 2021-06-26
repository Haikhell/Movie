const MediaRepository = require('./../repositories/mediaRepository');

module.exports = {
    async deleteMediaFile(url, next) {
        try {
            if (url !== './../../images/anonim.png') {
                const result = await MediaRepository.deleteMedia(url.split('/')[7]);
            }
        } catch (err) {
            if (err instanceof myError) return next(err);
            else return next(new myError(500, err.message));
        }
    },

    async addMediaFile(fileUrl, req, next) {
        try {
            if (req.files.textFile) {
                const media_url = await MediaRepository.addMedia(req.files.textFile.data)
                return media_url.url
            }
            else if (fileUrl) return fileUrl
            else return 'ERROR Media.js 22'
        } catch (err) {
            if (err instanceof myError) return next(err);
            else return next(new myError(500, err.message));
        }
    },
}