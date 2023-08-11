function TraerComentarios() {
  $.ajax({
    url: "https://g1e315ff777a567-cocinar.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/comentario/blog",
    type: "GET",
    dataType: "json",
    success: function (respuesta) {
      mostrarBlog(respuesta.items);
    },
    error: function (xhr, status) {
      alert("Error de Petición");
    }
  });
}

function mostrarBlog(Blog) {
  let tabla = $("#tabla");
  tabla.empty();
  tabla.append("<tr><th>Receta</th><th>Ingredientes</th><th>Preparación</th><th>Dificultad</th><th>Eliminar</th><th>Editar</th></tr>");
  let botonEliminar = "<button type=\"button\" class=\"btn-eliminar\" onclick=\"eliminarComentario('" + Blog[i].Receta + "')\">Eliminar</button>";

  let botonEditar = "<button type=\"button\" onclick=\"editarComentario('" + Blog[i].Receta + "', '" + Blog[i].Ingredientes + "', '" + Blog[i].Preparacion + "', '" + Blog[i].Dificultad + "')\">Editar</button>";
  tabla.append("<tr><td>" + Blog[i].Receta + "</td><td>" + Blog[i].Ingredientes + "</td><td>" + Blog[i].Preparacion + "</td><td>" + Blog[i].Dificultad + "</td><td>" + botonEliminar + "</td><td>" + botonEditar + "</td></tr>");
}


function GuardarBlog() {
  let Blog = {
    'Receta': $("#nombre").val(),
    'Ingredientes': $("#ingredientes").val(),
    'Preparacion': $("#preparacion").val(),
    'Dificultad': $("#dificultad").val(),
    'Imagen': $("#imagen").val()
  };

  $.ajax({
    url: "https://g1e315ff777a567-cocinar.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/comentario/blog",
    type: "POST",
    data: Blog,
    dataType: "json",
    success: function (respuesta) {
      alert("Comentario creado correctamente"); 
      $("#nombre").val("");
      $("#ingredientes").val("");
      $("#preparacion").val("");
      $("#dificultad").val("");
      $("#imagen").val("");
    },
    error: function (xhr, status) {
      alert("Error");
    }
  });
}
