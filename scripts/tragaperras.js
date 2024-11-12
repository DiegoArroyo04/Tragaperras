window.addEventListener("load", function () {
    var saldo = 0;
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

        //SI PULSAMOS EN EL BOTON DE RETIRAR SE ABRE EL MODAL DE RETIRAR
        document.getElementById("abrirModalRetirar").addEventListener('click', function () {
            document.getElementById("modalDepositar").style.display = "none";
            document.getElementById("inputDeposito").value = "";
            document.getElementById("modalRetirar").style.display = "flex";
        });

        // SI PULSAMOS EN EL BOTON DE DEPOSITAR EN EL MODAL DE RETIRAR  SE ABRE EL MODAL DE DEPOSITAR
        document.getElementById("abrirModalDepositar").addEventListener('click', function () {



            document.getElementById("modalRetirar").style.display = "none";

            document.getElementById("inputRetiro").value = "";

            document.getElementById("modalDepositar").style.display = "flex";


        });
    });

    //GUARDAR SALDO Y ACTUALIZARLO
    document.getElementById("depositarBtn").addEventListener('click', function () {


        // CONVERTIR A DECIMAL
        var deposito = parseFloat(document.getElementById("inputDeposito").value);


        if (!isNaN(deposito) && deposito > 0) {
            saldo += deposito;
            document.getElementById("saldo").innerHTML = "Saldo:" + saldo + "€";
            mostrarError("Has depositado " + deposito + "€");
        } else {
            mostrarError("Formato de deposito no válido");
        }


        document.getElementById("modalDepositar").style.display = "none";
        document.getElementById("inputDeposito").value = "";
    });

    // RETIRAR SALDO Y ACTUALIZARLO
    document.getElementById("retirarBtn").addEventListener('click', function () {

        //CONVERTIR A DECIMAL
        var retiro = parseFloat(document.getElementById("inputRetiro").value);

        // Verifica si el valor es válido y que no sea mayor que el saldo
        if (!isNaN(retiro) && retiro > 0 && retiro <= saldo) {
            saldo -= retiro; // Resta el saldo retirado
            document.getElementById("saldo").innerHTML = "Saldo:" + saldo + "€";
            mostrarError("Has retirado " + retiro + "€");
        } else if (retiro > saldo) {
            mostrarError("No tienes suficiente saldo para retirar esa cantidad.");

        } else {
            mostrarError("Por favor, ingresa una cantidad válida.");

        }

        // Cierra el modal después del retiro
        document.getElementById("modalRetirar").style.display = "none";
        document.getElementById("inputRetiro").value = "";
    });


    //CERRAR MODAL AL HACER CLICK EN LA X
    document.getElementById("cerrarModalDepositar").addEventListener("click", function () {
        document.getElementById("modalDepositar").style.display = "none";

    })
    //CERRAR MODAL AL HACER CLICK EN LA X
    document.getElementById("cerrarModalRetirar").addEventListener("click", function () {
        document.getElementById("modalRetirar").style.display = "none";

    })

    // Cerrar el modal de error al hacer clic en la "X"
    document.getElementById("cerrarModalError").addEventListener("click", function () {
        document.getElementById("modalError").style.display = "none";
    });



    // Cierra el modal al hacer clic fuera del contenido
    window.addEventListener("click", (event) => {
        if (event.target == document.getElementById("modalDepositar")) {
            document.getElementById("modalDepositar").style.display = "none";

        }
        if (event.target == document.getElementById("modalRetirar")) {
            document.getElementById("modalRetirar").style.display = "none";

        }
    });

    //
    document.getElementById("daltonico").addEventListener('click', function () {
        document.getElementById("header").style.backgroundImage = 'linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent), url("./assets/headerDaltonico.jpg")';

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

// Mostrar mensaje de error en el modal
function mostrarError(mensaje) {
    document.getElementById('mensajeError').textContent = mensaje;
    document.getElementById('modalError').style.display = "flex";
}
