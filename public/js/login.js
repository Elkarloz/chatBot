const usu = document.getElementById("inp-usu");
const pass = document.getElementById("inp-pass");
const btnLogin = document.getElementById("btn-login");

btnLogin.addEventListener("click", async () => {
  try {
    const resp = await fetch("/Api/Admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        AdmUser: usu.value,
        AdmPass: pass.value,
      }),
    });
    const data = await resp.json();
    if (data === "Credenciales correctas") {
      window.location.href = "/home";
    } else {
      alert(data);
    }
  } catch (error) {
    console.log(error);
  }
});
