var listaEstudiantes = [];
var contadorId = 1;
var inputNombre = document.getElementById("inputNombre");
var inputEdad = document.getElementById("inputEdad");
var selectGrado = document.getElementById("selectGrado");
var selectEstado = document.getElementById("selectEstado");
var btnAgregar = document.getElementById("btnAgregar");
var btnLimpiar = document.getElementById("btnLimpiar");
var btnFiltrar = document.getElementById("btnFiltrar");
var btnMostrarTodos = document.getElementById("btnMostrarTodos");
var inputBuscar = document.getElementById("inputBuscar");
var selectFiltroGrado = document.getElementById("selectFiltroGrado");
var selectFiltroEstado = document.getElementById("selectFiltroEstado");
var areaResultados = document.getElementById("areaResultados");
var contadorEstudiantes = document.getElementById("contadorEstudiantes");
var mensajeError = document.getElementById("mensajeError");



function agregarEstudiante() {

  var nombre = inputNombre.value.trim();
  var edad = inputEdad.value.trim();
  var grado = selectGrado.value;
  var estado = selectEstado.value;

  if (nombre === "" || edad === "" || grado === "") {
    mensajeError.style.display = "block";
    return;
  }

  mensajeError.style.display = "none";

  var nuevoEstudiante = {
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
    "Total: " + arreglo.length + " estudiante(s)";

  if (arreglo.length === 0) {

    var mensaje = document.createElement("p");

    mensaje.textContent =
      "No se encontraron estudiantes.";

    areaResultados.appendChild(mensaje);

    return;
  }

  var tabla = document.createElement("table");

  tabla.innerHTML = 
  `<thead>
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Grado</th>
            <th>Estado</th>
            <th>Acción</th>
        </tr>
    </thead>`
    ;

  var cuerpo = document.createElement("tbody");

  for (var i = 0; i < arreglo.length; i++) {

    var estudiante = arreglo[i];

    var fila = document.createElement("tr");

    fila.innerHTML =
      "<td>" + estudiante.id + "</td>" +
      "<td>" + estudiante.nombre + "</td>" +
      "<td>" + estudiante.edad + "</td>" +
      "<td>" + estudiante.grado + "</td>" +
      "<td>" + estudiante.estado + "</td>" +
      "<td><button onclick='eliminarEstudiante(" + estudiante.id + ")'>Eliminar</button></td>";

    cuerpo.appendChild(fila);
  }

  tabla.appendChild(cuerpo);

  areaResultados.appendChild(tabla);
}



function eliminarEstudiante(idEliminar) {

  listaEstudiantes = listaEstudiantes.filter(function(estudiante) {

    return estudiante.id !== idEliminar;

  });

  mostrarEstudiantes(listaEstudiantes);
}



function filtrarEstudiantes() {

  var textoBuscar =
    inputBuscar.value.toLowerCase();

  var gradoFiltro =
    selectFiltroGrado.value;

  var estadoFiltro =
    selectFiltroEstado.value;

  var resultado =
    listaEstudiantes.filter(function(estudiante) {

      var cumpleNombre =
        estudiante.nombre.toLowerCase().includes(textoBuscar);

      var cumpleGrado =
        gradoFiltro === "" ||
        estudiante.grado === gradoFiltro;

      var cumpleEstado =
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
  function() {

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
