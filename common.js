var send = (res, code, message, data) => {
    res.status(200).json({
        code, message, data
    })
}

function isSign(req, res, next) {
    if (req.cookies.petname) {
        // 如果petname存在,是登陆状态,继续执行下去
        next();
    } else {
        // 如果是ajax请求,判断为true,如果不是,判断为false
        if (req.xhr) {
            send(res, 'system error', '系统错误,请重试')
        } else {
            res.redirect('/user/signin.html')
        }
    }
}
module.exports = {send ,isSign};