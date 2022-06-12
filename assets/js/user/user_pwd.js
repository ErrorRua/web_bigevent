$(() => {
    let form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            let val = $(".layui-form [name=newPwd]").val();
            if (val !== value) {
                return "两次密码不一致"
            }
        }
    })

    $(".layui-form").on("submit", updateUserPwd)
})


function updateUserPwd(e) {
    e.preventDefault();
    $.post("/my/updatepwd", $(this).serialize(), (res) => {
        if (res.status != 0) {
            return layui.layer.msg(res.message)
        }
        layui.layer.msg("更新密码成功！")
        $(this)[0].reset();
    })
}