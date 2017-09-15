// var petname =$.cookie('petname');
// if (!petname) {
//     // 如果没有登录,访问ask直接去登录
//     location.href = '/user/signin.html'
// }


$('form').submit(function (e) {
    e.preventDefault();
    $.post(this.action,$(this).serialize(),(data)=>{
        if (data.code== 'success') {
            location.href='/'
        }
    })
})