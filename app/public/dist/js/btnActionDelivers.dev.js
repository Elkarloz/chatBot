function getAllDeliverys() {
  fetch("/api/Delivery/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      if (!resp.redirected) {
        return resp.json();
      } else {
        window.location.href = "/login";
      }
    })
    .then((data) => {
      const tableBody = document.getElementById("tableBody");
      let html = "";

      data.forEach((delivery) => {
        html += `
          <tr>
            <td>${delivery.DelId}</td>
            <td>${delivery.DelName}</td>
            <td>${delivery.DelPhone}</td>
            <td style="width: 200px;">
              <div class="div-center">
                <button
                  type="button"
                  class="btn btn-block btn-warning btn-sm mx-2"
                  data-toggle="modal" data-target="#editModal1"
                  onclick="editDelivery('${delivery.DelId}', '${delivery.DelName}', '${delivery.DelPhone}')"
                >
                  Editar
                </button>
                <button
                  type="button"
                  class="btn btn-block btn-danger btn-sm mt-0"
                  onclick="deleteDelivery('${delivery.DelId}')"
                >
                  Eliminar
                </button>
              </div>
            </td>
          </tr>
        `;
      });

      tableBody.innerHTML = html;
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
    });
}

function editDelivery(dataId, dataName, dataPhone) {
  const inputName = document.getElementById("exampleInputName1");
  const inputPhone = document.getElementById("exampleInputPhone1");
  const modalbtnEdit = document.getElementById("modalbtnEdit");

  modalbtnEdit.setAttribute("onclick", `editDeliveryModal(${dataId})`);

  inputPhone.value = dataPhone;
  inputName.value = dataName;
}

function editDeliveryModal(dataId) {
  const inputName = document.getElementById("exampleInputName1");
  const inputPhone = document.getElementById("exampleInputPhone1");

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
    .then((resp) => {
      if (!resp.redirected) {
        return resp.json();
      } else {
        window.location.href = "/login";
      }
    })
    .then((data) => {
      $("#editModal1").modal("hide");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: data,
        showConfirmButton: false,
        timer: 1500,
      });
      return getAllDeliverys();
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });

      console.error("Error fetching data:", error);
    });
}

function creteDelivery() {
  const inputName = document.getElementById("exampleInputName1Add");
  const inputPhone = document.getElementById("exampleInputPhone1Add");
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
    .then((resp) => {
      if (!resp.redirected) {
        return resp.json();
      } else {
        window.location.href = "/login";
      }
    })
    .then((data) => {
      $("#addModal1").modal("hide");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: data,
        showConfirmButton: false,
        timer: 1500,
      });
      inputName.value = "";
      inputPhone.value = "";
      
      return getAllDeliverys();
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });

      console.error("Error fetching data:", error);
    });
}

function deleteDelivery(dataId) {
  fetch("/Api/Delivery/" + dataId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      if (!resp.redirected) {
        return resp.json();
      } else {
        window.location.href = "/login";
      }
    })
    .then((data) => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: data,
        showConfirmButton: false,
        timer: 1500,
      });
      return getAllDeliverys();
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });

      console.error("Error fetching data:", error);
    });
}
