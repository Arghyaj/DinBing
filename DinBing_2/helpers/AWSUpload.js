const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const secret = require('../secret/secret');

AWS.config.update({
    accessKeyId: 'AKIAJRBDH4DZVDMIMXMA',
    secretAccessKey: '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',
    region: 'ap-south-1'
});

const s0 = new AWS.S3({});
const upload = multer({
    storage: multerS3({
        s3: s0,
        bucket: 'dinbing',
        acl: 'public-read',
        metadata: function(req, file, cb){
            cb(null, {fieldName: file.fieldname});
        },
        key: function(req, file, cb){
            cb(null, file.originalname);
        }
    }),

    rename: function (fieldname, filename) {
        return filename.replace(/\W+/g, '-').toLowerCase();
    }
})

exports.Upload = upload;
