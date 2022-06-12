$(()=>{
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    $("#select").on("click", function () {
        $("#file").click();
    });

    $("#file").on("change", selectAvatar);

    $("#upload").on("click",uploadAvatar)
})


function selectAvatar(e) {
    let file = e.target.files[0];
    if (file == null) {
        return layui.layer.msg("请选择图片")
    }
    var newImgURL = URL.createObjectURL(file)
    var $image = $('#image')

    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    $image
        .cropper('destroy')      // 销毁旧的裁剪区域
        .attr('src', newImgURL)  // 重新设置图片路径
        .cropper(options)        // 重新初始化裁剪区域
}

function uploadAvatar(e) {
    var $image = $('#image')

    var dataURL = $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png')

    $.post("/my/update/avatar", {avatar: dataURL}, (res)=> {
        if (res.status != 0) {
            return layui.layer.msg(res.message)
        }
        layui.layer.msg(res.message)
        window.parent.getUserInfo();

    })
}