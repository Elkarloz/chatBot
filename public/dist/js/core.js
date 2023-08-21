    const myModal = document.getElementById('modal-xl');
    const modal = new bootstrap.Modal(myModal);
    modal._config.backdrop = 'static';

    const closeModal = document.getElementById('closeModal');
    const closeModalBootstrap = new bootstrap.Modal(closeModal);
    closeModalBootstrap._config.backdrop = 'static';

    const closeSaleModal = document.getElementById('closeModal2');
    const closeModalSaleBootstrap = new bootstrap.Modal(closeSaleModal);
    closeModalSaleBootstrap._config.backdrop = 'static';

    const editClientModal = document.getElementById('editClient');
    const editClientModalBootstrap = new bootstrap.Modal(editClientModal);
    editClientModalBootstrap._config.backdrop = 'static';

    const route = window.location.pathname;
    const selectBtn = document.getElementById("input-file-send-button");
    const fileInput = document.getElementById("input-file-send");

    let chatActive = "0",
        statusSale = "0",
        dataClientChange = 0,
        resumeDay = [],
        indexResumeDay = 0;

    if (route == "/") {
        modal.show();
    }

    if (route == "/client" || route == "/Client" || route == "/Interacciones" || route == "/interacciones" || route == "/delivers" || route == "/Delivers" || route == "/Sales" || route == "/sales" || route == "/Schedule" || route == "/schedule" || route == "/Temp" || route == "/temp") {
        $(function () {
            $(document).ready(function () {
                $('#example1').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "searching": true,
                    "ordering": true,
                    "info": true,
                    "autoWidth": false,
                    "responsive": true,
                    "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"],
                    "language": {
                        "processing": "Procesando...",
                        "lengthMenu": "Mostrar _MENU_ registros",
                        "zeroRecords": "No se encontraron resultados",
                        "emptyTable": "Ningún dato disponible en esta tabla",
                        "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                        "infoFiltered": "(filtrado de un total de _MAX_ registros)",
                        "search": "Buscar:",
                        "infoThousands": ",",
                        "loadingRecords": "Cargando...",
                        "paginate": {
                            "first": "Primero",
                            "last": "Último",
                            "next": "Siguiente",
                            "previous": "Anterior"
                        },
                        "aria": {
                            "sortAscending": ": Activar para ordenar la columna de manera ascendente",
                            "sortDescending": ": Activar para ordenar la columna de manera descendente"
                        },
                        "buttons": {
                            "copy": "Copiar",
                            "colvis": "Visibilidad",
                            "collection": "Colección",
                            "colvisRestore": "Restaurar visibilidad",
                            "copyKeys": "Presione ctrl o u2318 + C para copiar los datos de la tabla al portapapeles del sistema. <br \/> <br \/> Para cancelar, haga clic en este mensaje o presione escape.",
                            "copySuccess": {
                                "1": "Copiada 1 fila al portapapeles",
                                "_": "Copiadas %ds fila al portapapeles"
                            },
                            "copyTitle": "Copiar al portapapeles",
                            "csv": "CSV",
                            "excel": "Excel",
                            "pageLength": {
                                "-1": "Mostrar todas las filas",
                                "_": "Mostrar %d filas"
                            },
                            "pdf": "PDF",
                            "print": "Imprimir",
                            "renameState": "Cambiar nombre",
                            "updateState": "Actualizar"
                        },
                        "autoFill": {
                            "cancel": "Cancelar",
                            "fill": "Rellene todas las celdas con <i>%d<\/i>",
                            "fillHorizontal": "Rellenar celdas horizontalmente",
                            "fillVertical": "Rellenar celdas verticalmentemente"
                        },
                        "decimal": ",",
                        "searchBuilder": {
                            "add": "Añadir condición",
                            "button": {
                                "0": "Constructor de búsqueda",
                                "_": "Constructor de búsqueda (%d)"
                            },
                            "clearAll": "Borrar todo",
                            "condition": "Condición",
                            "conditions": {
                                "date": {
                                    "after": "Despues",
                                    "before": "Antes",
                                    "between": "Entre",
                                    "empty": "Vacío",
                                    "equals": "Igual a",
                                    "notBetween": "No entre",
                                    "notEmpty": "No Vacio",
                                    "not": "Diferente de"
                                },
                                "number": {
                                    "between": "Entre",
                                    "empty": "Vacio",
                                    "equals": "Igual a",
                                    "gt": "Mayor a",
                                    "gte": "Mayor o igual a",
                                    "lt": "Menor que",
                                    "lte": "Menor o igual que",
                                    "notBetween": "No entre",
                                    "notEmpty": "No vacío",
                                    "not": "Diferente de"
                                },
                                "string": {
                                    "contains": "Contiene",
                                    "empty": "Vacío",
                                    "endsWith": "Termina en",
                                    "equals": "Igual a",
                                    "notEmpty": "No Vacio",
                                    "startsWith": "Empieza con",
                                    "not": "Diferente de",
                                    "notContains": "No Contiene",
                                    "notStarts": "No empieza con",
                                    "notEnds": "No termina con"
                                },
                                "array": {
                                    "not": "Diferente de",
                                    "equals": "Igual",
                                    "empty": "Vacío",
                                    "contains": "Contiene",
                                    "notEmpty": "No Vacío",
                                    "without": "Sin"
                                }
                            },
                            "data": "Data",
                            "deleteTitle": "Eliminar regla de filtrado",
                            "leftTitle": "Criterios anulados",
                            "logicAnd": "Y",
                            "logicOr": "O",
                            "rightTitle": "Criterios de sangría",
                            "title": {
                                "0": "Constructor de búsqueda",
                                "_": "Constructor de búsqueda (%d)"
                            },
                            "value": "Valor"
                        },
                        "searchPanes": {
                            "clearMessage": "Borrar todo",
                            "collapse": {
                                "0": "Paneles de búsqueda",
                                "_": "Paneles de búsqueda (%d)"
                            },
                            "count": "{total}",
                            "countFiltered": "{shown} ({total})",
                            "emptyPanes": "Sin paneles de búsqueda",
                            "loadMessage": "Cargando paneles de búsqueda",
                            "title": "Filtros Activos - %d",
                            "showMessage": "Mostrar Todo",
                            "collapseMessage": "Colapsar Todo"
                        },
                        "select": {
                            "cells": {
                                "1": "1 celda seleccionada",
                                "_": "%d celdas seleccionadas"
                            },
                            "columns": {
                                "1": "1 columna seleccionada",
                                "_": "%d columnas seleccionadas"
                            },
                            "rows": {
                                "1": "1 fila seleccionada",
                                "_": "%d filas seleccionadas"
                            }
                        },
                        "thousands": ".",
                        "datetime": {
                            "previous": "Anterior",
                            "next": "Proximo",
                            "hours": "Horas",
                            "minutes": "Minutos",
                            "seconds": "Segundos",
                            "unknown": "-",
                            "amPm": [
                                "AM",
                                "PM"
                            ],
                            "months": {
                                "0": "Enero",
                                "1": "Febrero",
                                "10": "Noviembre",
                                "11": "Diciembre",
                                "2": "Marzo",
                                "3": "Abril",
                                "4": "Mayo",
                                "5": "Junio",
                                "6": "Julio",
                                "7": "Agosto",
                                "8": "Septiembre",
                                "9": "Octubre"
                            },
                            "weekdays": [
                                "Dom",
                                "Lun",
                                "Mar",
                                "Mie",
                                "Jue",
                                "Vie",
                                "Sab"
                            ]
                        },
                        "editor": {
                            "close": "Cerrar",
                            "create": {
                                "button": "Nuevo",
                                "title": "Crear Nuevo Registro",
                                "submit": "Crear"
                            },
                            "edit": {
                                "button": "Editar",
                                "title": "Editar Registro",
                                "submit": "Actualizar"
                            },
                            "remove": {
                                "button": "Eliminar",
                                "title": "Eliminar Registro",
                                "submit": "Eliminar",
                                "confirm": {
                                    "_": "¿Está seguro que desea eliminar %d filas?",
                                    "1": "¿Está seguro que desea eliminar 1 fila?"
                                }
                            },
                            "error": {
                                "system": "Ha ocurrido un error en el sistema (<a target=\"\\\" rel=\"\\ nofollow\" href=\"\\\">Más información&lt;\\\/a&gt;).<\/a>"
                            },
                            "multi": {
                                "title": "Múltiples Valores",
                                "info": "Los elementos seleccionados contienen diferentes valores para este registro. Para editar y establecer todos los elementos de este registro con el mismo valor, hacer click o tap aquí, de lo contrario conservarán sus valores individuales.",
                                "restore": "Deshacer Cambios",
                                "noMulti": "Este registro puede ser editado individualmente, pero no como parte de un grupo."
                            }
                        },
                        "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
                        "stateRestore": {
                            "creationModal": {
                                "button": "Crear",
                                "name": "Nombre:",
                                "order": "Clasificación",
                                "paging": "Paginación",
                                "search": "Busqueda",
                                "select": "Seleccionar"
                            },
                            "emptyError": "El nombre no puede estar vacio",
                            "removeConfirm": "¿Seguro que quiere eliminar este %s?",
                            "removeError": "Error al eliminar el registro",
                            "removeJoiner": "y",
                            "removeSubmit": "Eliminar",
                            "renameButton": "Cambiar Nombre",
                            "renameLabel": "Nuevo nombre para %s"
                        }
                    },
                }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
            });
        });
    }


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

    const socket = io();

    socket.on('qr_code', (data) => {
        console.log(data);
        $("#qr_code").attr("src", data.body.replace('"', "").replace('"', ""));
    });

    socket.on('message', (data) => {
        console.log(data);
        if (data.phone == chatActive) {
            var html = "";
            if (data.type == "sms") {
                html = '<div class="direct-chat-msg" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-right">' + data.name + '</span><span class="direct-chat-timestamp float-left">' + formatFecha(new Date()) + '</span></div><img class="direct-chat-img" src="' + data.img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + data.body + '</div></div>';
            } else if (data.type == "image") {
                html = '<div class="direct-chat-msg" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-left">' + data.name + '</span><span class="direct-chat-timestamp float-right">' + formatFecha(new Date()) + '</span></div><img class="direct-chat-img" src="' + data.img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + '<img src="' + msg.body + '" width="100%" alt="Imagen">' + '</div></div>';
            } else if (data.type == "document") {
                html = '<div class="direct-chat-msg" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-left">' + data.name + '</span><span class="direct-chat-timestamp float-right">' + formatFecha(new Date()) + '</span></div><img class="direct-chat-img" src="' + data.img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + '<a href="' + data.body + '" download="' + data.nameFile + '" class="btn btn-success">Descargar documento (Documento.pdf).</a>' + '</div></div>';
            } else if (data.type == "audio") {
                html = '<div class="direct-chat-msg" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-left">' + data.name + '</span><span class="direct-chat-timestamp float-right">' + formatFecha(new Date()) + '</span></div><img class="direct-chat-img" src="' + data.img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + '<div ><audio style="width: 100%;" controls><source src="' + data.body + '" type="audio/mpeg">Su navegador no es compatible con el elemento de audio.</audio></div>' + '</div></div>';
            }
            $('#direct-chat-view').append(html).animate({
                    scrollTop: $("#direct-chat-view").prop("scrollHeight"),
                },
                500
            );
            addCountLi((data.phone).split('@')[0], data.UnreadCount);
        } else if (data.phone == "server") {
            if (data.client == chatActive) {
                var html = "";
                if (data.type == "sms") {
                    html = '<div class="direct-chat-msg right" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-right">' + data.name + '</span><span class="direct-chat-timestamp float-left">' + formatFecha(new Date()) + '</span></div><img class="direct-chat-img" src="' + data.img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + data.body + '</div></div>';
                } else if (data.type == "image") {
                    html = '<div class="direct-chat-msg right" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-right">' + data.name + '</span><span class="direct-chat-timestamp float-left">' + formatFecha(new Date()) + '</span></div><img class="direct-chat-img" src="' + data.img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + '<img src="' + data.body + '" width="100%" alt="Imagen">' + '</div></div>';
                } else if (data.type == "document") {
                    html = '<div class="direct-chat-msg right" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-right">' + data.name + '</span><span class="direct-chat-timestamp float-left">' + formatFecha(new Date()) + '</span></div><img class="direct-chat-img" src="' + data.img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + '<a href="' + data.body + '" download="archivo.pdf" class="btn btn-success">Descargar documento (Documento.pdf).</a>' + '</div></div>';
                } else if (data.type == "audio") {
                    html += '<div class="direct-chat-msg right" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-right">' + data.name + '</span><span class="direct-chat-timestamp float-left">' + formatFecha(new Date()) + '</span></div><img class="direct-chat-img" src="' + data.img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + '<div ><audio style="width: 100%;" controls><source src="' + data.body + '" type="audio/mpeg">Su navegador no es compatible con el elemento de audio.</audio></div>' + '</div></div>';
                }
                $('#direct-chat-view').append(html).animate({
                        scrollTop: $("#direct-chat-view").prop("scrollHeight"),
                    },
                    500
                );
                addCountLi((data.client).split('@')[0], data.UnreadCount);
            }
        } else {
            if (data.type == "sms") {
                toastr.info("<b>" + data.name + ":</b><br>" + data.body);
            } else if (data.type == "image") {
                toastr.info("<b>" + data.name + ":</b><br>" + "Te envio una imagen.");
            } else if (data.type == "document") {
                toastr.info("<b>" + data.name + ":</b><br>" + "Te envio un archivo.");
            } else if (data.type == "audio") {
                toastr.info("<b>" + data.name + ":</b><br>" + "Te envio un audio.");
            }
            addCountLi((data.phone).split('@')[0], data.UnreadCount);
        }

        if (data.type == "sms") {
            $('#chat' + (data.phone).split('@')[0]).text(data.body);
            moveContact('#liChat' + (data.phone).split('@')[0]);
            soundNotify();
        } else if (data.type == "image") {
            $('#chat' + (data.phone).split('@')[0]).text("Te envio una imagen.");
            moveContact('#liChat' + (data.phone).split('@')[0]);
            soundNotify();
        } else if (data.type == "document") {
            $('#chat' + (data.phone).split('@')[0]).text("Te envio un archivo.");
            moveContact('#liChat' + (data.phone).split('@')[0]);
            soundNotify();
        } else if (data.type == "audio") {
            $('#chat' + (data.phone).split('@')[0]).text("Te envio un audio.");
            moveContact('#liChat' + (data.phone).split('@')[0]);
            soundNotify();
        }

    });

    socket.on('status', (data) => {
        console.log(data);
        $('.status_bot').text(data.body);
        if (data.body == "Ok") {
            setTimeout(() => {
                modal.hide();
            }, 3000);
        } else if (data.body == "Estableciendo session." || data.body == "Desconectado") {
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
    });

    socket.on('background', (data) => {
        console.log(data);
        var html = "";
        for (let i = 0; i < data.length; i++) {
            const msg = data[i];
            const img = (msg.sender.profilePicThumbObj != null ? ("img" in msg.sender.profilePicThumbObj ? msg.sender.profilePicThumbObj.img : '/dist/img/AdminLTELogo.png') : '/dist/img/AdminLTELogo.png');
            if (!msg.fromMe && msg.type != "e2e_notification") {
                if (msg.type == "location") {
                    html += '<div class="direct-chat-msg" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-left">' + msg.sender.pushname + '</span><span class="direct-chat-timestamp float-right">' + formatFecha(new Date(msg.timestamp * 1000)) + '</span></div><img class="direct-chat-img" src="' + img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + '<a href="https://www.google.com/maps?q=' + msg.lat + ',' + msg.lng + '" target="_blank">Ubicacion, click aqui para ver</a>' + '</div></div>';
                } else if (msg.type == "chat") {
                    html += '<div class="direct-chat-msg" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-left">' + msg.sender.pushname + '</span><span class="direct-chat-timestamp float-right">' + formatFecha(new Date(msg.timestamp * 1000)) + '</span></div><img class="direct-chat-img" src="' + img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + msg.body + '</div></div>';
                } else if (msg.type == "image") {
                    html += '<div class="direct-chat-msg" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-left">' + msg.sender.pushname + '</span><span class="direct-chat-timestamp float-right">' + formatFecha(new Date(msg.timestamp * 1000)) + '</span></div><img class="direct-chat-img" src="' + img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + '<img id="i' + msg.timestamp + '" src="data:image/jpeg;base64,' + msg.body + '" width="100%" alt="Imagen">' + '</div></div>';
                    socket.emit('media', {
                        msg: msg.id,
                        id: 'i' + msg.timestamp,
                        type: msg.type,
                        name: 'null',
                    });
                } else if (msg.type == "document") {
                    html += '<div class="direct-chat-msg" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-left">' + msg.sender.pushname + '</span><span class="direct-chat-timestamp float-right">' + formatFecha(new Date(msg.timestamp * 1000)) + '</span></div><img class="direct-chat-img" src="' + img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + '<a href="javascript:waitFile()" id="i' + msg.timestamp + '" class="btn btn-success">Descargar documento (' + msg.filename + ').</a>' + '</div></div>';
                    socket.emit('media', {
                        msg: msg.id,
                        id: 'i' + msg.timestamp,
                        type: msg.type,
                        name: msg.filename,
                    });
                } else if (msg.type == "ptt") {
                    html += '<div class="direct-chat-msg" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-left">' + msg.sender.pushname + '</span><span class="direct-chat-timestamp float-right">' + formatFecha(new Date(msg.timestamp * 1000)) + '</span></div><img class="direct-chat-img" src="' + img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + '<div id="i' + msg.timestamp + '"><span class="btn btn-danger">Estamos cargando el audio para que puedas escucharlo.</span></div>' + '</div></div>';
                    socket.emit('media', {
                        msg: msg.id,
                        id: 'i' + msg.timestamp,
                        type: msg.type,
                        name: "null",
                    });
                } else if (msg.type == "revoked") {
                    html += '<div class="direct-chat-msg" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-left">' + msg.sender.pushname + '</span><span class="direct-chat-timestamp float-right">' + formatFecha(new Date(msg.timestamp * 1000)) + '</span></div><img class="direct-chat-img" src="' + img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + 'Se elimino este mensaje' + '</div></div>';
                }
            } else if (msg.type != "e2e_notification") {
                if (msg.type == "location") {
                    html += '<div class="direct-chat-msg right" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-right">' + msg.sender.pushname + '</span><span class="direct-chat-timestamp float-left">' + formatFecha(new Date(msg.timestamp * 1000)) + '</span></div><img class="direct-chat-img" src="' + img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + '<a href="https://www.google.com/maps?q=' + msg.lat + ',' + msg.lng + '" target="_blank">Ubicacion, click aqui para ver</a>' + '</div></div>';
                } else if (msg.type == "chat") {
                    html += '<div class="direct-chat-msg right" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-right">' + msg.sender.pushname + '</span><span class="direct-chat-timestamp float-left">' + formatFecha(new Date(msg.timestamp * 1000)) + '</span></div><img class="direct-chat-img" src="' + img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + msg.body + '</div></div>';
                } else if (msg.type == "image") {
                    html += '<div class="direct-chat-msg right" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-right">' + msg.sender.pushname + '</span><span class="direct-chat-timestamp float-left">' + formatFecha(new Date(msg.timestamp * 1000)) + '</span></div><img class="direct-chat-img" src="' + img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + '<img id="i' + msg.timestamp + '" src="data:image/jpeg;base64,' + msg.body + '" width="100%" alt="Imagen">' + '</div></div>';
                    socket.emit('media', {
                        msg: msg.id,
                        id: 'i' + msg.timestamp,
                        type: msg.type,
                        name: 'null',
                    });
                } else if (msg.type == "document") {
                    html += '<div class="direct-chat-msg right" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-right">' + msg.sender.pushname + '</span><span class="direct-chat-timestamp float-left">' + formatFecha(new Date(msg.timestamp * 1000)) + '</span></div><img class="direct-chat-img" src="' + img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + '<a href="javascript:waitFile()" id="i' + msg.timestamp + '" class="btn btn-success">Descargar documento (' + msg.filename + ').</a>' + '</div></div>';
                    socket.emit('media', {
                        msg: msg.id,
                        id: 'i' + msg.timestamp,
                        type: msg.type,
                        name: msg.filename,
                    });
                } else if (msg.type == "ptt") {
                    html += '<div class="direct-chat-msg right" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-right">' + msg.sender.pushname + '</span><span class="direct-chat-timestamp float-left">' + formatFecha(new Date(msg.timestamp * 1000)) + '</span></div><img class="direct-chat-img" src="' + img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + '<div id="i' + msg.timestamp + '"><span class="btn btn-danger">Estamos cargando el audio para que puedas escucharlo.</span></div>' + '</div></div>';
                    socket.emit('media', {
                        msg: msg.id,
                        id: 'i' + msg.timestamp,
                        type: msg.type,
                        name: "null",
                    });
                } else if (msg.type == "revoked") {
                    html += '<div class="direct-chat-msg right" bis_skin_checked="1"><div class="direct-chat-infos clearfix" bis_skin_checked="1"><span class="direct-chat-name float-right">' + msg.sender.pushname + '</span><span class="direct-chat-timestamp float-left">' + formatFecha(new Date(msg.timestamp * 1000)) + '</span></div><img class="direct-chat-img" src="' + img + '" alt="Message User Image"><div class="direct-chat-text" bis_skin_checked="1">' + 'Se elimino este mensaje' + '</div></div>';
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

    function addCountLi(id, count) {
        if ($('#countChat' + id).text() == "0") {
            if (count != 0) {
                $('#countChat' + id).addClass('bg-warning');
                $('#countChat' + id).removeClass('bg-info');
                $('#liChat' + id).addClass("bg-success");
            } else {
                $('#countChat' + id).removeClass('bg-warning');
                $('#countChat' + id).addClass('bg-info');
                $('#liChat' + id).removeClass("bg-success");
            }
            $('#countChat' + id).text(count);
        } else {
            if (count != 0) {
                $('#countChat' + id).addClass('bg-warning');
                $('#liChat' + id).addClass("bg-success");
                $('#countChat' + id).removeClass('bg-info');
            } else {
                $('#countChat' + id).removeClass('bg-warning');
                $('#countChat' + id).addClass('bg-info');
                $('#liChat' + id).removeClass("bg-success");
            }
            $('#countChat' + id).text(count);
        }
    }

    function openChat(chat) {
        socket.emit('request', {
            chat: chat
        });
        statusSale = "0";
        $("#close_sale").prop('disabled', true);
        $("#option_sale").removeClass("btn-danger");
        $("#option_sale").addClass("btn-success");
        $("#option_sale").text("Abrir una venta.");
        chatActive = chat;
        chargeClient(chat);
        getResponsesFast();
        $("#openchat-btn").click();
    }

    function chargeClient(data) {
        $.ajax({
            url: "/api/client/" + data,
            method: "GET",
            dataType: "json",
            success: function (response) {
                if (response != null) {
                    $(".client_location").val(response.CliLocation == "" || response.CliLocation == null ? '' : response.CliLocation);
                    $(".client_name").val(response.CliName == "" || response.CliName == null ? '' : response.CliName);
                    $(".client_address").val(response.CliAddress == "" || response.CliAddress == null ? '' : response.CliAddress);
                    $(".client_zone").val(response.CliZone == "" || response.CliZone == null ? '' : response.CliZone);
                    $(".client_observations").val(response.CliObservation == "" || response.CliObservation == null ? '' : response.CliObservation);
                    $(".client_id").val(response.CliId == "" || response.CliId == null ? '' : response.CliId);
                    $(".client_phone").val(response.CliPhone == "" || response.CliPhone == null ? '' : response.CliPhone);

                    $(".client_location").text(response.CliLocation == "" || response.CliLocation == null ? '' : response.CliLocation);
                    $(".client_name").text(response.CliName == "" || response.CliName == null ? '' : response.CliName);
                    $(".client_address").text(response.CliAddress == "" || response.CliAddress == null ? '' : response.CliAddress);
                    $(".client_zone").text(response.CliZone == "" || response.CliZone == null ? '' : response.CliZone);
                    $(".client_observations").text(response.CliObservation == "" || response.CliObservation == null ? '' : response.CliObservation);
                    $(".client_id").text(response.CliId == "" || response.CliId == null ? 'Usuario no registrado.' : response.CliId);
                    var html = "";
                    var extra = 0;
                    if (response.CliAddressExtra != null) {
                        response.CliAddressExtra = JSON.parse(response.CliAddressExtra);
                        response.CliAddressExtra.forEach(element => {
                            html += '<option>' + element + '</option>';
                            extra++;
                        });
                    }

                    if (extra != 0) {
                        $("#client-extra-address-small").text("Este cliente tiene direcciones " + extra + " disponibles.");
                    } else {
                        $("#client-extra-address-small").text("");
                    }

                    if (route != "/") {
                        $(".extra-address-select").html(html);
                        $(".extra-address-select").val(0);
                    } else {
                        $(".extra-address-select").html(html);
                    }

                    if (route == "/") {
                        verifyStatusSale(data);
                    }

                } else {
                    $(".client_name").val('');
                    $(".client_location").val('');
                    $(".client_address").val("");
                    $(".client_observations").val("");
                    $(".client_id").val("");

                    $("#client-extra-address-small").text("");
                    $(".extra-address-select").html('');
                    $(".client_zone").val("");
                    $(".client_zone").text("");

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
        const resume = $("#resume-close-buy").val();
        let address = $("#select-address").val();
        const content1 = value.trim();
        const content2 = resume.trim();
        if (chatActive != "0" && delivery != "0" && delivery != "-1" && delivery != "" && delivery != null) {
            if (address == "-1") {
                const customAddressValue = ($("#address-custom-temp").val());
                const customAddress = customAddressValue.trim();
                if (customAddress != "") {
                    socket.emit('close_sale', {
                        delivery: delivery,
                        body: content1,
                        client: chatActive,
                        resume: content2,
                        address: customAddress,
                    });
                    $('#select-delivery').val("-1").trigger("change");
                    $("#msg-add-delivery").val('');
                    $("#select-address").val("0");
                    $("#resume-close-buy").val("");
                    statusSale = "0";
                    $("#close_sale").prop('disabled', true);
                    $("#option_sale").removeClass("btn-danger");
                    $("#option_sale").addClass("btn-success");
                    $("#option_sale").text("Abrir una venta.");
                    closeModalBootstrap.hide();
                    $("#liChat" + chatActive.split('@')[0]).removeClass("bg-warning");
                    toastr.success("Venta cerrada con exito.");
                } else {
                    toastr.error("Pon una dirección por favor.");
                }
            } else {
                if (address != null & address != "") {
                    address = (address == $(".client_address").val() ? '0' : address);
                    socket.emit('close_sale', {
                        delivery: delivery,
                        body: content1,
                        client: chatActive,
                        resume: content2,
                        address: address,
                    });
                    $('#select-delivery').val("-1").trigger("change");
                    $("#msg-add-delivery").val('');
                    $("#select-address").val("0");
                    $("#resume-close-buy").val("");
                    statusSale = "0";
                    $("#close_sale").prop('disabled', true);
                    $("#option_sale").removeClass("btn-danger");
                    $("#option_sale").addClass("btn-success");
                    $("#option_sale").text("Abrir una venta.");
                    closeModalBootstrap.hide();
                    $("#liChat" + chatActive.split('@')[0]).removeClass("bg-warning");
                    toastr.success("Venta cerrada con exito.");
                } else {
                    toastr.error("Pon una dirección por favor.");
                }
            }
            closeModalBootstrap.hide();
        } else if (chatActive != "0" && delivery == "0") {
            socket.emit('close_sale_pick_up', {
                client: chatActive,
                resume: content2,
                body: content1,
            });
            $('#select-delivery').val("-1").trigger("change");
            $("#msg-add-delivery").val('');
            statusSale = "0";
            $("#resume-close-buy").val("");
            $("#close_sale").prop('disabled', true);
            $("#option_sale").removeClass("btn-danger");
            $("#option_sale").addClass("btn-success");
            $("#option_sale").text("Abrir una venta.");
            closeModalBootstrap.hide();
            $("#liChat" + chatActive.split('@')[0]).removeClass("bg-warning");
            toastr.success("Venta cerrada con exito.");
        } else {
            toastr.error("Faltan datos para cancelar la venta.");
        }
    }

    function setRecord(data) {
        var html = "";
        for (let i = 0; i < data.length; i++) {
            html += '<li id="liChat' + data[i].CliPhone.split('@')[0] + '" class="' + (data[i].SaleStatus != null ? 'bg-warning' : null) + " " + (data[i].UnreadCount == 0 ? null : 'bg-success') + '" onclick="openChat(' + "'" + data[i].CliPhone + "'" + ')" ><a href="#"><img class="contacts-list-img" src="' + (data[i].CliImg != null ? data[i].CliImg : '/dist/img/AdminLTELogo.png') + '" alt="User Avatar"><div class="contacts-list-info" bis_skin_checked="1"><span class="contacts-list-name">' + data[i].CliName + '<small class="contacts-list-date float-right">' + formatFecha(data[i].CliDate) + '</small><span style="margin-left:10px;" id="countChat' + data[i].CliPhone.split('@')[0] + '" title="Mensajes sin ver" class="badge bg-' + (data[i].UnreadCount == 0 ? 'info' : 'warning') + '">' + data[i].UnreadCount + '</span></span><span class="contacts-list-msg" id="chat' + data[i].CliPhone.split('@')[0] + '">' + data[i].CliLastMessage + '.</span></div></a></li>';
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
                CliZone: $('#edit_client_zone').val(),
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

    function soundNotify() {
        var audio = new Audio("/sounds/notification.mp3");
        audio.play();
    }

    function formatFecha(fechaString) {
        const fecha = new Date(fechaString);
        const año = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const dia = String(fecha.getDate()).padStart(2, '0');
        const horas = String(fecha.getHours() % 12 || 12).padStart(2, '0');
        const minutos = String(fecha.getMinutes()).padStart(2, '0');
        const ampm = fecha.getHours() >= 12 ? 'pm' : 'am';

        return `${año}-${mes}-${dia} ${horas}:${minutos} ${ampm}`;
    }

    function openSale() {
        $("#reason-cancel").val("");
        if ("1" != "0") {
            if ($("#option_sale").text() != "Cancelar venta.") {
                $("#close_sale").prop('disabled', false);
                $("#option_sale").removeClass("btn-success");
                $("#option_sale").addClass("btn-danger");
                $("#option_sale").text("Cancelar venta.");
                if (statusSale == "0") {
                    $.ajax({
                        url: "/api/sale",
                        method: "POST",
                        dataType: "json",
                        data: {
                            phone: chatActive,
                            admin: $("#token_admin").val(),
                        },
                        success: function (response) {
                            statusSale = response;
                            $("#liChat" + chatActive.split('@')[0]).addClass("bg-warning");
                        },
                        error: function (xhr, status, error) {
                            toastr.error(error);
                            $("#close_sale").prop('disabled', true);
                            $("#option_sale").removeClass("btn-danger");
                            $("#option_sale").addClass("btn-success");
                            $("#option_sale").text("Abrir una venta.");
                        },
                    });
                }
            } else {
                closeModalSaleBootstrap.show();
                $("#close_sale").prop('disabled', true);
                $("#option_sale").removeClass("btn-danger");
                $("#option_sale").addClass("btn-success");
                $("#option_sale").text("Abrir una venta.");
            }
        }
    }

    function verifyStatusSale(data) {
        $.ajax({
            url: "/api/sale/" + data,
            method: "GET",
            dataType: "json",
            success: function (response) {
                if (response != null) {
                    if (response.length != 0) {
                        $("#close_sale").prop('disabled', false);
                        $("#option_sale").removeClass("btn-success");
                        $("#option_sale").addClass("btn-danger");
                        $("#option_sale").text("Cancelar venta.");
                    } else {
                        $("#close_sale").prop('disabled', true);
                        $("#option_sale").removeClass("btn-danger");
                        $("#option_sale").addClass("btn-success");
                        $("#option_sale").text("Abrir una venta.");
                    }
                } else {
                    $("#close_sale").prop('disabled', true);
                    $("#option_sale").removeClass("btn-danger");
                    $("#option_sale").addClass("btn-success");
                    $("#option_sale").text("Abrir una venta.");
                }
            },
            error: function (xhr, status, error) {
                toastr.error(error);
                $("#close_sale").prop('disabled', true);
                $("#option_sale").removeClass("btn-danger");
                $("#option_sale").addClass("btn-success");
                $("#option_sale").text("Abrir una venta.");
            },
        });
    }

    function cancelSale() {
        const reason = $("#reason-cancel").val();
        if (reason.length >= 5 && reason.length <= 256) {
            $.ajax({
                url: "/api/sale/cancel",
                method: "POST",
                dataType: "json",
                data: {
                    phone: chatActive,
                    reason: reason,
                },
                success: function (response) {
                    statusSale = "0";
                    $("#liChat" + chatActive.split('@')[0]).removeClass("bg-warning");
                    closeModalSaleBootstrap.hide();
                    $("#reason-cancel").val("");
                    toastr.success("Venta cancelada por <b>" + (reason == "" ? 'motivo no especificado.' : reason) + "</b>");
                },
                error: function (xhr, status, error) {
                    toastr.error(error);
                    $("#close_sale").prop('disabled', false);
                    $("#option_sale").removeClass("btn-success");
                    $("#option_sale").addClass("btn-danger");
                    $("#option_sale").text("Cancelar venta.");
                },
            });
        }
    }

    function deleteExtraAddress() {
        const item = $("#extra-address-select-delete").val();
        if (item != "0" && item != "-1") {
            $.ajax({
                url: "/api/client/address",
                method: "POST",
                dataType: "json",
                data: {
                    client: chatActive,
                    delete: item,
                },
                success: function (response) {
                    toastr.success("Dirección extra eliminada.");
                    if (route != "/") {
                        dataClientChange = 1;
                    }
                    chargeClient(chatActive);
                },
                error: function (xhr, status, error) {
                    toastr.error(error);
                },
            });
        } else {
            toastr.warning("No ha seleccionado una dirección extra válida.");
        }
    }

    function addExtraAddress() {
        const item = $("#extra-add-client").val();
        if (item.length > 5) {
            $.ajax({
                url: "/api/client/address",
                method: "POST",
                dataType: "json",
                data: {
                    client: chatActive,
                    add: item,
                },
                success: function (response) {
                    toastr.success("Dirección extra agregada.");
                    $('#extra-add-client-div').hide();
                    $("#extra-add-client").val("");
                    if (route != "/") {
                        dataClientChange = 1;
                    }
                    chargeClient(chatActive);
                },
                error: function (xhr, status, error) {
                    toastr.error(error);
                },
            });
        } else {
            toastr.warning("La dirección extra debe contener más de 5 caracteres.");
        }
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

    $(document).ready(function () {
        $("#select-delivery").change(function () {
            var value = $(this).val();
            if (value == "0") {
                $("#label-delivery-note").text("Nota exclusiva para cliente.");
                $('#msg-add-delivery').prop('placeholder', 'Nota exclusiva para cliente...');
                $("#select-address").prop('disabled', true);
            } else {
                $("#label-delivery-note").text("Nota exclusiva para repartidor.");
                $('#msg-add-delivery').prop('placeholder', 'Nota exclusiva para repartidor...');
                $("#select-address").prop('disabled', false);
            }
        });
    });

    $(document).ready(function () {
        $("#select-address").change(function () {
            var value = $(this).val();
            if (value == "-1") {
                $("#address-div-custom-temp").show();
            } else {
                $("#address-div-custom-temp").hide();
            }
        });
        $("#address-div-custom-temp").hide();
        $('#extra-add-client-div').hide();
    });

    $(document).ready(function () {
        $('#editClient').on('hidden.bs.modal', function () {
            if (route != "/" && dataClientChange == 1) {
                window.location.href = "/Client";
            }
        });
    });

    function requestType() {
        closeModalBootstrap.hide();
        Swal.fire({
            title: '¿Qué tipo de pedido es?',
            text: "¡Domicilio o Pick UP!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EC8F09',
            cancelButtonColor: '#1C9300',
            cancelButtonText: "PickUp",
            confirmButtonText: 'Domicilio'
        }).then((result) => {
            if (result.isConfirmed) {
                const zone = $(".client_zone").val();
                const location = $(".client_location").val();
                const address = $(".client_address").val();
                if ((zone != "" && location != "" && address != "" && zone != "Desconocido" && location != "Desconocido" && address != "Desconocido")) {
                    $("#type_dom_close").text('Repartidor.');
                    $('#select-delivery').prop('disabled', false);
                    $('#select-delivery').val("").trigger("change");
                    hideOption();
                    $('#type_dom_address').show();
                    closeModalBootstrap.show();
                } else {
                    toastr.error("Primero registra una dirección, una zona y link de ubicacion.");
                }
            } else {
                reverseHideOption();
                $("#address-div-custom-temp").hide();
                $("#address-custom-temp").val("");
                $('#select-address').val("0").trigger("change");
                $("#type_dom_close").text('Tipo de entrega.');
                $('#select-delivery').val("0").trigger("change");
                $('#select-delivery').prop('disabled', true);
                $('#type_dom_address').hide();
                closeModalBootstrap.show();
            }
        });
    }

    function hideOption() {
        $('#select-delivery option[value="0"]').remove();
        updateSelectType();
    }

    function reverseHideOption() {
        var newOption = new Option("Recoger en local", 0);
        $('#select-delivery').append(newOption);
        updateSelectType();
    }

    function updateSelectType() {
        $('#select-delivery').select2({
            theme: 'bootstrap4'
        });
    }

    function moveContact(selector) {
        var $elemento = $(selector);
        var $contenedor = $elemento.parent();

        $elemento.detach();
        $contenedor.prepend($elemento);
    }

    function closeDay() {
        $('#maximus-chat-option').click();
        $('.close_day_class').hide();
        $("#body_close_day").removeClass("none");
        $('#card_body_close_day').addClass('row');
        $('#direct-chat-view').addClass('col-md-6');
        $('.direct-chat-contacts').hide();
        $.ajax({
            url: "/api/temp",
            method: "GET",
            dataType: "json",
            success: function (response) {
                console.log(response);
                if (response.length != 0) {
                    resumeDay = response;
                    openChat(response[0].TempClient);
                    $('#chats_no_converse').text(response.length + "");
                    if (response.length != 1) {
                        $("#next_btn_resume").attr("onclick", "nextResume(1)");
                    } else {
                        $("#next_btn_resume").attr("onclick", "finishResume(1)");
                    }
                } else {
                    $("#direct-chat-view").html("");
                    $(".client_name").text("");
                    $(".client_location").text('');
                    $(".client_address").text("");
                    $(".client_observations").text("");
                    $(".client_id").text("");
                    toastr.info("<b>Servidor:</b> No hay nigun chat que cumpla las condiciones del cierre de dia.");
                    $("#next_btn_resume").attr("onclick", "finishResume(0)");
                    $("#next_btn_resume").text('Finalizar');
                }
            },
            error: function (xhr, status, error) {
                console.log(error);
                toastr.error(error);
            },
        });
    }

    function nextResume(i) {
        toastr.info("<b>Servidor:</b> Cargando datos del siguiente chat no convertido.");
        indexResumeDay = i;
        const option = $('#resume_type_reason').val() == "Otro" ? $('#resume_type_reason_textarea').val() : $('#resume_type_reason').val();
        if (option.length > 5) {
            $.ajax({
                url: "/api/temp/active",
                method: "POST",
                data: {
                    TempClient: resumeDay[i - 1].TempClient,
                    TempReason: option,
                },
                dataType: "json",
                success: function (response) {
                    if (response.ok) {
                        try {
                            openChat(response[i].TempClient);
                            $("#next_btn_resume").attr("onclick", "nextResume(" + (i + 1) + ")");
                        } catch (error) {
                            $("#next_btn_resume").attr("onclick", "finishResume(" + (i + 1) + ")");
                            $("#next_btn_resume").text('Finalizar');
                        }
                    }
                },
                error: function (xhr, status, error) {
                    console.log(error);
                    toastr.error(error);
                },
            });

        }

    }

    function finishResume(i) {
        if (i == 0) {
            $("#next_btn_resume").hide();
            $('#cancel_btn_resume').hide();
            socket.emit('resume', {
                cant: resumeDay.length
            });
            window.location.href = "/";
        } else {
            indexResumeDay = i;
            const option = $('#resume_type_reason').val() == "Otro" ? $('#resume_type_reason_textarea').val() : $('#resume_type_reason').val();
            if (option.length > 3) {
                $.ajax({
                    url: "/api/temp/active",
                    method: "POST",
                    data: {
                        TempClient: resumeDay[i - 1].TempClient,
                        TempReason: option,
                    },
                    dataType: "json",
                    success: function (response) {
                        if (response.ok) {
                            $("#next_btn_resume").hide();
                            $('#cancel_btn_resume').hide();
                            socket.emit('resume', {
                                cant: resumeDay.length
                            });
                            window.location.href = "/";
                        }
                    },
                    error: function (xhr, status, error) {
                        console.log(error);
                        toastr.error(error);
                    },
                });

            }
        }
    }

    $("#resume_type_reason").change(function () {
        var value = $(this).val();
        if (value == "Otro") {
            $("#other_resume_day").removeClass("none");
        } else {
            $("#other_resume_day").addClass("none");
        }
    });