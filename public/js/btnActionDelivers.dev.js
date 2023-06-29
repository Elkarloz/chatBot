const btnEdit = document.querySelectorAll(".btnEdit");
const btnDelete = document.getElementById("btnDelete");
let dataId = "";

const textAlert = document.getElementById("alert-success").querySelector("p");
const modal = document.getElementById("modal-center");
const modal2 = document.getElementById("modal-center-2");
textAlert.innerHTML = "";
const modalbtnEdit = document.getElementById("modalbtnEdit");

function editDelivery(dataId, dataName, dataPhone) {
  const inputName = document.getElementById("inputName");
  const inputPhone = document.getElementById("inputPhone");
  modalbtnEdit.setAttribute("onclick", `editDeliveryModal(${dataId})`);
  inputName.value = dataName;
  inputPhone.value = dataPhone;
}

function editDeliveryModal(dataId) {
  const data = {
    DelName: inputName.value,
    DelPhone: inputPhone.value,
  };

  fetch("/Api/Delivery/" + dataId, {
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
      return getAllDeliverys();
    });
}

function getAllDeliverys() {
  fetch("/Api/Delivery/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      tableBody.innerHTML = "";
      data.forEach((delivery, index) => {
        tableBody.innerHTML += `
          <tr>
            <td id="dataId">${delivery.DelId}</td>
            <td id="dataName">${delivery.DelName}</td>
            <td id="dataPhone">${delivery.DelPhone}</td>
            <td style="width: 250px">
              <button 
                class="uk-button uk-button-secondary uk-button-small"
                uk-toggle="target: #modal-center"
                uk-icon="icon: pencil" 
                id="btnEdit"
                onclick="editDelivery(${delivery.DelId}, '${delivery.DelName}', '${delivery.DelPhone}')"
              >
                Editar
              </button>
              <button 
                class="uk-button uk-button-danger uk-button-small"
                uk-icon="icon: trash"
                id="btnDel"
                onclick="deleteDelivery(${delivery.DelId})"
              >
                Eliminar
              </button>
            </td>
          </tr>
        `;
      });
    });
}

function creteDelivery() {
  const inputName = document.getElementById("inputName2");
  const inputPhone = document.getElementById("inputPhone2");
  const data = {
    DelName: inputName.value,
    DelPhone: inputPhone.value,
  };

  fetch("/Api/Delivery/", {
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
      inputName.value = "";
      inputPhone.value = "";
      setTimeout(() => {
        document.getElementById("alert-success").hidden = true;
      }, 3000);

      // Esperar a que el primer fetch se complete antes de continuar

      return getAllDeliverys();
    });
}

function deleteDelivery(dataId) {
  fetch("/Api/Delivery/" + dataId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
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
      return getAllDeliverys();
    });
}

function openModal() {
  UIkit.modal(modal2).show();
}

function closeModal() {
  UIkit.modal(modal).hide();
  UIkit.modal(modal2).hide();
}
