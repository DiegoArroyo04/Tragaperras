document.addEventListener("DOMContentLoaded", function () {
    setInterval(cargarHora, 1000);
});
function cargarHora() {
    var horaActual = new Date();
    var texto = document.getElementById('hora');
    texto.innerHTML = horaActual.getHours() + " : " + horaActual.getMinutes() + " : " + horaActual.getSeconds();
}