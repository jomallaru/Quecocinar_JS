function verificarAcceso() {
  // Obtener los valores de los campos de texto
  const usuario = $('#username').val();
  const clave = $('#password').val();

  // Enviar una solicitud GET al servidor para verificar los datos existentes
  $.ajax({
    url: 'https://g1e315ff777a567-cocinar.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/registro/registro',
    type: 'GET',
    dataType: 'json',
    success: function (response) {
      const registros = response.items;
      const usuarioValido = registros.find(registro => registro.usuario === usuario && registro.clave === clave);

      if (usuarioValido) {

        
        alert('Advertencia: Esta sección del sitio le permitirá agregar, editar o borrar información. Por favor, asegúrese de respetar la información existente y utilizar esta función con responsabilidad. ¿Desea continuar?');
        // Si los datos son correctos, redirige a la nueva dirección HTML
        window.location.href = "../page/recetas.html";
      } else {
        // Si los datos son incorrectos, muestra un mensaje de error
        alert('Usuario o clave incorrectos');
      }
    },
    error: function () {
      // Si ocurre un error muestra un mensaje de error
      alert('Ha ocurrido un error. Intente de nuevo más tarde.');
    }
  });
}





function guardarUsuario() {
  // Obtener los valores de los campos de texto
  const usuario = $('#usuario').val();
  const clave = $('#clave').val();
  const correo = $('#correo').val();

    // Validar que los campos no estén vacíos
    if (!usuario || !clave || !correo) {
      alert('Por favor, complete todos los campos.');
      return;
    }

  // Enviar una solicitud GET al servidor para verificar los datos existentes
  $.ajax({
    url: 'https://g1e315ff777a567-cocinar.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/registro/registro',
    type: 'GET',
    dataType: 'json',
    success: function (response) {
      const registros = response.items;
      const usuarioValido = registros.find(registro => registro.usuario === usuario);

      if (usuarioValido) {
        alert('El usuario ya existe, intente de nuevo.');
      } else {
        const nuevoUsuario = {
          usuario: usuario,
          clave: clave,
          correo: correo
        };
        
        // Enviar una solicitud POST al servidor para crear el nuevo usuario
        $.ajax({
          url: 'https://g1e315ff777a567-cocinar.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/registro/registro',
          type: 'POST',
          data: JSON.stringify(nuevoUsuario),
          contentType: 'application/json',
          success: function (respuesta) {
            // Mostrar un mensaje de éxito con el nombre del nuevo usuario creado
            alert('Usuario creado correctamente: ' + usuario);
            // Si los datos son correctos, redirige a la nueva dirección HTML
            window.location.href = '../page/login.html';
          },
          error: function (xhr, status) {
            // Mostrar un mensaje de error genérico si la solicitud falla
            alert('Error al crear el nuevo usuario, intente de nuevo.');
          }
        });
      }
    },
    error: function () {
      // Si ocurre un error muestra un mensaje de error
      alert('Ha ocurrido un error. Intente de nuevo más tarde.');
    }
  });
}

