const exp = require('express');
const fs = require('fs');
const common = require('../../common');
const route = exp.Router();

// 登录 
route.post('/api/user/signin', (req, res) => {
    var fileName = `users/${req.body.petname}.json`;
    fs.exists(fileName, (exists) => {
        if (exists) {
            fs.readFile(fileName, (err, data) => {
                if (err) {
                    common.send(res, 'sigin error', '登录失败')
                } else {
                    var user = JSON.parse(data.toString());
                    if (user.password == req.body.password) {
                        //    登录成功
                        res.cookie('petname', req.body.petname);
                        common.send(res, 'success', '登录成功')
                    } else {
                        common.send(res, 'password error', '密码错误')
                    }
                }
            })
        } else {
            //    文件不存在
            common.send(res, 'password error', '用户不存在')
        }
    })
})

// 退出登录
route.get('/api/user/signout', (req, res) => {
    res.clearCookie('petname');
    // 重定向到首页
    res.redirect('/')
})
module.exports = route;