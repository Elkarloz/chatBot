$(document).ready(function () {
    $("#btn-login").on("click", function () {
        $.ajax({
            url: "/api/admin/login",
            type: "POST",
            data: {
                AdmUser: $("#user").val(),
                AdmPass: $("#password").val(),
            },
            success: function () {
                window.location.href = "/";
            },
            error: function (xhr, status, error) {
                toastr.error(error);
            }
        });
    });
});