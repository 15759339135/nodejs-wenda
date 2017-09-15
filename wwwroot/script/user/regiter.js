$('form').submit(function (e) {
    e.preventDefault();
    var psw = $(':password').map(function () {
        return $(this).val();
    })
    if (psw[0] == psw[1]) {
        console.log(this.action)
        $.post(this.action, $(this).serialize(), (data) => {
            alert(data.message);
            if (data.code == 'success') {
                // 登录成功跳转到登录页面
                location.href = '/user/signin.html'
            }
        })
    } else {
        alert('两次输入不一致')
    }
})