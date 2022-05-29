var onlineApiUrl = "https://api.2084team.com/micro-oauth2-api";
var localApiUrl = "http://localhost:8080"
$("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "请确认是否填写正确?");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
    }
});


function submitForm(){
    var myJsonData = {
        id:Math.floor(Math.random()*1000),
        chineseName:$("#name").val(),
        neuqId:$("#id_num").val(),
        applyEmail:$("#email").val(),
        applyQq:$("#qq").val(),
        mainCourse:$("#major").val(),
        aimDirection:$("#position").val(),
        selfIntroduce:$("#message").val()
    };
    if (myJsonData.selfIntroduce.length>64) {
        submitMSG(false ,"自我介绍太长了，短点行不？")
        formError();
    } else {
        $.ajax({
            type: "post",
            url: onlineApiUrl+"/v1/staff/apply/form",
            beforeSend: function () {
                NProgress.start()
                NProgress.set(0.3)
            },
            contentType:"application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(myJsonData),
            success : function(result){
                if (result.code === 200 && result.data == null){
                    formSuccess();
                    NProgress.set(0.7)
                } else {
                    formError();
                    submitMSG(false,result.data);
                }
            },
            complete: function () {
                NProgress.done();
            },
            error: function (result) {
                submitMSG(false,"网络连接不稳定！")
            }
        });
    }
}

function formSuccess(){
    $("#contactForm")[0].reset();
    //submitMSG(true, "申请成功，请注意查收邮箱！")
    submitMSG(true, "网申已经截至，请联系团队负责人QQ：2454326747！")
}

function formError(){
    $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass();
    });
}

function submitMSG(valid, msg){
    if(valid){
        var msgClasses = "h3 text-center tada animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}
