const MediaRepository = require('./../repositories/mediaRepository');
// TODO Divide into two different files
module.exports = {
    async deleteMediaFile(url, next) {
        try {
            if (url !== 'ERROR Media.js 22') {
                const result = await MediaRepository.deleteMedia(url.split('/')[7]);
            }
        } catch (err) {
            if (err instanceof myError) return next(err);
            // TODO superfluous else
            else return next(new myError(500, err.message));
        }
    },

    async addMediaFile(fileUrl, req, next) {
        try {
            if (req.files.textFile) {
                const media_url = await MediaRepository.addMedia(req.files.textFile.data)
                return media_url.url
            }
            // TODO superfluous else
            else if (fileUrl) return fileUrl
            // TODO superfluous else
            else return 'ERROR Media.js 22'
        } catch (err) {
            if (err instanceof myError) return next(err);
            // TODO superfluous else
            else return next(new myError(500, err.message));
        }
    },
}
