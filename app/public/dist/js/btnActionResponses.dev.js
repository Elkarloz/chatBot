function getAllResponses() {
  fetch("/api/responses/", {
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

      data.forEach((response) => {
        html += `
          <tr>
            <td>${response.ResId}</td>
            <td>${response.ResTitle}</td>
            <td>${response.ResResponse}</td>
            <td style="width: 200px;">
              <div class="div-center">
                <button
                  type="button"
                  class="btn btn-block btn-warning btn-sm mx-2"
                  data-toggle="modal"
                  data-target="#editModal2"
                  onclick="editResponses('${response.ResId}', '${response.ResTitle}', '${response.ResResponse}')"
                >
                  Editar
                </button>
                <button
                  type="button"
                  class="btn btn-block btn-danger btn-sm mt-0"
                  onclick="deleteResponses('${response.ResId}')"
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

function editResponses(ResId, ResTitle, ResResponse) {
  const inputT = document.getElementById("exampleInputName2");
  const inputR = document.getElementById("exampleInputPhone2");
  const modalbtnEditR = document.getElementById("modalbtnEdit2");

  modalbtnEditR.setAttribute("onclick", `editResponseModal(${ResId})`);

  inputT.value = ResTitle;
  inputR.value = ResResponse;
}

function editResponseModal(ResId) {
  const inputT = document.getElementById("exampleInputName2");
  const inputR = document.getElementById("exampleInputPhone2");
  const data = {
    ResTitle: inputT.value,
    ResResponse: inputR.value,
  };

  fetch("/api/responses/" + ResId, {
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
      $("#editModal2").modal("hide");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: data,
        showConfirmButton: false,
        timer: 1500,
      });

      return getAllResponses();
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

function creteResponse() {
  const inputTitle = document.getElementById("exampleInputName2Add");
  const inputResponse = document.getElementById("exampleInputPhone2Add");

  const data = {
    ResTitle: inputTitle.value,
    ResResponse: inputResponse.value,
  };

  fetch("/api/responses/", {
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
      $("#addModal2").modal("hide");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: data,
        showConfirmButton: false,
        timer: 1500,
      });

      return getAllResponses();
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

function deleteResponses(ResId) {
  fetch("/api/responses/" + ResId, {
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
      $("#editModal2").modal("hide");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: data,
        showConfirmButton: false,
        timer: 1500,
      });

      return getAllResponses();
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
