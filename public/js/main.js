let statusOs = false;
let chatPhone = 0;
let chatActive = 0;
let menu = 0;
let socket;
let info = 0;
let smile = 0;
const admUser = "croameneses@gmail.com";
const audio = new Audio("/sounds/notification.mp3");
const emojis = [
  "😀",
  "😃",
  "😄",
  "😁",
  "😆",
  "😅",
  "😂",
  "🤣",
  "😊",
  "😇",
  "🙂",
  "🙃",
  "😉",
  "😌",
  "😍",
  "🥰",
  "😘",
  "😗",
  "😙",
  "😚",
  "😋",
  "😛",
  "😝",
  "😜",
  "🤪",
  "🤨",
  "🧐",
  "🤓",
  "😎",
  "🤩",
  "🥳",
  "😏",
  "😒",
  "😞",
  "😔",
  "😟",
  "😕",
  "🙁",
  "☹️",
  "😣",
  "😖",
  "😫",
  "😩",
  "🥺",
  "😢",
  "😭",
  "😮‍💨",
  "😤",
  "😠",
  "😡",
  "🤬",
  "🤯",
  "😳",
  "🥵",
  "🥶",
  "😱",
  "😨",
  "😰",
  "😥",
  "😓",
  "🤗",
  "🤔",
  "🤭",
  "🤫",
  "🤥",
  "😶",
  "😶‍🌫️",
  "😐",
  "😑",
  "😬",
  "🙄",
  "😯",
  "😦",
  "😧",
  "😮",
  "😲",
  "🥱",
  "😴",
  "🤤",
  "😪",
  "😵",
  "😵‍💫",
  "🤐",
  "🥴",
  "🤢",
  "🤮",
  "🤧",
  "😷",
  "🤒",
  "🤕",
  "🤑",
  "🤠",
  "😈",
  "👿",
  "👹",
  "👺",
  "🤡",
  "💩",
  "👻",
  "💀",
  "☠️",
  "👽",
  "👾",
  "🤖",
  "🎃",
  "😺",
  "😸",
  "😹",
  "😻",
  "😼",
  "😽",
  "🙀",
  "😿",
  "😾",
];

const seleccionarBtn = document.getElementById("select-btn");
const archivoInput = document.getElementById("file-input");

function connectWebSocket() {
  socket = new WebSocket("ws://162.240.106.149:3000");

  socket.addEventListener("open", () => {});

  socket.addEventListener("message", (event) => {
    if (event.data == "SESSION:SESION ACTIVA.") {
      hideLoaderConnection();
    }
    actionChat(event);
  });

  socket.addEventListener("close", () => {
    waitConnectionLoader();
    setTimeout(connectWebSocket, 3000);
  });
}

function codeQR(event) {
  $("#qr_code").attr(
    "src",
    event.data.split("QR:")[1].replace('"', "").replace('"', "")
  );
}

function codeQrDefault() {
  $("#qr_code").attr("src", "images/qr.gif");
}

function viewHome() {
  var html =
    "<h1 id='titleWelcome'>Bienvenido a chatBot Zumitos</h1><p id='captionWelcome'>El chat personal de Zumitos es una herramienta integral que permite a los clientes interactuar directamente con la empresa de manera rápida y conveniente.</p><p class='text-success'>Estado de la conexion: Activo.</p>" +
    '<img src="images/favicon.png" width="100px">';
  $("#div_qr_code").html(html);
  statusOs = true;
}

function changeStatus() {
  $("#status_session").text(event.data.split("SESSION:")[1]);
}

function receiveMsg(event) {
  soundNotify();
  if (event.data.split("MSG:")[1].split("::")[0] == chatActive) {
    var content = event.data.split("MSG:")[1].split("::")[1];
    var html = "";
    if (content.split(">>")[1].includes("data")) {
      if (content.split(">>")[1].includes("image")) {
        html =
          '<div class="message text-only"><p class="text"><img width="200px" src="' +
          content.split(">>")[1] +
          '" alt="" /></p></div><p class="time">' +
          content.split(">>")[2] +
          "</p>";
      } else {
        html =
          '<div class="message text-only"><p class="text"><a href="' +
          content.split(">>")[1] +
          '" download="archivo.pdf"><img width="40px" src="images/pdf.png" alt="" />Archivo Pdf</a></p></div><p class="time">' +
          content.split(">>")[2] +
          "</p>";
      }
    } else {
      html =
        '<div class="message" bis_skin_checked="1"><p class="text">' +
        content.split(">>")[1] +
        '</p></div><p class="time">' +
        content.split(">>")[2] +
        "</p>";
    }

    $(".messages-chat")
      .append(html)
      .animate({
          scrollTop: $(".messages-chat").prop("scrollHeight"),
        },
        500
      );
  }
}

