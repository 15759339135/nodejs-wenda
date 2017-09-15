const exp = require('express');
const fs = require('fs');
const common = require('../common');
const route = exp.Router();

route.get('/questions', (req, res) => {
    function readFiles(index, files, questions, callback) {
        if (index < files.length) {
            // 读文件
            fs.readFile(`questions/${files[index]}`, (err, data) => {
                if (!err) {
                    // 把读出来的文件内容写入到结果数组中
                    questions.push(JSON.parse(data.toString()));
                }
                index++;
                readFiles(index, files, questions, callback);
            })
        } else {
            //    文件读完,调用callback
            callback();
        }
    }
 

    // 读取文件夹
    fs.readdir('questions', (err, files) => {
        if (err) {
            common.send(res, 'file error', '获取数据失败')
        } else {
            var questions = [];
            readFiles(0, files, questions, function () {
                common.send(res, 'success', '获取数据成功', questions);
            })
        }
    })
})


module.exports = route;