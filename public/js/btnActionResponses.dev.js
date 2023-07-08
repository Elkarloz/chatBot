const btnEditR = document.querySelectorAll(".btnEdit");
const btnDeleteR = document.getElementById("btnDelete");
const textAlertR = document
  .getElementById("alert-success-R")
  .querySelector("p");
const modalR = document.getElementById("modal-center-R");
const modal2R = document.getElementById("modal-center-2-R");
const tableBodyR = document.getElementById("tableBodyR");
textAlertR.innerHTML = "";
const modalbtnEditR = document.getElementById("modalbtnEdit-R");

function editResponses(ResId, ResTitle, ResResponse) {
  const inputT = document.getElementById("inputTitle-R");
  const inputR = document.getElementById("inputResponse");

  modalbtnEditR.setAttribute("onclick", `editResponseModal(${ResId})`);

  inputT.value = ResTitle;
  inputR.value = ResResponse;
}

function editResponseModal(ResId) {
  const inputT = document.getElementById("inputTitle-R");
  const inputR = document.getElementById("inputResponse");
  const data = {
    ResTitle: inputT.value,
    ResResponse: inputR.value,
  };

  fetch("/Api/Response/" + ResId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then((data) => {
      UIkit.modal("#modal-center-R").hide();
      document.getElementById("alert-success-R").hidden = false;
      textAlertR.innerHTML = data;
      setTimeout(() => {
        document.getElementById("alert-success-R").hidden = true;
      }, 3000);

      // Esperar a que el primer fetch se complete antes de continuar
      return getAllResponses();
    });
}

function getAllResponses() {
  chargeResponsesBox();
  fetch("/Api/Response/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      tableBodyR.innerHTML = "";
      data.forEach((response, index) => {
        tableBodyR.innerHTML += `
          <tr>
            <td>${response.ResId}</td>
            <td>${response.ResTitle}</td>
            <td>${response.ResResponse}</td>
            <td style="width: 250px">
              <button 
                class="uk-button uk-button-secondary uk-button-small"
                uk-toggle="target: #modal-center-R"
                uk-icon="icon: pencil" 
                id="btnEditR"
                onclick="editResponses(${response.ResId}, '${response.ResTitle}', '${response.ResResponse}')"
              >
                Editar
              </button>
              <button 
                class="uk-button uk-button-danger uk-button-small"
                uk-icon="icon: trash"
                id="btnDelR"
                onclick="deleteResponses(${response.ResId})"
              >
                Eliminar
              </button>
            </td>
          </tr>
        `;
      });
    });
}

function creteResponse() {
  const inputTitle = document.getElementById("inputTitle2");
  const inputResponse = document.getElementById("inputResponse2");

  const data = {
    ResTitle: inputTitle.value,
    ResResponse: inputResponse.value,
  };

  fetch("/Api/Response/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then((data) => {
      UIkit.modal("#modal-center-2-R").hide();
      document.getElementById("alert-success-R").hidden = false;
      textAlertR.innerHTML = data;
      inputTitle.value = "";
      inputResponse.value = "";
      setTimeout(() => {
        document.getElementById("alert-success-R").hidden = true;
      }, 3000);

      // Esperar a que el primer fetch se complete antes de continuar
      return getAllResponses();
    });
}

function deleteResponses(ResId) {
  fetch("/Api/Response/" + ResId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      document.getElementById("alert-success-R").hidden = false;
      textAlertR.innerHTML = data;
      setTimeout(() => {
        document.getElementById("alert-success-R").hidden = true;
      }, 3000);

      // Esperar a que el primer fetch se complete antes de continuar
      return getAllResponses();
    });
}

function openModalR() {
  UIkit.modal(modal2R).show();
}

function closeModal() {
  UIkit.modal(modalR).hide();
  UIkit.modal(modal2R).hide();
}
