const exp = require('express');
const fs = require('fs');
const common = require('../common');
const route = exp.Router();


route.get('/ask.html',common.isSign,(req,res,next)=>{
    next();
  })

route.post('/api/user/ask',common.isSign,(req,res)=>{
    var time = new Date();
    req.body.ip = req.ip;//提问者的ip
    req.body.time = time;//提问时间
    req.body.petname = req.cookies.petname;//记录提问者
    var content = JSON.stringify(req.body);
    content = content.replace(/>/g,'&gt;');
    content = content.replace(/</g,'&lt;');

    // 提问问题的文件按照时间戳存储
    var fileName = `questions/${time.getTime()}.json`;

    function saveFile() {
        fs.writeFile(fileName,content,(err)=>{
            if (err) {
                common.send(res,'ask error','提问问题失败！')
            }else{
                common.send(res,'success','提问问题成功！')
            }
        })
    }

    fs.exists('questions',(exists)=>{
        if (exists) {
            saveFile()
        }else{
            fs.mkdir('questions',(err)=>{
                if (err) {
                    common.send(res,'file error','提问问题失败！')
                }else{
                    saveFile()
                }
            })
        }
    })
})

module.exports = route;
