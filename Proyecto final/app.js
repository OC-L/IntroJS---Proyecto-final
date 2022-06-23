//Constantes

const formulario = document.querySelector("#opciones")
const form = document.querySelector("#form")
const contra = document.querySelector("#contra")
const boton = document.querySelector("#enviar")
const caja = document.querySelector("#general")
const retir = document.querySelector("#retiro")
const main = document.querySelector("#completo")
let deposit;

const datosInicio = {
  nombre: "",
  contraseña: ""
}

const datosDeposito = {
  saldoActual: "",
  aDepositar: "",
}



//Funciones

function mostrarContra() {
    var x = document.getElementById("contra");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
}


form.addEventListener("submit", (e) => {
  e.preventDefault();

  enviar.style.color = "white";

  datosInicio.nombre = formulario.value;
  datosInicio.contraseña = contra.value;
  console.log(datosInicio)

  validar();

  form.reset();
})


function validar() {
  var result = cuentas.filter(e => e.nombre == datosInicio.nombre && e.contraseña == datosInicio.contraseña);
  localStorage.setItem("usuario", JSON.stringify(result));

  if(result.length) {
    location.href = "./usuario.html"
  } else {
    let alerta = document.createElement("p");
    alerta.style.color = "rgb(230, 152, 152)";
    alerta.classList.add("error")
    alerta.innerHTML = "Datos incorrectos";

    if (!form.lastElementChild.classList.contains("error")) {
        form.appendChild(alerta)
    }
  }
}


function inicio() {
  location.href = "./usuario.html";
}


function cerrarSesion() {
  location.href = "./index.html";
}


function limpiarHTML() {
  form.innerHTML = "";
  while(form.firstChild) {
      form.firstChild.remove(info);
  }
}


function mostrarSaldo() {

  limpiarHTML();
  let clave = JSON.parse(localStorage.getItem("usuario"));

  clave.forEach(e => {
    const {saldo} = e;
    const info = document.createElement("div")
    info.classList.add("row")
    info.innerHTML = `
            <div class="col">
            <div class="text-center text-white fs-1 p-2 mb-0 form-control bg-black border-0">
                <i class="bi bi-receipt-cutoff icono2"></i>
            </div>
            <div class="text-center text-white fs-4 p-2 pt-0 mb-5 form-control bg-black border-0">
                <p class="boton2">Su saldo es de $${saldo}</p>
            </div>
            </div>
            `
    if (form.children.length < 1) {
        form.appendChild(info)
    }
  })
}


function deposito() {

  limpiarHTML();
  let account = JSON.parse(localStorage.getItem("usuario"));

  account.forEach(e => {
    const {saldo} = e;
    const info = document.createElement("div")
    info.classList.add("row")
    info.innerHTML = `
      <div class="col">
        <div class="text-center text-white fs-1 p-2 mb-0 form-control bg-black border-0">
          <i class="bi bi-wallet2 icono2"></i>
        </div>
        <div class="text-center text-white fs-4 p-2 pt-0 mb-5 form-control bg-black border-0">
          <p class="boton2">Su saldo actual es de $${saldo}, ¿cuánto desea depositar?</p>
          <input type="text" name="deposito" id="deposito" class="border-0 w-25">
          <button type="submit" id="depositar" class="btn btn-outline enviar fs-4 w-25" onclick="sumar()">Depositar</button>
        </div>
      </div>
      `
      if (form.children.length < 1) {
        form.appendChild(info)
      }
      deposit = document.querySelector("#deposito")
  })
}


function sumar() {

    limpiarHTML();
    let clave = JSON.parse(localStorage.getItem("usuario"));
    var result = cuentas.filter(e => e.nombre == datosInicio.nombre && e.contraseña == datosInicio.contraseña);

    clave.forEach(e => {

        let suma = e.saldo += Number(deposit.value);
        if(suma > 10 && suma < 990) {
        const info = document.createElement("div")
        info.classList.add("row")
        info.innerHTML = `
            <div class="col">
                <div class="text-center text-white fs-1 p-2 mb-0 form-control bg-black border-0">
                    <i class="bi bi-receipt-cutoff icono2"></i>
                </div>
                <div class="text-center text-white fs-4 p-2 pt-0 mb-5 form-control bg-black border-0">
                    <p class="boton2">Su nuevo saldo es de $${e.saldo}</p>
                </div>
            </div>
            `
            if (form.children.length < 1) {
                form.appendChild(info)
            }

        localStorage.setItem("usuario", JSON.stringify(clave));
        
        } else if (suma > 990){
            let alerta = document.createElement("div");
            alerta.classList.add("error")
            alerta.innerHTML = `
                <div class="text-center fs-4 p-2 pt-0 mb-5 form-control bg-black border-0">
                    <p class="fs-3 mt-2 alerta">Su cuenta no puede tener más de $990</p>
                    <button class="boton mt-5" onclick="deposito()">Reintentar</button>
                </div>`;

            if (!form.alerta) {
            form.appendChild(alerta)
        }
        } else {
          let alerta = document.createElement("div");
            alerta.classList.add("error")
            alerta.innerHTML = `
                <div class="text-center fs-4 p-2 pt-0 mb-5 form-control bg-black border-0">
                    <p class="fs-3 mt-2 alerta">Por favor ingrese un monto válido</p>
                    <button class="boton mt-5" onclick="deposito()">Reintentar</button>
                </div>`;

            if (!form.alerta) {
            form.appendChild(alerta)
            }
          }})

  console.log(result)
  console.log(clave)

//   if(clave.nombre == "Usuario 1") {
//     cuentas[0].saldo = Number(clave.saldo)
//   } else if(clave.nombre == "Usuario 2") {
//     cuentas[1].saldo = Number(clave.saldo)
//   } else if(clave.nombre == "Usuario 3") {
//     cuentas[2].saldo = Number(clave.saldo)
//   }
}


