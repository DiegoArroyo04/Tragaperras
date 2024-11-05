window.addEventListener("load", function () {
    //Cargar hora por primera vez
    horaCargada = cargarHora();

    //Cargar hora cada segundo
    setInterval(cargarHora, 1000);


    // Ocultar el preloader
    document.getElementById("preloader").style.display = "none";


});


function cargarHora() {
    var horaActual = new Date();
    var texto = document.getElementById('hora');
    texto.innerHTML = horaActual.getHours() + " : " + horaActual.getMinutes() + " : " + horaActual.getSeconds();
    horaCargada = true;
    return horaCargada;
}