let statusOs = true;
let chatPhone = 0;
let chatActive = 0;
let menu = 0;
let socket;

function connectWebSocket() {
  socket = new WebSocket("ws://localhost:3000");

  socket.addEventListener("open", () => {
    console.log("Conexión WebSocket establecida");
  });

  socket.addEventListener("message", (event) => {
    console.log("Mensaje recibido desde el servidor:", event.data);
    if (event.data.includes("QR:")) {
      $("#qr_code").attr(
        "src",
        event.data.split("QR:")[1].replace('"', "").replace('"', "")
      );
    } else if (event.data == "SESSION:SESION ACTIVA.") {
      var html =
        "<h1>Bienvenido a chatBot Zumitos</h1><p>El chat personal de Zumitos es una herramienta integral que permite a los clientes interactuar directamente con la empresa de manera rápida y conveniente.</p><p class='text-success'>Estado de la conexion: Activo.</p>";
      $("#div_qr_code").html(html);
      statusOs = true;
    } else if (event.data == "SESSION:qrReadSuccess") {
      $("#qr_code").attr("src", "images/qr.gif");
    } else if (event.data.includes("SESSION:")) {
      $("#status_session").text(event.data.split("SESSION:")[1]);
    } else if (event.data.includes("MSG:")) {
      if (event.data.split("MSG:")[1].split("::")[0] == chatActive) {
        var content = event.data.split("MSG:")[1].split("::")[1];
        var html = "";
        if (content.split(">>")[1].includes("data")) {
          if (content.split(">>")[1].includes("image")) {
            html =
              '<div class="message text-only"><div class="response"><p class="text"><img width="200px" src="' +
              content.split(">>")[1] +
              '" alt="" /></p></div></div><p class="time">' +
              content.split(">>")[2] +
              "</p>";
          } else {
            html =
              '<div class="message text-only"><div class="response"><p class="text"><a href="' +
              content.split(">>")[1] +
              '" download="archivo.pdf"><img width="40px" src="images/pdf.png" alt="" />Archivo Pdf</a></p></div></div><p class="time">' +
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
          .animate(
            { scrollTop: $(".messages-chat").prop("scrollHeight") },
            500
          );
      }
    } else if (event.data.includes("MSGHOST:")) {
      if (event.data.split("MSGHOST:")[1].split("::")[0] == chatActive) {
        var content = event.data.split("MSGHOST:")[1].split("::")[1];
        var html = "";
        if (content.split(">>")[1].includes("data")) {
          if (content.split(">>")[1].includes("image")) {
            html =
              '<div class="message text-only"><div class="response"><p class="text"><img width="200px" src="' +
              content.split(">>")[1] +
              '" alt="" /></p></div></div><p class="time">' +
              content.split(">>")[2] +
              "</p>";
          } else {
            html =
              '<div class="message text-only"><div class="response"><p class="text"><a href="' +
              content.split(">>")[1] +
              '" download="archivo.pdf"><img width="40px" src="images/pdf.png" alt="" />Archivo Pdf</a></p></div></div><p class="time">' +
              content.split(">>")[2] +
              "</p>";
          }
        } else {
          html =
            '<div class="message text-only" bis_skin_checked="1"><div class="response" bis_skin_checked="1"><p class="text">' +
            content.split(">>")[1] +
            '</p></div></div><p class="response-time time">' +
            content.split(">>")[2] +
            "</p>";
          $(".messages-chat")
            .append(html)
            .animate(
              { scrollTop: $(".messages-chat").prop("scrollHeight") },
              500
            );
        }
      }
    } else if (event.data.includes("HISTORY:")) {
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
  });

  socket.addEventListener("close", () => {
    console.log("Conexión WebSocket cerrada");
    setTimeout(connectWebSocket, 3000);
  });
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
        case 4:
          $("#window_responses").removeClass("disable_window");
          break;
        default:
          break;
      }
    }
  });
});

function chargeChat(id) {
  if (statusOs) {
    $(".discussion").removeClass(".message-active");
    $(".discussion").each(function () {
      var dataId = $(this).data("id");
      if (dataId === id) {
        $(this).addClass(".message-active");
        chatActive = $(this).attr("data-id");
        chatPhone = $(this).attr("data-phone");
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
            .animate(
              { scrollTop: $(".messages-chat").prop("scrollHeight") },
              500
            );
        }
      },
      error: function (xhr, status, error) {
        console.error(error);
      },
    });
  }
}

function functionEnter(event) {
  if (event.keyCode === 13) {
    sendMessageText();
  }
}

function sendMessageText() {
  if (chatPhone != 0 && socket.readyState === WebSocket.OPEN) {
    socket.send(
      "MSG>>" + chatActive + ">>" + chatPhone + ">>" + $("#message_chat").val()
    );
  }
  $("#message_chat").val("");
}

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

const seleccionarBtn = document.getElementById("select-btn");
const archivoInput = document.getElementById("file-input");

seleccionarBtn.addEventListener("click", () => {
  archivoInput.click();
});

archivoInput.addEventListener("change", () => {
  const archivo = archivoInput.files[0];
  if (archivo) {
    const extension = archivo.name.split(".").pop().toLowerCase();
    const tiposPermitidos = ["pdf", "jpeg", "jpg", "png", "gif", "mp3", "wav"];
    const reader = new FileReader();

    if (tiposPermitidos.includes(extension)) {
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

//connectWebSocket();
