let pagina = 1; 
let carregando = false; // para evitar múltiplas requisições simultâneas

function carregarImagens() {
  if (carregando) return; 

  carregando = true;
  var url = "exercicioajax.json"; 
  var ajax = new XMLHttpRequest();
  ajax.open("GET", url, true);

  ajax.onreadystatechange = function() {
    if (ajax.readyState == 4 && ajax.status == 200) {
      var response = ajax.responseText;

      try {
        var images = JSON.parse(response);
        var divImagens = document.getElementById("images");

        // Itera sobre o array de imagens
        images.animals.forEach(function(image) {
          var img = document.createElement("img");
          img.src = image.imagemUrl;
          img.alt = image.name;
          divImagens.appendChild(img);
        });

        carregando = false; // Reseta o estado
      } catch (error) {
        console.error("Erro ao processar JSON: ", error);
        carregando = false;
      }
    } else if (ajax.readyState == 4) {
      console.error("Erro ao carregar as imagens: " + ajax.status);
      carregando = false;
    }
  };

  ajax.send();
}

// Evento de rolagem para carregar mais imagens
window.onscroll = function() {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    carregarImagens();
  }
};

// Carrega imagens na primeira chamada
carregarImagens();