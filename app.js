const exp = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require('multer');


const app = exp();


app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

app.use(require('./routers/user/register'));
app.use(require('./routers/user/sign'))
app.use(require('./routers/user/photo'))
app.use(require('./routers/ask'));
app.use(require('./routers/index'));
app.use(require('./routers/answer'));

app.use(exp.static('wwwroot'));


app.listen(3000,()=>{
    console.log('服务器运行在3000端口....')
})