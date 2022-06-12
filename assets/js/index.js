$(() => {
    getUserInfo();

    $("#btnLogout").on("click", function () {

        let layer = layui.layer;

        layer.confirm('确认退出登录？', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem("token");
            location.href="/login.htm";
            layer.close(index);
        });
    })
})



function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        success: (res) => {
            if (res.status != 0) {
                let layer = layui.layer;
                layer.msg("获取用户数据失败")
                // location.href = "/login.htm"
                return
            }
            renderUserInfo(res.data);
        },
        // complete: (res) => {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 1. 强制清空 token
        //         localStorage.removeItem('token')
        //         // 2. 强制跳转到登录页面
        //         location.href = '/login.html'
        //     }
        // }
    })
}

function renderUserInfo(user) {
    let name = user.nickname || user.username;
    $("#wel").html(`欢迎&nbsp;&nbsp;${name}`)

    if (user.user_pic != null) {
        $(".avatar").attr("src", user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        $(".avatar").hide();
        let first = name[0].toUpperCase();
        $(".text-avatar").html(first).show();
    }
}