$(document).ready(function () {
    $("#btn-login").on("click", function () {
        $.ajax({
            url: "/api/login",
            type: "POST",
            data: {
                user: $("#user").val(),
                pass: $("#password").val(),
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