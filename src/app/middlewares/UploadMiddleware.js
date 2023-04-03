const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'image') {
            cb(null, path.join(__dirname, '../../public/img'));
        } else if (file.fieldname === 'audio') {
            cb(null, path.join(__dirname, '../../public/audio'));
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
module.exports = UploadMiddleware = multer({ storage: storage }).fields([
    { name: 'image', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
]);
