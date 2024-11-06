window.addEventListener("load", function () {
    //Cargar hora por primera vez
    cargarHoraInicial();






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


    //AÑADIR SALDO
    document.getElementById("añadirSaldo").addEventListener('click', function () {
        document.getElementById("modalDepositar").style.display = "flex";
    });


});

function cargarHoraInicial() {
    // Pedir permiso al usuario para obtener su ubicación
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                // Actualizar la hora cada segundo
                setInterval(() => cargarHora(timeZone), 1000);
            },
            (error) => {
                console.error("Error obteniendo la ubicación:", error);
                // Si no se puede obtener la ubicación, usar la zona horaria local por defecto
                const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                setInterval(() => cargarHora(timeZone), 1000);
            }
        );
    } else {
        console.error("La geolocalización no es soportada por este navegador.");
    }
}

function cargarHora(zonaHoraria) {


    var horaActual = new Date().toLocaleTimeString('es-ES', {
        timeZone: zonaHoraria,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    document.getElementById('hora').innerHTML = horaActual;

    // Ocultar el preloader cuando cargue la hora una vez
    document.getElementById("preloader").style.display = "none";
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