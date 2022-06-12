$(() => {

    $("#link_reg").on("click", function() {
        $(".login_box").hide();
        $(".reg_box").show();

    })
    $("#link_login").on("click", function() {
        $(".login_box").show();
        $(".reg_box").hide();
    })

    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        username: function(value, item){ //value：表单的值、item：表单的DOM对象
            if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
                return '用户名不能有特殊字符';
            }
            if(/(^\_)|(\__)|(\_+$)/.test(value)){
                return '用户名首尾不能出现下划线\'_\'';
            }
            if(/^\d+\d+\d$/.test(value)){
                return '用户名不能全为数字';
            }
        },
        repwd: function(value) {
            let val = $(".reg_box [name=password]").val();
            if (val !== value) {
                return "两次密码不一致"
            }
        }

    })

    $("#reg_form").on("submit", function(e){
        e.preventDefault();
        let data = {
            username: $(this).find("[name=username]").val(),
            password: $(this).find("[name=password]").val()
        }
        $.post("/api/reguser", data, function (res) {
            if (res.status != 0){

                return layer.msg(res.message);
            }
            layer.msg("注册成功",function () {
                $("#link_login").click();
            });
        })
    })
    $("#log_form").on("submit", function(e){
        e.preventDefault();
        let data = {
            username: $(this).find("[name=username]").val(),
            password: $(this).find("[name=password]").val()
        }
        $.post("/api/login", data, function (res) {
            if (res.status != 0){

                return layer.msg(res.message);
            }
            layer.msg("登录成功",function () {
                localStorage.setItem("token",res.token)
                location.href = "/index.htm";
            });
        })
    })
})