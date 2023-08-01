function getAllDeliverys() {
  window.location.href = "/delivers";
}

function editDelivery(dataId, dataName, dataPhone) {
  const inputName = document.getElementById("exampleInputName1");
  const inputPhone = document.getElementById("exampleInputPhone1");
  const modalbtnEdit = document.getElementById("modalbtnEdit");
  const modalbtnDelete = document.getElementById("modalbtnDelete");

  modalbtnDelete.setAttribute("onclick", `deleteDelivery(${dataId})`);
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