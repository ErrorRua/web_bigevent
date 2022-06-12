$(() => {
    let form = layui.form;
    form.verify({
        nickname: [
            /^[\S]{6,12}$/, '昵称必须6到12位，且不能出现空格'
        ]
    })

    initUserInfo();
    $("#reset_btn").on("click", resetUserInfo);
    $(".layui-form").on("submit",updateUserInfo)
})

function initUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        success: (res) => {
            if (res.status != 0) {
                let layer = layui.layer;
                return layer.msg("获取用户数据失败");
                // location.href = "/login.htm"
            }

            let form = layui.form;
            form.val("updataForm", res.data);
        },
    })

}

function resetUserInfo(e) {
    e.preventDefault();
    initUserInfo();
}

function updateUserInfo(e) {
    e.preventDefault();
    $.post("/my/userinfo", $(this).serialize() ,(res)=>{
        if (res.status != 0) {
            return layui.layer.msg("更新用户数据信息失败")
        }
        layui.layer.msg("更新用户数据信息成功")
        window.parent.getUserInfo();
    })
}