function receiveMsgHost(event) {
  if (event.data.split("MSGHOST:")[1].split("::")[0] == chatActive) {
    var content = event.data.split("MSGHOST:")[1].split("::")[1];
    var html = "";
    if (content.split(">>")[1].includes("data")) {
      if (content.split(">>")[1].includes("image")) {
        html =
          '<div class="message text-only"><div class="response"><p class="text"><img width="200px" src="' +
          content.split(">>")[1] +
          '" alt="" /></p></div></div><p class="response-time time">' +
          content.split(">>")[2] +
          "</p>";
      } else if (content.split(">>")[1].includes("audio")) {
        html =
          '<div class="message text-only"><div class="response"><audio controls><source src="' +
          content.split(">>")[1] +
          '" type="audio/mpeg">Your browser does not support the audio element.</audio></div></div><p class="response-time time">' +
          content.split(">>")[2] +
          "</p>";
      } else {
        html =
          '<div class="message text-only"><div class="response"><p class="text"><a href="' +
          content.split(">>")[1] +
          '" download="archivo.pdf"><img width="40px" src="images/pdf.png" alt="" />Archivo Pdf</a></p></div></div><p class="response-time time">' +
          content.split(">>")[2] +
          "</p>";
      }
      $(".messages-chat")
        .append(html)
        .animate({
            scrollTop: $(".messages-chat").prop("scrollHeight"),
          },
          500
        );
    } else {
      html =
        '<div class="message text-only" bis_skin_checked="1"><div class="response" bis_skin_checked="1"><p class="text">' +
        content.split(">>")[1] +
        '</p></div></div><p class="response-time time">' +
        content.split(">>")[2] +
        "</p>";
      $(".messages-chat")
        .append(html)
        .animate({
            scrollTop: $(".messages-chat").prop("scrollHeight"),
          },
          500
        );
    }
  }
}

function setHistory(event) {
  var history = event.data.split("HISTORY:")[1];
  history = JSON.parse(history);
  var html =
    '<div class="discussion search"><div class="searchbar"><i class="fa fa-search" aria-hidden="true"></i><input type="text" placeholder="Buscar chat..." /></div></div>';
  history.forEach((element) => {
    html +=
      '<div class="discussion" onclick="chargeChat(' +
      element.id +
      ')" data-phone="' +
      element.phone +
      '" data-client="' +
      element.user +
      '" data-id="' +
      element.id +
      '" bis_skin_checked="1"><div class="photo" style="background-image: url(' +
      element.url +
      ');" bis_skin_checked="1"><div class="online" bis_skin_checked="1"></div></div><div class="desc-contact" bis_skin_checked="1"><p class="name">' +
      element.user +
      '</p><p class="message">' +
      element.message +
      '</p></div><div class="timer" bis_skin_checked="1">' +
      element.time +
      "</div></div>";
  });
  $(".discussions").html("");
  $(".discussions").append(html);
}