function retiro() {

    limpiarHTML();
    let account = JSON.parse(localStorage.getItem("usuario"));
  
    account.forEach(e => {
      const {saldo} = e;
      const info = document.createElement("div")
      info.classList.add("row")
      info.innerHTML = `
        <div class="col">
          <div class="text-center text-white fs-1 p-2 mb-0 form-control bg-black border-0">
            <i class="bi bi-cash-stack icono2"></i>
          </div>
          <div class="text-center text-white fs-4 p-2 pt-0 mb-5 form-control bg-black border-0">
            <p class="boton2">Su saldo actual es de $${saldo}, ¿cuánto desea retirar?</p>
            <input type="text" name="deposito" id="deposito" class="border-0 w-25">
            <button type="submit" id="depositar" class="btn btn-outline enviar fs-4 w-25" onclick="restar()">Retirar</button>
          </div>
        </div>
        `
        if (form.children.length < 1) {
          form.appendChild(info)
        }
        deposit = document.querySelector("#deposito")
    })
  }
  
  
function restar() {
  
      limpiarHTML();
      let clave = JSON.parse(localStorage.getItem("usuario"));
      var result = cuentas.filter(e => e.nombre == datosInicio.nombre && e.contraseña == datosInicio.contraseña);
  
      clave.forEach(e => {
  
          let resta = e.saldo -= Number(deposit.value);
          if(resta > 10) {
          const info = document.createElement("div")
          info.classList.add("row")
          info.innerHTML = `
              <div class="col">
                  <div class="text-center text-white fs-1 p-2 mb-0 form-control bg-black border-0">
                      <i class="bi bi-receipt-cutoff icono2"></i>
                  </div>
                  <div class="text-center text-white fs-4 p-2 pt-0 mb-5 form-control bg-black border-0">
                      <p class="boton2">Su nuevo saldo es de $${e.saldo}</p>
                  </div>
              </div>
              `
              if (form.children.length < 1) {
                  form.appendChild(info)
              }
  
          localStorage.setItem("usuario", JSON.stringify(clave));
          result.saldo = e.saldo
          } else if(resta < 10){
            let alerta = document.createElement("p");
            alerta.style.color = "rgb(230, 152, 152)";
            alerta.classList.add("error")
            alerta.innerHTML = `
                <div class="text-center fs-4 p-2 pt-0 mb-5 form-control bg-black border-0">
                    <p class="fs-3 mt-2 alerta">Su cuenta no puede tener menos de $10</p>
                    <button class="boton mt-5" onclick="retiro()">Reintentar</button>
                </div>`;

            if (!form.alerta) {
            form.appendChild(alerta)
            }
          } else {
            let alerta = document.createElement("div");
              alerta.classList.add("error")
              alerta.innerHTML = `
                  <div class="text-center fs-4 p-2 pt-0 mb-5 form-control bg-black border-0">
                      <p class="fs-3 mt-2 alerta">Por favor ingrese un monto válido</p>
                      <button class="boton mt-5" onclick="deposito()">Reintentar</button>
                  </div>`;
  
              if (!form.alerta) {
              form.appendChild(alerta)
              }
            }
          
      })
  
    console.log(result)
    console.log(clave)
  
  
  //   if(clave.nombre == "Usuario 1") {
  //     cuentas[0].saldo = Number(clave.saldo)
  //   } else if(clave.nombre == "Usuario 2") {
  //     cuentas[1].saldo = Number(clave.saldo)
  //   } else if(clave.nombre == "Usuario 3") {
  //     cuentas[2].saldo = Number(clave.saldo)
  //   }
  }