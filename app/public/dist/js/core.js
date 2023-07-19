$('.select2').select2({
    theme: 'bootstrap4'
});


function setRecord(data) {
    var html = "";
    for (let i = 0; i < data.length; i++) {
        html += '<li><a href="#"><img class="contacts-list-img" src="' + (data[i].CliImg != null ? data[i].CliImg : '/dist/img/AdminLTELogo.png') + '" alt="User Avatar"><div class="contacts-list-info" bis_skin_checked="1"><span class="contacts-list-name">' + data[i].CliName + '<small class="contacts-list-date float-right">' + data[i].CliDate + '</small></span><span class="contacts-list-msg">' + data[i].CliLastMessage + '.</span></div></a></li>';
    }
    $('#contacts_list').html(html);
}

const socket = io();

socket.on('qr_code', (data) => {
    console.log(data);
    $("#qr_code").attr("src", data.body.replace('"', "").replace('"', ""));
});


socket.on('message', (data) => {
    console.log(data);
});

socket.on('status', (data) => {
    console.log(data);
    $('.status_bot').text(data.body);
    if (data.body == 'Estableciendo session.') {
        const myModal = document.getElementById('modal-xl');
        const modal = new bootstrap.Modal(myModal);
        modal._config.backdrop = 'static';
        modal.show();
    }
});

socket.on('record', (data) => {
    console.log(data);
    setRecord(data);
});

function enviarMensaje() {
    const mensajeInput = document.getElementById('mensajeInput');
    const mensaje = mensajeInput.value.trim();
    if (mensaje !== '') {
        socket.emit('mensaje', mensaje);
        mensajeInput.value = '';
    }
}