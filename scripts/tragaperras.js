window.addEventListener("load", function () {
    //Cargar hora por primera vez
    horaCargada = cargarHora();

    //Cargar hora cada segundo
    setInterval(cargarHora, 1000);


    // Ocultar el preloader
    document.getElementById("preloader").style.display = "none";

    //GIRAR CUANDO PULSE EL BOTON TIRAR
    document.getElementById("botonTirar").addEventListener('click', function () {
        girarCarretes();
    });

    //GIRAR CON EL ESPACIO
    window.addEventListener('keydown', function (event) {
        if (event.key === ' ') {
            event.preventDefault(); // Prevenir el desplazamiento de la página
            girarCarretes();
        }
    });


});


function cargarHora() {
    var horaActual = new Date();
    var texto = document.getElementById('hora');
    texto.innerHTML = horaActual.getHours() + " : " + horaActual.getMinutes() + " : " + horaActual.getSeconds();
    horaCargada = true;
    return horaCargada;
}

function girarCarretes() {
    const carretes = document.getElementsByClassName('carrete');


    for (let i = 0; i < carretes.length; i++) {
        // Añadir la clase 'girar' a cada carrete
        carretes[i].classList.add('girar');



        // Después de 1 segundo, quita la clase 'girar' para permitir que se pueda volver a girar
        setTimeout(() => {
            carretes[i].classList.remove('girar');
            // Para mostrar el resultado, se puede añadir lógica aquí para seleccionar una imagen al azar o mostrar el resultado final.
        }, 1000); // Asegúrate de que este tiempo coincida con la duración de la animación en CSS

    }

}