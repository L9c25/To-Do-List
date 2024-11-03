// Função para atualizar o datetime a cada segundo
function updateDateTime() {
	var dt = new Date();
	document.getElementById("datetime").innerHTML = dt.toLocaleString();
}

// Atualiza a cada segundo (1000 milissegundos = 1 segundo)
setInterval(updateDateTime, 1000);

// Chama a função imediatamente ao carregar a página
updateDateTime();