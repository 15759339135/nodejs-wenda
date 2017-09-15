// 上传文件配置
const multer = require('multer');

var storage = multer.diskStorage({
    destination: './wwwroot/images',
    filename: function (req, file, cb) {
        var petname = req.cookies.petname;
        // var arr = file.originalname.split('.');
        // var extendName = arr[arr.length - 1];
        cb(null, petname + '.' + 'png');
    }
})

module.exports = multer({storage});