const exp = require('express');
const fs = require('fs');
const common = require('../common');
const route = exp.Router();

// 如果直接是浏览器访问,则重定向到登录页面
route.get('/answer.html', common.isSign, (req, res, next) => {
    next();
})

route.post('/api/user/answer', common.isSign, (req, res) => {
    var fileName = `questions/${req.body.question}.json`;
    req.body.time = new Date();
    req.body.ip = req.ip;
    req.body.petname = req.cookies.petname;
    var content = JSON.stringify(req.body);

    content = content.replace('/>/g', '&gt');
    content = content.replace('/</g', '&lt');
    var answer = JSON.parse(content);
    fs.readFile(fileName, (err, data) => {
        if (err) {
            common.send(res, 'file error', '回答问题失败')
        } else {
            // 把读出来的数据转换成问题对象
            var question = JSON.parse(data.toString());
            if (!question.answers) {
                question.answers = [];
            }
            question.answers.push(answer);
            fs.writeFile(fileName, JSON.stringify(question), (err) => {
                if (err) {
                    common.send(res, 'answer error','回答问题失败')
                }else{
                    common.send(res, 'success','回答问题成功')
                }
            })
        }
    })
})
module.exports = route;