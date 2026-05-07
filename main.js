let listaEstudiantes = [];
let contadorId = 1;

const inputNombre = document.getElementById("inputNombre");
const inputEdad = document.getElementById("inputEdad");
const selectGrado = document.getElementById("selectGrado");
const selectEstado = document.getElementById("selectEstado");
const btnAgregar = document.getElementById("btnAgregar");
const btnLimpiar = document.getElementById("btnLimpiar");
const btnFiltrar = document.getElementById("btnFiltrar");
const btnMostrarTodos = document.getElementById("btnMostrarTodos");
const inputBuscar = document.getElementById("inputBuscar");
const selectFiltroGrado = document.getElementById("selectFiltroGrado");
const selectFiltroEstado = document.getElementById("selectFiltroEstado");
const areaResultados = document.getElementById("areaResultados");
const contadorEstudiantes = document.getElementById("contadorEstudiantes");
const mensajeError = document.getElementById("mensajeError");

function agregarEstudiante() {

  const nombre = inputNombre.value.trim();

  const edad = inputEdad.value.trim();

  const grado = selectGrado.value;

  const estado = selectEstado.value;


  if (
    nombre === "" ||
    edad === "" ||
    grado === ""
  ) {

    mensajeError.textContent =
      "Complete todos los campos";

    mensajeError.style.display = "block";

    return;
  }


  if (edad < 1 || edad > 100) {

    mensajeError.textContent =
      "Ingrese una edad valida";

    mensajeError.style.display = "block";

    return;
  }


  const existe = listaEstudiantes.some(
    estudiante =>
      estudiante.nombre.toLowerCase() ===
      nombre.toLowerCase()
  );

  if (existe) {

    mensajeError.textContent =
      "Ese estudiante ya existe";

    mensajeError.style.display = "block";

    return;
  }


  mensajeError.style.display = "none";


  const nuevoEstudiante = {
    id: contadorId,
    nombre: nombre,
    edad: edad,
    grado: grado,
    estado: estado
  };


  listaEstudiantes.push(nuevoEstudiante);

  contadorId++;

  limpiarFormulario();

  mostrarEstudiantes(listaEstudiantes);
}



function mostrarEstudiantes(arreglo) {

  areaResultados.innerHTML = "";

  contadorEstudiantes.textContent =
    `Total: ${arreglo.length} estudiante(s)`;


  if (!arreglo.length) {

    const mensaje =
      document.createElement("p");

    mensaje.textContent =
      "No se encontraron estudiantes.";

    areaResultados.appendChild(mensaje);

    return;
  }


  const tabla =
    document.createElement("table");


  tabla.innerHTML = `
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Edad</th>
        <th>Grado</th>
        <th>Estado</th>
        <th>Accion</th>
      </tr>
    </thead>
  `;


  const cuerpo =
    document.createElement("tbody");


  arreglo.forEach((estudiante) => {

    const fila =
      document.createElement("tr");

    fila.innerHTML = `
      <td>${estudiante.id}</td>
      <td>${estudiante.nombre}</td>
      <td>${estudiante.edad}</td>
      <td>${estudiante.grado}</td>
      <td>${estudiante.estado}</td>
      <td>
        <button onclick="eliminarEstudiante(${estudiante.id})">
          Eliminar
        </button>
      </td>
    `;

    cuerpo.appendChild(fila);

  });


  tabla.appendChild(cuerpo);

  areaResultados.appendChild(tabla);
}



function eliminarEstudiante(idEliminar) {

  listaEstudiantes =
    listaEstudiantes.filter(
      estudiante =>
        estudiante.id !== idEliminar
    );

  mostrarEstudiantes(listaEstudiantes);
}



function filtrarEstudiantes() {

  const textoBuscar =
    inputBuscar.value.toLowerCase();

  const gradoFiltro =
    selectFiltroGrado.value;

  const estadoFiltro =
    selectFiltroEstado.value;


  const resultado =
    listaEstudiantes.filter((estudiante) => {

      const cumpleNombre =
        estudiante.nombre
          .toLowerCase()
          .includes(textoBuscar);

      const cumpleGrado =
        gradoFiltro === "" ||
        estudiante.grado === gradoFiltro;

      const cumpleEstado =
        estadoFiltro === "" ||
        estudiante.estado === estadoFiltro;

      return (
        cumpleNombre &&
        cumpleGrado &&
        cumpleEstado
      );

    });


  mostrarEstudiantes(resultado);
}



function limpiarFormulario() {

  inputNombre.value = "";

  inputEdad.value = "";

  selectGrado.value = "";

  selectEstado.value = "Activo";

  mensajeError.style.display = "none";
}



btnAgregar.addEventListener(
  "click",
  agregarEstudiante
);

btnLimpiar.addEventListener(
  "click",
  limpiarFormulario
);

btnFiltrar.addEventListener(
  "click",
  filtrarEstudiantes
);

btnMostrarTodos.addEventListener(
  "click",
  () => {

    inputBuscar.value = "";

    selectFiltroGrado.value = "";

    selectFiltroEstado.value = "";

    mostrarEstudiantes(listaEstudiantes);

  }
);

inputBuscar.addEventListener(
  "keyup",
  filtrarEstudiantes
);
