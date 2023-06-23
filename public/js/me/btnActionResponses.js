const btnEdit = document.querySelectorAll(".btnEdit");
const btnDelete = document.getElementById("btnDelete");
let dataId = "";
const textAlert = document.getElementById("alert-success").querySelector("p");
const modal = document.getElementById("modal-center");
const modal2 = document.getElementById("modal-center-2");

textAlert.innerHTML = "";
const modalbtnEdit = document.getElementById("modalbtnEdit");

function editResponses(ResId, ResTitle, ResResponse) {
  const inputTitle = document.getElementById("inputTitle");
  const inputResponse = document.getElementById("inputResponse");
  modalbtnEdit.setAttribute("onclick", `editResponseModal(${ResId})`);

  inputTitle.value = ResTitle;
  inputResponse.value = ResResponse;
}

function editResponseModal(ResId) {
  const data = {
    ResTitle: inputTitle.value,
    ResResponse: inputResponse.value,
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
      UIkit.modal("#modal-center").hide();
      document.getElementById("alert-success").hidden = false;
      textAlert.innerHTML = data;
      setTimeout(() => {
        document.getElementById("alert-success").hidden = true;
      }, 3000);

      // Esperar a que el primer fetch se complete antes de continuar
      return getAllResponses();
    });
}

function getAllResponses() {
  fetch("/Api/Response/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      tableBody.innerHTML = "";
      data.forEach((response, index) => {
        tableBody.innerHTML += `
          <tr>
            <td>${response.ResId}</td>
            <td>${response.ResTitle}</td>
            <td>${response.ResResponse}</td>
            <td style="width: 250px">
              <button 
                class="uk-button uk-button-secondary uk-button-small"
                uk-toggle="target: #modal-center"
                uk-icon="icon: pencil" 
                id="btnEdit"
                onclick="editResponses(${response.ResId}, '${response.ResTitle}', '${response.ResResponse}')"
              >
                Editar
              </button>
              <button 
                class="uk-button uk-button-danger uk-button-small"
                uk-icon="icon: trash"
                id="btnDel"
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
      UIkit.modal("#modal-center-2").hide();
      document.getElementById("alert-success").hidden = false;
      textAlert.innerHTML = data;
      inputTitle.value = "";
      inputResponse.value = "";
      setTimeout(() => {
        document.getElementById("alert-success").hidden = true;
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
      document.getElementById("alert-success").hidden = false;
      textAlert.innerHTML = data;
      setTimeout(() => {
        document.getElementById("alert-success").hidden = true;
      }, 3000);

      // Esperar a que el primer fetch se complete antes de continuar
      return getAllResponses();
    });
}

function openModal() {
  UIkit.modal(modal2).show();
}

function closeModal() {
  UIkit.modal(modal).hide();
  UIkit.modal(modal2).hide();
}
