function buscarRecetas() {
    const ingrediente = document.getElementById('ingrediente').value.toLowerCase();
    const cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML = ''; // Limpiar contenedor de cards

    // Hacer petición a la API para obtener las recetas
    fetch('https://g1e315ff777a567-cocinar.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/recetas/recetas')
        .then(response => response.json())
        .then(data => {
            // Filtrar las recetas que contengan el ingrediente ingresado
            const recetasFiltradas = data.items.filter(receta =>
                receta.ingredientes.toLowerCase().includes(ingrediente)
            );

            // Mostrar las recetas filtradas en forma de cards
            mostrarRecetas(recetasFiltradas);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error de Petición');
        });
}



function mostrarRecetas(recetas) {
    let htmlparaagregar = "";
  
    if (recetas.length === 0) {
      alert("No se encontró receta con ese ingrediente");
    } else {
      for (let i = 0; i < recetas.length; i++) {
        htmlparaagregar += '<div class="card">';
        htmlparaagregar += '<h2>' + recetas[i].nombre + '</h2>';
        htmlparaagregar += '<p>' + recetas[i].preparacion + '</p>';
        htmlparaagregar += '<ul>';
        htmlparaagregar += '<li><strong>Ingredientes:</strong> ' + recetas[i].ingredientes + '</li>';
        htmlparaagregar += '<li><strong>Tiempo:</strong> ' + recetas[i].tiempo + ' minutos</li>';
        htmlparaagregar += '<li><strong>Dificultad:</strong> ' + recetas[i].dificultad + '</li>';
        htmlparaagregar += '</ul>';
        htmlparaagregar += '</div>';
      }
  
      document.getElementById("cards-container").innerHTML = htmlparaagregar;
    }
  }
  