//__________________________________________________________Funcion para mostrar__________________________________________

function traerDatosRecetas() {
  $.ajax({
    url: "https://gb2ca086f6748de-s27aub565ndywxqi.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/recetas/recetas",
    type: "GET",
    dataType: "json",
    success: function (respuesta) {
      mostrarRecetas(respuesta.items);
    },
    error: function (respuesta, xhr) {
      alert("Error de Petición");
    }
  });
}

//__________________________________________________________Funcion para Guardar__________________________________________
function guardarReceta() {
  // Validar datos antes de enviar la solicitud
  let nombre = $("#nombre").val();
  let ingredientes = $("#ingredientes").val();
  let preparacion = $("#preparacion").val();
  let tiempo = $("#tiempo").val();
  let dificultad = $("#dificultad").val();

  if (!nombre || !ingredientes || !preparacion || !tiempo || !dificultad) {
    alert("Por favor, complete todos los campos.");
    return;
  }

  let crearReceta = {
    'nombre': nombre,
    'ingredientes': ingredientes,
    'preparacion': preparacion,
    'tiempo': tiempo,
    'dificultad': dificultad
  };

  $.ajax({
    url: "https://gb2ca086f6748de-s27aub565ndywxqi.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/recetas/recetas",
    type: "POST",
    data: crearReceta,
    dataType: "json",
    success: function (respuesta) {
      console.log(respuesta); // Mostrar la respuesta en la consola para fines de depuración
      alert("Receta creada correctamente");
      // Limpiar los campos después de una operación exitosa
      $("#nombre, #ingredientes, #preparacion, #tiempo, #dificultad").val("");
    },
    
    error: function (xhr, status, error) {
      console.error(xhr, status, error); // Mostrar información detallada del error en la consola
      alert("Error al crear la receta. Por favor, inténtelo de nuevo.");
    }
  });
}


//__________________________________________________________Funcion para eliminar__________________________________________


function eliminarReceta(nombre) {
  // Confirmar que se desea eliminar la receta
  if (confirm("¿Está seguro que desea eliminar la receta " + nombre + "?")) {
    // Enviar una petición DELETE a la API para eliminar la receta
    $.ajax({
      url: "https://gb2ca086f6748de-s27aub565ndywxqi.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/recetas/recetas?nombre=" + nombre,
      type: "DELETE",
      dataType: "json",
      success: function (respuesta) {
        alert("Receta eliminada correctamente");
        // Recargar la lista de recetas
        traerDatosRecetas();
      },
      error: function (xhr, status) {
        alert("Error al eliminar la receta");
      }
    });
  }
}


//__________________________________________________________Funcion para Actualizar__________________________________________

function editarReceta(nombre, ingredientes, preparacion, tiempo, dificultad) {
  // Ocultar la tabla y el título
  $("#tabla, #titulo").hide();

  // Crear el formulario para editar la receta
  let htmlFormulario = `<form id='formulario-editar'>
    <h2>Editar Receta</h2>
    <label for='nombre'>Nombre:</label>
    <input type='text' id='nombre' name='nombre' value='${nombre}'><br>
    <label for='preparacion'>Preparación:</label>
    <textarea id='preparacion' name='preparacion'>${preparacion}</textarea><br>
    <label for='ingredientes'>Ingredientes:</label>
    <textarea id='ingredientes' name='ingredientes'>${ingredientes}</textarea><br>
    <label for='tiempo'>Tiempo:</label>
    <input type='number' id='tiempo' name='tiempo' value='${tiempo}' min='0' max='5000' step='5'><br>
    <label for='dificultad'>Dificultad:</label>
    <select id='dificultad' name='dificultad' required>
      <option value=''>Seleccione la dificultad</option>
      <option value='Fácil'>Fácil</option>
      <option value='Intermedia'>Intermedia</option>
      <option value='Difícil'>Difícil</option>
    </select><br>
    <input type='submit' value='Guardar cambios'>
    <button type='button' onclick='cancelarEdicion()'>Cancelar</button>
  </form>`;

  // Agregar el formulario al contenedor de la tabla
  $("#tabla").after(htmlFormulario);

  // Establecer el valor de la dificultad
  $("#dificultad").val(dificultad);

 // Escuchar el evento submit del formulario
 $("#formulario-editar").submit(function (event) {
  event.preventDefault();
  guardarCambios();
});
}

function guardarCambios() {
console.log("Entrando en guardarCambios");

// Validar datos antes de enviar la petición
let nombre = $("#nombre").val();
if (!nombre) {
  alert("El nombre de la receta es obligatorio");
  return;
}

let datosEditarReceta = {
  'nombre': nombre,
  'ingredientes': $("#ingredientes").val(),
  'preparacion': $("#preparacion").val(),
  'tiempo': $("#tiempo").val(),
  'dificultad': $("#dificultad").val()
};

console.log("Datos a enviar:", datosEditarReceta);

$.ajax({
  url: `https://gb2ca086f6748de-s27aub565ndywxqi.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/recetas/recetas/${nombre}`,
  type: "PUT",
  data: datosEditarReceta,
  dataType: "json",

  success: function (respuesta) {
    console.log("Respuesta exitosa:", respuesta);
    alert("Receta actualizada correctamente");
    // Mostrar la tabla y el título
    $("#tabla, #titulo").show();
    // Eliminar el formulario de edición
    $("#formulario-editar").remove();
    // Recargar la lista de recetas
    traerDatosRecetas();
  },
  error: function (xhr, status, error) {
    console.error("Error al actualizar la receta:", xhr, status, error);
    alert("Error al actualizar la receta. Por favor, inténtalo de nuevo más tarde.");
  }
});
}

function cancelarEdicion() {
  // Eliminar el formulario de edición y mostrar la tabla de recetas
  $("#formulario-editar").remove();
  $("#tabla").show();
  $("#titulo").show();
}


//__________________________________________________________Funcion para Mostar la tabla en Html__________________________________________
function mostrarRecetas(recetas) {
  let tabla = $("#tabla");
  tabla.empty();
  tabla.append("<tr><th>Nombre</th><th>Ingredientes</th><th>Preparación</th><th>Tiempo</th><th>Dificultad</th><th>Eliminar</th><th>Editar</th></tr>");
  for (let i = 0; i < recetas.length; i++) {
    let botonEliminar = "<button type=\"button\" class=\"btn-eliminar\" onclick=\"eliminarReceta('" + recetas[i].nombre + "')\">Eliminar</button>";

    let botonEditar = "<button type=\"button\" onclick=\"editarReceta('" + recetas[i].nombre + "', '" + recetas[i].ingredientes + "', '" + recetas[i].preparacion + "', '" + recetas[i].tiempo + "', '" + recetas[i].dificultad + "')\">Editar</button>";
    tabla.append("<tr><td>" + recetas[i].nombre + "</td><td>" + recetas[i].ingredientes + "</td><td>" + recetas[i].preparacion + "</td><td>" + recetas[i].tiempo + " min</td><td>" + recetas[i].dificultad + "</td><td>" + botonEliminar + "</td><td>" + botonEditar + "</td></tr>");
  }
}

