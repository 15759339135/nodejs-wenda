// var petname =$.cookie('petname');
// if (!petname) {
//     // 如果没有登录,访问photo直接去登录
//     location.href = '/user/signin.html'
// }

$('form').submit(function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    $.ajax({
        url: this.action,
        method: 'post',
        data: formData,
        contentType: false,
        processData: false,
        success: (data) => {
            if (data.code == 'success') {
                location.href = '/'
            }
        }
    })
})