function actionChat(event) {
  if (event.data.includes("QR:")) {
    codeQR(event);
  } else if (event.data == "SESSION:SESION ACTIVA.") {
    viewHome();
  } else if (event.data == "SESSION:qrReadSuccess") {
    codeQrDefault();
  } else if (event.data.includes("SESSION:")) {
    changeStatus(event);
  } else if (event.data.includes("MSG:")) {
    receiveMsg(event);
  } else if (event.data.includes("MSGHOST:")) {
    receiveMsgHost(event);
  } else if (event.data.includes("HISTORY:")) {
    setHistory(event);
  } else if (event.data.includes("NOTIFY:")) {
    soundNotify();

    try {
      fetch("Api/Push/new-message", {
        method: "POST",
        body: JSON.stringify({
          message: event.data.split("NOTIFY:")[1]
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
}

function chargeChat(id) {
  if (statusOs) {
    $(".discussion").removeClass(".message-active");
    $(".discussion").each(function () {
      var dataId = $(this).data("id");
      if (dataId === id) {
        $(this).addClass(".message-active");
        chatActive = $(this).attr("data-id");
        chatPhone = $(this).attr("data-phone");
        chargeClient();
        chargeResponsesBox();
        setDeliverys();
        $("#name_client").text($(this).attr("data-client"));
      }
    });
    $.ajax({
      url: "/Api/Chat/" + chatActive,
      method: "GET",
      dataType: "json",
      success: function (response) {
        if (response.length != 0) {
          var html = "";
          for (let i = 0; i < response.length; i++) {
            const element = response[i];
            if (!element.includes("host>>")) {
              if (element.split(">>")[1].includes("data")) {
                if (element.split(">>")[1].includes("image")) {
                  html +=
                    '<div class="message text-only"><p class="text"><img width="200px" src="' +
                    element.split(">>")[1] +
                    '" alt="" /></p></div><p class="time">' +
                    element.split(">>")[2] +
                    "</p>";
                } else {
                  html +=
                    '<div class="message text-only"><p class="text"><a href="' +
                    element.split(">>")[1] +
                    '" download="archivo.pdf"><img width="40px" src="images/pdf.png" alt="" />Archivo Pdf</a></p></div><p class="time">' +
                    element.split(">>")[2] +
                    "</p>";
                }
              } else {
                html +=
                  '<div class="message" bis_skin_checked="1"><p class="text">' +
                  element.split(">>")[1] +
                  '</p></div><p class="time">' +
                  element.split(">>")[2] +
                  "</p>";
              }
            } else {
              if (element.split(">>")[1].includes("data")) {
                if (element.split(">>")[1].includes("image")) {
                  html +=
                    '<div class="message text-only"><div class="response"><p class="text"><img width="200px" src="' +
                    element.split(">>")[1] +
                    '" alt="" /></p></div></div><p class="response-time time">' +
                    element.split(">>")[2] +
                    "</p>";
                } else if (element.split(">>")[1].includes("audio")) {
                  html +=
                    '<div class="message text-only"><div class="response"><audio controls><source src="' +
                    element.split(">>")[1] +
                    '" type="audio/mpeg">Your browser does not support the audio element.</audio></div></div><p class="response-time time">' +
                    element.split(">>")[2] +
                    "</p>";
                } else {
                  html +=
                    '<div class="message text-only"><div class="response"><p class="text"><a href="' +
                    element.split(">>")[1] +
                    '" download="archivo.pdf"><img width="40px" src="images/pdf.png" alt="" />Archivo Pdf</a></p></div></div><p class="response-time time">' +
                    element.split(">>")[2] +
                    "</p>";
                }
              } else {
                html +=
                  '<div class="message text-only" bis_skin_checked="1"><div class="response" bis_skin_checked="1"><p class="text">' +
                  element.split(">>")[1] +
                  '</p></div></div><p class="response-time time">' +
                  element.split(">>")[2] +
                  "</p>";
              }
            }
          }
          $(".messages-chat")
            .html(html)
            .animate({
                scrollTop: $(".messages-chat").prop("scrollHeight"),
              },
              500
            );
        }
      },
      error: function (xhr, status, error) {
        error(error);
      },
    });
  }
}

function chargeClient() {
  $.ajax({
    url: "/Api/Chat/Cliente/" + chatPhone,
    method: "GET",
    dataType: "json",
    success: function (response) {
      if (response != null) {
        $("#CliName").val(response.CliName);
        $("#CliAddress").val(
          response.CliAddress == null ?
          "Sin Direccion registrada" :
          response.CliAddress
        );
        $("#CliObservation").val(
          response.CliObservation == null ?
          "Sin observaciones registradas" :
          response.CliObservation
        );
      }
    },
    error: function (xhr, status, error) {
      error(error);
    },
  });
}

function functionEnter(event) {
  if (event.keyCode === 13) {
    sendMessageText();
  }
}

function sendMessageText() {
  if (
    chatPhone != 0 &&
    socket.readyState === WebSocket.OPEN &&
    $("#message_chat").val() != ""
  ) {
    socket.send(
      "MSG>>" + chatActive + ">>" + chatPhone + ">>" + $("#message_chat").val()
    );
  }
  $("#message_chat").val("");
}

function openInfo() {
  if (info == 0) {
    $("#window_info").addClass("window_info_admin");
    $(".btn-window-close").addClass("btn-window-close-active");
    $(".btn-window-close-active").removeClass("btn-window-close");
    info = 1;
  } else {
    $("#window_info").removeClass("window_info_admin");
    $(".btn-window-close-active").addClass("btn-window-close");
    $(".btn-window-close").removeClass("btn-window-close-active");
    info = 0;
  }
}

function closeChat() {
  $("#name_client").text("Seleccione un chat");
  $(".messages-chat").html("");
  chatPhone = 0;
  chatActive = 0;
  $(".form-control").val("");
}

function setEmojis() {
  var html = "";
  for (let i = 0; i < emojis.length; i++) {
    html += '<span class="btn btn-emoji btn-sm">' + emojis[i] + "</span>";
  }
  $("#nav-emojis").html(html);
}

function chargeResponsesBox() {
  $.ajax({
    url: "/Api/Response/p/" + chatPhone,
    method: "GET",
    dataType: "json",
    success: function (response) {
      if (response.length != 0) {
        var html = "";
        for (let i = 0; i < response.length; i++) {
          html +=
            '<span data-msg="' +
            response[i].ResResponse +
            '" class="btn btn-response btn-sm">' +
            response[i].ResTitle +
            "</span>";
        }
        $("#nav-responses").html(html);
        $(".btn-response").click(function () {
          if (statusOs) {
            const msg = $(this).attr("data-msg");
            $("#message_chat").val(msg);
            sendMessageText();
          }
        });
      }
    },
    error: function (xhr, status, error) {
      error(error);
    },
  });
}

function error(string) {
  Swal.fire("Opps!", string, "error");
}

function waitConnectionLoader() {
  $("body").waitMe({
    effect: "bounce",
    text: "Esperando establecer una conexión...",
    bg: "rgba(255,255,255,0.7)",
    color: "#000",
    maxSize: "",
    waitTime: -1,
    textPos: "vertical",
    fontSize: "",
  });
}

function hideLoaderConnection() {
  $("body").waitMe("hide");
}

function setDeliverys() {
  $.ajax({
    url: "/Api/Delivery",
    method: "GET",
    dataType: "json",
    success: function (response) {
      if (response.length != 0) {
        var html = '<option value="0">Seleccione un repartidor</option>';
        for (let i = 0; i < response.length; i++) {
          const element = response[i];
          html +=
            '<option value="' +
            element.DelId +
            '">' +
            element.DelName +
            "</option>";
        }
        $("#delivery_select").html(html);
      }
    },
    error: function (xhr, status, error) {
      error(error);
    },
  });
}

function endChatFunction() {
  const temp = $("#delivery_select").val();
  const temp2 = document.getElementById("file_finish");
  const file = temp2.files[0];
  const reader = new FileReader();
  if (file) {
    const extension = file.name.split(".").pop().toLowerCase();
    const tiposPermitidos = ["pdf", "jpeg", "jpg", "png", "gif", "mp3", "wav"];
    if (tiposPermitidos.includes(extension)) {
      if (temp != 0 && chatPhone != 0) {
        reader.onload = () => {
          const contenido = reader.result;
          if (socket.readyState === WebSocket.OPEN) {
            socket.send(
              "FINISH>>" +
              chatActive +
              ">>" +
              chatPhone +
              ">>" +
              contenido +
              ">>" +
              temp
            );
            closeChat();
          } else {
            error(
              "Se ha perdido la conexión con el servidor, inténtelo de nuevo."
            );
            closeChat();
          }
        };
        reader.readAsDataURL(file);
      } else {
        error("No seleccionaste un repartidor válido.");
      }
    }
  }
}

function soundNotify() {
  audio.play();
}

$(document).ready(function () {
  $(".item").click(function () {
    if (statusOs) {
      $(".chat").addClass("disable_window");
      $(".item").removeClass("item-active");
      $(this).addClass("item-active");
      $("#window_info").addClass("disable_window");
      $(".discussions").addClass("disable_window");
      var index = $(this).index();
      switch (index + 1) {
        case 2:
          $("#window_start").removeClass("disable_window");
          break;
        case 5:
          $("#window_chat").removeClass("disable_window");
          $(".discussions").removeClass("disable_window");
          $("#window_info").removeClass("disable_window");
          break;
        case 6:
          $("#window_delivery").removeClass("disable_window");
          break;
        case 7:
          $("#window_config").removeClass("disable_window");
          break;
        case 4:
          $("#window_responses").removeClass("disable_window");
          break;
        default:
          break;
      }
    }
  });
});

$(document).ready(function () {
  $(".fa-menu").click(function () {
    if (menu == 0) {
      $(".menu").addClass("menu-open");
      $("#menu-nav").removeClass("item-menu");
      menu = 1;
    } else {
      $("#menu-nav").addClass("item-menu");
      $(".menu").removeClass("menu-open");
      menu = 0;
    }
  });
});

$(document).ready(function () {
  $("#btn-smile-option").click(function () {
    if (smile == 0) {
      smile = 1;
      $(".card-option-smile").show();
    } else {
      smile = 0;
      $(".card-option-smile").hide();
    }
  });
});

$(document).ready(function () {
  $(".btn-emoji").click(function () {
    if (statusOs) {
      const index = $(this).index();
      const msg = $("#message_chat").val();
      $("#message_chat").val(msg + emojis[index]);
    }
  });
});

$(document).ready(function () {
  $("#activeFormInfo").click(function () {
    var op = $(this).text();
    if (op == "Habilitar edición") {
      $(this).text("Deshabilitar edición");
      $("#CliName").removeAttr("readonly");
      $("#CliAddress").removeAttr("readonly");
      $("#CliObservation").removeAttr("readonly");
      $("#saveFormInfo").removeClass("disabled");
    } else {
      $("#saveFormInfo").addClass("disabled");
      $("#CliName").prop("readonly", true);
      $("#CliAddress").prop("readonly", true);
      $("#CliObservation").prop("readonly", true);
      $(this).text("Habilitar edición");
    }
  });
});

$(document).ready(function () {
  $("#saveFormInfo").click(function () {
    var CliName = $("#CliName").val();
    var CliAddress = $("#CliAddress").val();
    var CliObservation = $("#CliObservation").val();
    if (
      CliName != "" &&
      CliAddress != "" &&
      CliObservation != "" &&
      chatPhone != 0
    ) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn-left btn btn-primary",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Estás seguro de actualizar?",
          text: "No podrás revertir esto!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sí, actualiza!",
          cancelButtonText: "No, cancelar!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            $.ajax({
              url: "/Api/Chat/UpdateClient/" + chatPhone,
              method: "POST",
              contentType: "application/json",
              data: JSON.stringify({
                CliName: CliName,
                CliAddress: CliAddress,
                CliObservation: CliObservation,
              }),
              success: function (response) {
                if (response == "Cliente actualizado") {
                  swalWithBootstrapButtons.fire(
                    "Actualizado!",
                    "La información del cliente, ha sido actualizada correctamente.",
                    "success"
                  );
                  $("#saveFormInfo").addClass("disabled");
                  $("#CliName").prop("readonly", true);
                  $("#CliAddress").prop("readonly", true);
                  $("#CliObservation").prop("readonly", true);
                  $("#activeFormInfo").text("Habilitar edición");
                }
              },
              error: function (xhr, status, error) {
                swalWithBootstrapButtons.fire(
                  "Oops!",
                  "Ha ocurrido un error interno.",
                  "error"
                );
              },
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
              "Cancelado",
              "La acción ha sido cancelada correctamente.",
              "error"
            );
          }
        });
    } else {
      Swal.fire(
        "Opps?",
        "¡No hay información en los campos de información!",
        "question"
      );
    }
  });
});

seleccionarBtn.addEventListener("click", () => {
  archivoInput.click();
});

archivoInput.addEventListener("change", () => {
  const archivo = archivoInput.files[0];
  $("#file-input").val("");
  if (archivo) {
    const extension = archivo.name.split(".").pop().toLowerCase();
    const tiposPermitidos = ["pdf", "jpeg", "jpg", "png", "gif", "mp3", "wav"];
    const reader = new FileReader();

    if (
      tiposPermitidos.includes(extension) &&
      socket != undefined &&
      socket != null
    ) {
      reader.onload = () => {
        const contenido = reader.result;
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(
            "MSGFILE>>" + chatActive + ">>" + chatPhone + ">>" + contenido
          );
        } else {
          error(
            "Se ha perdido la conexión con el servidor, inténtelo de nuevo."
          );
        }
      };

      reader.readAsDataURL(archivo);
    } else {
      error("El tipo de archivo no es admitido para su envió.");
    }
  }
});

connectWebSocket();
setEmojis();
$(".card-option-smile").hide();
$("#activeFormInfo").text("Habilitar edición");