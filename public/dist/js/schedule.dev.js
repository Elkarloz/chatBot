const scheduleModalEdit = document.getElementById('scheduleModalEdit');
const scheduleModalEditBootsrap = new bootstrap.Modal(scheduleModalEdit);
scheduleModalEditBootsrap._config.backdrop = 'static';

function saveDataSchedule() {
    $.ajax({
        url: "/api/auto/schedule",
        method: "POST",
        dataType: "json",
        data: {
            key: $("#keySchedule").val(),
            text: $("#dataSchedule").val(),
        },
        success: function (response) {
            window.location.href = "/Schedule";
        },
        error: function (xhr, status, error) {
            toastr.error(error);
            scheduleModalEditBootsrap.hide();
        },
    });
}

function setDataSchedule(key, text) {
    $("#keySchedule").val(key);
    $("#dataSchedule").val(text);
    scheduleModalEditBootsrap.show();
}