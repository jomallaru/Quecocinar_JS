function guardarBlog() {
    let formData = new FormData();
    formData.append('nombre', $("#nombre").val());
    formData.append('fecha', $("#fecha").val());
    formData.append('texto', $("#texto").val());
    formData.append('imagen', $("#imagen")[0].files[0]); // Obtener el archivo de imagen seleccionado
    
    $.ajax({
      url: "https://g1e315ff777a567-cocinar.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/comentario/blog",
      type: "POST",
      data: formData,
      processData: false, // Indicar que no se procese el contenido de formData
      contentType: false, // Indicar que no se establezca el tipo de contenido automáticamente
      success: function (respuesta) {
        alert("Su comentario guardado correctamente");
        $("#nombre").val("");
        $("#fecha").val("");
        $("#texto").val("");
        $("#imagen").val(""); // Limpiar el campo de entrada de imagen
      },
      error: function (xhr, status) {
        alert("Error al guardar el comentario");
      }
    });
  }
  
  




function guardarComentario() {
    let crearComentario = {
      'nombre': $("#nombre").val(),
      'fecha': $("#fecha").val(),
      'texto': $("#texto").val()
    };
  
    $.ajax({
      url: "https://g1e315ff777a567-cocinar.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/comentario/blog",
      type: "POST",
      data: crearComentario,
      dataType: "json",
      success: function (respuesta) {
        alert("Comentario guardado correctamente");
        $("#nombre").val("");
        $("#fecha").val("");
        $("#texto").val("");
      },
      error: function (xhr, status) {
        alert("Error al guardar el comentario");
      }
    });
  }
  