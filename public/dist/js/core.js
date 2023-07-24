    const myModal = document.getElementById('modal-xl');
    const modal = new bootstrap.Modal(myModal);
    modal._config.backdrop = 'static';

    const closeModal = document.getElementById('closeModal');
    const closeModalBootstrap = new bootstrap.Modal(closeModal);
    closeModalBootstrap._config.backdrop = 'static';

    const editClientModal = document.getElementById('editClient');
    const editClientModalBootstrap = new bootstrap.Modal(editClientModal);
    editClientModalBootstrap._config.backdrop = 'static';

    const route = window.location.pathname;
    const selectBtn = document.getElementById("input-file-send-button");
    const fileInput = document.getElementById("input-file-send");

    let chatActive = "0";

    $('.select2').select2({
        theme: 'bootstrap4'
    });

    $("#btn-send-server").click(function () {
        sendMessage();
    });

    $('#message-input-server').keypress(function (event) {
        if (event.which === 13) {
            sendMessage();
        }
    });

    if (route == "/") {
        modal.show();
    }

    if (route == "/client" || route == "/Client" || route == "/Interacciones" || route == "/interacciones") {
        $(function () {
            $('#example2').DataTable({
                "paging": true,
                "lengthChange": false,
                "searching": true,
                "ordering": true,
                "info": true,
                "autoWidth": false,
                "responsive": true,
                language: {
                    url: '/plugins/datatables/es-CO.json',
                },
            });
        });
    }

    const socket = io();

    socket.on('qr_code', (data) => {
        console.log(data);
        $("#qr_code").attr("src", data.body.replace('"', "").replace('"', ""));
    });

    socket.on('message', (data) => {
        console.log(data);
        if (data.phone == chatActive) {
            if (data.type == "sms") {
                html = '<div class="direct-chat-msg" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-right">' + data.name + '</span><span class="direct-chat-timestamp float-left">' + new Date() + '</span></div><img class="direct-chat-img" src="' + data.img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + data.body + '</div></div>';
            } else if (data.type == "image") {
                html = '<div class="direct-chat-msg" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-left">' + data.name + '</span><span class="direct-chat-timestamp float-right">' + new Date() + '</span></div><img class="direct-chat-img" src="' + data.img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + '<img src="' + msg.body + '" width="100%" alt="Imagen">' + '</div></div>';
            } else if (data.type == "document") {
                html = '<div class="direct-chat-msg" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-left">' + data.name + '</span><span class="direct-chat-timestamp float-right">' + new Date() + '</span></div><img class="direct-chat-img" src="' + data.img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + '<a href="' + data.body + '" download="' + data.nameFile + '" class="btn btn-success">Descargar documento (Documento.pdf).</a>' + '</div></div>';
            } else if (data.type == "audio") {
                html += '<div class="direct-chat-msg" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-left">' + data.name + '</span><span class="direct-chat-timestamp float-right">' + new Date() + '</span></div><img class="direct-chat-img" src="' + data.img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + '<div ><audio style="width: 100%;" controls><source src="' + data.body + '" type="audio/mpeg">Su navegador no es compatible con el elemento de audio.</audio></div>' + '</div></div>';
            }
            $('#direct-chat-view').append(html).animate({
                    scrollTop: $("#direct-chat-view").prop("scrollHeight"),
                },
                500
            );
        } else if (data.phone == "server") {
            var html = "";
            if (data.type == "sms") {
                html = '<div class="direct-chat-msg right" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-right">' + data.name + '</span><span class="direct-chat-timestamp float-left">' + new Date() + '</span></div><img class="direct-chat-img" src="' + data.img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + data.body + '</div></div>';
            } else if (data.type == "image") {
                html = '<div class="direct-chat-msg right" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-right">' + data.name + '</span><span class="direct-chat-timestamp float-left">' + new Date() + '</span></div><img class="direct-chat-img" src="' + data.img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + '<img src="' + data.body + '" width="100%" alt="Imagen">' + '</div></div>';
            } else if (data.type == "document") {
                html = '<div class="direct-chat-msg right" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-right">' + data.name + '</span><span class="direct-chat-timestamp float-left">' + new Date() + '</span></div><img class="direct-chat-img" src="' + data.img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + '<a href="' + data.body + '" download="archivo.pdf" class="btn btn-success">Descargar documento (Documento.pdf).</a>' + '</div></div>';
            } else if (data.type == "audio") {
                html += '<div class="direct-chat-msg right" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-right">' + data.name + '</span><span class="direct-chat-timestamp float-left">' + new Date() + '</span></div><img class="direct-chat-img" src="' + data.img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + '<div ><audio style="width: 100%;" controls><source src="' + data.body + '" type="audio/mpeg">Su navegador no es compatible con el elemento de audio.</audio></div>' + '</div></div>';
            }
            $('#direct-chat-view').append(html).animate({
                    scrollTop: $("#direct-chat-view").prop("scrollHeight"),
                },
                500
            );
        } else {
            toastr.info("<b>" + data.name + ":</b><br>" + data.body);
        }
        $('#chat' + (data.phone).split('@')[0]).text(data.body);
    });

    socket.on('status', (data) => {
        console.log(data);
        $('.status_bot').text(data.body);
        if (data.body == "Ok") {
            setTimeout(() => {
                modal.hide();
            }, 3000);
        } else if (data.body == "Estableciendo session.") {
            modal.show();
        }
    });

    socket.on('record', (data) => {
        console.log(data);
        $('#status_new_sms').text(data.length);
        setRecord(data);
    });

    socket.on('media', (data) => {
        console.log(data);
        if (data.type == "image") {
            $('#' + data.id).prop('src', data.body);
        } else if (data.type == "document") {
            $('#' + data.id).attr('href', data.body);
            $('#' + data.id).attr('download', data.name);
        } else if (data.type == "ptt") {
            var html = '<audio style="width: 100%;" controls><source src="' + data.body + '" type="audio/mpeg">Su navegador no es compatible con el elemento de audio.</audio>';
            $('#' + data.id).html(html);
        }
    });

    socket.on('close', (data) => {
        console.log(data);
        logout();
    });

    socket.on('background', (data) => {
        console.log(data);
        var html = "";
        for (let i = 0; i < data.length; i++) {
            const msg = data[i];
            const img = (msg.sender.profilePicThumbObj != null ? ("img" in msg.sender.profilePicThumbObj ? msg.sender.profilePicThumbObj.img : '/dist/img/AdminLTELogo.png') : '/dist/img/AdminLTELogo.png');
            if (!msg.fromMe && msg.type != "e2e_notification") {
                if (msg.type == "location") {
                    html += '<div class="direct-chat-msg" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-left">' + msg.sender.pushname + '</span><span class="direct-chat-timestamp float-right">' + new Date(msg.timestamp * 1000) + '</span></div><img class="direct-chat-img" src="' + img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + '<a href="https://www.google.com/maps?q=' + msg.lat + ',' + msg.lng + '" target="_blank">Ubicacion, click aqui para ver</a>' + '</div></div>';
                } else if (msg.type == "chat") {
                    html += '<div class="direct-chat-msg" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-left">' + msg.sender.pushname + '</span><span class="direct-chat-timestamp float-right">' + new Date(msg.timestamp * 1000) + '</span></div><img class="direct-chat-img" src="' + img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + msg.body + '</div></div>';
                } else if (msg.type == "image") {
                    html += '<div class="direct-chat-msg" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-left">' + msg.sender.pushname + '</span><span class="direct-chat-timestamp float-right">' + new Date(msg.timestamp * 1000) + '</span></div><img class="direct-chat-img" src="' + img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + '<img id="i' + msg.timestamp + '" src="data:image/jpeg;base64,' + msg.body + '" width="100%" alt="Imagen">' + '</div></div>';
                    socket.emit('media', {
                        msg: msg.id,
                        id: 'i' + msg.timestamp,
                        type: msg.type,
                        name: 'null',
                    });
                } else if (msg.type == "document") {
                    html += '<div class="direct-chat-msg" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-left">' + msg.sender.pushname + '</span><span class="direct-chat-timestamp float-right">' + new Date(msg.timestamp * 1000) + '</span></div><img class="direct-chat-img" src="' + img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + '<a href="javascript:waitFile()" id="i' + msg.timestamp + '" class="btn btn-success">Descargar documento (' + msg.filename + ').</a>' + '</div></div>';
                    socket.emit('media', {
                        msg: msg.id,
                        id: 'i' + msg.timestamp,
                        type: msg.type,
                        name: msg.filename,
                    });
                } else if (msg.type == "ptt") {
                    html += '<div class="direct-chat-msg" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-left">' + msg.sender.pushname + '</span><span class="direct-chat-timestamp float-right">' + new Date(msg.timestamp * 1000) + '</span></div><img class="direct-chat-img" src="' + img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + '<div id="i' + msg.timestamp + '"><span class="btn btn-danger">Estamos cargando el audio para que puedas escucharlo.</span></div>' + '</div></div>';
                    socket.emit('media', {
                        msg: msg.id,
                        id: 'i' + msg.timestamp,
                        type: msg.type,
                        name: "null",
                    });
                } else if (msg.type == "revoked") {
                    html += '<div class="direct-chat-msg" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-left">' + msg.sender.pushname + '</span><span class="direct-chat-timestamp float-right">' + new Date(msg.timestamp * 1000) + '</span></div><img class="direct-chat-img" src="' + img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + 'Se elimino este mensaje' + '</div></div>';
                }
            } else if (msg.type != "e2e_notification") {
                if (msg.type == "location") { //
                    html += '<div class="direct-chat-msg right" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-right">' + msg.sender.pushname + '</span><span class="direct-chat-timestamp float-left">' + new Date(msg.timestamp * 1000) + '</span></div><img class="direct-chat-img" src="' + img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + '<a href="https://www.google.com/maps?q=' + msg.lat + ',' + msg.lng + '" target="_blank">Ubicacion, click aqui para ver</a>' + '</div></div>';
                } else if (msg.type == "chat") {
                    html += '<div class="direct-chat-msg right" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-right">' + msg.sender.pushname + '</span><span class="direct-chat-timestamp float-left">' + new Date(msg.timestamp * 1000) + '</span></div><img class="direct-chat-img" src="' + img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + msg.body + '</div></div>';
                } else if (msg.type == "image") {
                    html += '<div class="direct-chat-msg right" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-right">' + msg.sender.pushname + '</span><span class="direct-chat-timestamp float-left">' + new Date(msg.timestamp * 1000) + '</span></div><img class="direct-chat-img" src="' + img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + '<img id="i' + msg.timestamp + '" src="data:image/jpeg;base64,' + msg.body + '" width="100%" alt="Imagen">' + '</div></div>';
                    socket.emit('media', {
                        msg: msg.id,
                        id: 'i' + msg.timestamp,
                        type: msg.type,
                        name: 'null',
                    });
                } else if (msg.type == "document") {
                    html += '<div class="direct-chat-msg right" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-right">' + msg.sender.pushname + '</span><span class="direct-chat-timestamp float-left">' + new Date(msg.timestamp * 1000) + '</span></div><img class="direct-chat-img" src="' + img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + '<a href="javascript:waitFile()" id="i' + msg.timestamp + '" class="btn btn-success">Descargar documento (' + msg.filename + ').</a>' + '</div></div>';
                    socket.emit('media', {
                        msg: msg.id,
                        id: 'i' + msg.timestamp,
                        type: msg.type,
                        name: msg.filename,
                    });
                } else if (msg.type == "ptt") {
                    html += '<div class="direct-chat-msg right" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-right">' + msg.sender.pushname + '</span><span class="direct-chat-timestamp float-left">' + new Date(msg.timestamp * 1000) + '</span></div><img class="direct-chat-img" src="' + img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + '<div id="i' + msg.timestamp + '"><span class="btn btn-danger">Estamos cargando el audio para que puedas escucharlo.</span></div>' + '</div></div>';
                    socket.emit('media', {
                        msg: msg.id,
                        id: 'i' + msg.timestamp,
                        type: msg.type,
                        name: "null",
                    });
                } else if (msg.type == "revoked") {
                    html += '<div class="direct-chat-msg right" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-right">' + msg.sender.pushname + '</span><span class="direct-chat-timestamp float-left">' + new Date(msg.timestamp * 1000) + '</span></div><img class="direct-chat-img" src="' + img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + 'Se elimino este mensaje' + '</div></div>';
                }
            }
        }
        $('#direct-chat-view').html(html).animate({
                scrollTop: $("#direct-chat-view").prop("scrollHeight"),
            },
            500
        );
    });

    socket.on("disconnect", function () {
        console.log("Se ha caído la conexión con el servidor de Socket.IO");
        $('.status_bot').text("Sin conexión.");
        modal.show();
        $('#edit-client-chat-view').prop('disabled', true);
    });

    function openChat(chat) {
        socket.emit('request', {
            chat: chat
        });
        chargeClient(chat);
        chatActive = chat;
        getResponsesFast();
    }

    function chargeClient(data) {
        $.ajax({
            url: "/api/client/" + data,
            method: "GET",
            dataType: "json",
            success: function (response) {
                if (response != null) {
                    $(".client_location").val(response.CliLocation == "" || response.CliLocation == null ? 'Desconocido' : response.CliLocation);
                    $(".client_name").val(response.CliName == "" || response.CliName == null ? 'Desconocido' : response.CliName);
                    $(".client_address").val(response.CliAddress == "" || response.CliAddress == null ? 'Desconocido' : response.CliAddress);
                    $(".client_observations").val(response.CliObservation == "" || response.CliObservation == null ? 'Desconocido' : response.CliObservation);
                    $(".client_id").val(response.CliId == "" || response.CliId == null ? 'Desconocido' : response.CliId);
                    $(".client_phone").val(response.CliPhone == "" || response.CliPhone == null ? 'Desconocido' : response.CliPhone);

                    $(".client_location").text(response.CliLocation == "" || response.CliLocation == null ? 'Desconocido' : response.CliLocation);
                    $(".client_name").text(response.CliName == "" || response.CliName == null ? 'Desconocido' : response.CliName);
                    $(".client_address").text(response.CliAddress == "" || response.CliAddress == null ? 'Desconocido' : response.CliAddress);
                    $(".client_observations").text(response.CliObservation == "" || response.CliObservation == null ? 'Desconocido' : response.CliObservation);
                    $(".client_id").text(response.CliId == "" || response.CliId == null ? 'Desconocido' : response.CliId);
                } else {
                    $(".client_name").val('Desconocido');
                    $(".client_location").val('Desconocido');
                    $(".client_address").val("Desconocido");
                    $(".client_observations").val("Desconocido");
                    $(".client_id").val("Desconocido");

                    $(".client_name").text("Desconocido");
                    $(".client_location").text('Desconocido');
                    $(".client_address").text("Desconocido");
                    $(".client_observations").text("Desconocido");
                    $(".client_id").text("Desconocido");
                }
                $('#edit-client-chat-view').prop('disabled', false);
            },
            error: function (xhr, status, error) {
                toastr.error(error);
            },
        });
    }

    function sendMessage() {
        const mensajeInput = document.getElementById('message-input-server');
        const mensaje = mensajeInput.value.trim();
        if (mensaje !== '' && chatActive != "") {
            socket.emit('message', {
                type: 'sms',
                phone: chatActive,
                body: mensaje
            });
            mensajeInput.value = '';
        }
    }

    function waitFile() {
        toastr.warning("Estamos descargando el archivo para que usted pueda tenerlo, sea paciente.");
    }

    function closeSale() {
        const value = $("#msg-add-delivery").val();
        const delivery = $('#select-delivery').val();
        const mensaje = value.trim();
        if (mensaje != '' && chatActive != "" && delivery != "0") {
            socket.emit('close_sale', {
                delivery: delivery,
                body: mensaje,
                client: chatActive,
            });
            $('#select-delivery').val(0).trigger("change");
            $("#msg-add-delivery").val('');
            closeModalBootstrap.hide();
        }
    }

    function setRecord(data) {
        var html = "";
        for (let i = 0; i < data.length; i++) {
            html += '<li onclick="openChat(' + "'" + data[i].CliPhone + "'" + ')" ><a href="#"><img class="contacts-list-img" src="' + (data[i].CliImg != null ? data[i].CliImg : '/dist/img/AdminLTELogo.png') + '" alt="User Avatar"><div class="contacts-list-info" bis_skin_checked="1"><span class="contacts-list-name">' + data[i].CliName + '<small class="contacts-list-date float-right">' + data[i].CliDate + '</small></span><span class="contacts-list-msg" id="chat' + data[i].CliPhone.split('@')[0] + '">' + data[i].CliLastMessage + '.</span></div></a></li>';
        }
        $('#contacts_list').html(html);
    }

    async function logout() {
        try {
            const response = await fetch("/api/admin/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                window.location.href = "/Login";
            } else {
                console.error("Error al cerrar sesión:", response.status);
            }
        } catch (error) {
            console.error("Error en la solicitud de logout:", error);
        }
    }

    function editClient() {
        $.ajax({
            url: "/api/client",
            method: "POST",
            dataType: "json",
            data: {
                CliId: $('#edit_client_id').val(),
                CliName: $('#edit_client_name').val(),
                CliAddress: $('#edit_client_address').val(),
                CliObservation: $('#edit_client_observation').val(),
                CliLocation: $('#edit_client_location').val(),
                CliPhone: route == "/client" || route == "/Client" ? $("#edit_client_phone").val() : chatActive,
            },
            success: function (response) {
                toastr.success(response);
                if (route == "/client" || route == "/Client") {
                    window.location.href = "/client";
                } else {
                    chargeClient(chatActive);
                }
            },
            error: function (xhr, status, error) {
                toastr.error(error);
            },
        });
    }

    function getResponsesFast() {
        $.ajax({
            url: "/api/responses/compile",
            method: "POST",
            dataType: "json",
            data: {
                phone: chatActive,
            },
            success: function (response) {
                if (response.length != 0) {
                    var html = '';
                    for (let i = 0; i < response.length; i++) {
                        const element = response[i];
                        html += '<div class="col-md-3 div-response"><span data-response="' + element.ResResponse + '" class="btn btn-secondary btn-sm btn-response">' + element.ResTitle + '</span></div>';

                    }
                    $('#content-responses-charge').html(html);
                    $(".btn-response").click(function () {
                        if (chatActive != "0") {
                            const msg = $(this).attr("data-response");
                            $('#message-input-server').val(msg);
                            sendMessage();
                        }
                    });
                }
            },
            error: function (xhr, status, error) {
                toastr.error(error);
            },
        });
    }

    function setLogoutWhatsapp() {
        socket.emit('close', {
            token: true
        });
    }

    try {
        selectBtn.addEventListener("click", () => {
            fileInput.click();
        });

        fileInput.addEventListener("change", () => {
            const archivo = fileInput.files[0];
            $("#input-file-send").val("");
            if (archivo) {
                const extension = archivo.name.split(".").pop().toLowerCase();
                const tiposPermitidos = ["pdf", "jpeg", "jpg", "png", "gif", "mp3", "wav"];
                const reader = new FileReader();

                if (tiposPermitidos.includes(extension) && chatActive != "0") {
                    reader.onload = () => {
                        const contenido = reader.result;
                        console.log(contenido)
                        socket.emit('message', {
                            type: extension == "jpeg" || extension == "jpg" || extension == "png" || extension == "gif" ? 'image' : extension == "pdf" ? 'document' : 'audio',
                            phone: chatActive,
                            body: contenido
                        });
                    };
                    reader.readAsDataURL(archivo);
                } else {
                    toastr.error("El tipo de archivo no es admitido para su envió.");
                }
            }
        });
    } catch (error) {}