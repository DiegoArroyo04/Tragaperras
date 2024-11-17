var estaGirando = false;
var musica = new Audio('assets/musicaTragaperras.mp3');
musica.loop = true;
var musicaSuena = true;

window.addEventListener("load", function () {


    var saldo = 0;
    //Cargar hora por primera vez
    cargarHoraInicial();

    //JUEGO
    var girafa = "iconoGirafa.png";
    var arbol = "iconoArbol.png";
    var loro = "iconoLoro.png";
    var platanos = "iconoPlatanos.png";
    var flor = "iconoFlor.png";

    // Matriz de imágenes de los carretes
    var carretes = [
        [girafa, arbol, loro, platanos, flor, flor, platanos, platanos, loro, arbol, flor, platanos, flor, loro, flor],
        [girafa, arbol, loro, platanos, flor, flor, platanos, platanos, loro, arbol, flor, platanos, flor, loro, flor],
        [girafa, arbol, loro, platanos, flor, flor, platanos, platanos, loro, arbol, flor, platanos, flor, loro, flor]
    ];

    //GIRAR CUANDO PULSE EL BOTON TIRAR
    document.getElementById("botonTirar").addEventListener('click', function () {
        girarCarretes(carretes);


    });

    //GIRAR CON EL ESPACIO
    window.addEventListener('keydown', function (event) {
        if (event.key === ' ') {
            event.preventDefault(); // Prevenir el desplazamiento de la página
            girarCarretes(carretes);
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

    // Cerrar el modal de error al hacer clic en la "X"
    document.getElementById("cerrarModalAjustes").addEventListener("click", function () {
        document.getElementById("modalAjustes").style.display = "none";
    });

    // Cerrar el modal de error al hacer clic en la "X"
    document.getElementById("cerrarModalTablaPremios").addEventListener("click", function () {
        document.getElementById("modalTablaPremios").style.display = "none";
    });



    // Cierra el modal al hacer clic fuera del contenido
    window.addEventListener("click", (event) => {
        if (event.target == document.getElementById("modalDepositar")) {
            document.getElementById("modalDepositar").style.display = "none";

        }
        if (event.target == document.getElementById("modalRetirar")) {
            document.getElementById("modalRetirar").style.display = "none";

        }
        if (event.target == document.getElementById("modalError")) {
            document.getElementById("modalError").style.display = "none";

        }
        if (event.target == document.getElementById("modalAjustes")) {
            document.getElementById("modalAjustes").style.display = "none";

        }
        if (event.target == document.getElementById("modalTablaPremios")) {
            document.getElementById("modalTablaPremios").style.display = "none";

        }
    });

    //AJUSTES
    document.getElementById("configuracion").addEventListener("click", function () {
        document.getElementById("modalAjustes").style.display = "flex";
    });
    //MODO OSCURO
    document.getElementById("modoOscuro").addEventListener("click", function () {
        document.body.classList.toggle("modo-oscuro");
        // Cambia la imagen del icono de modo oscuro según el estado actual
        const iconoModoOscuro = document.getElementById("modoOscuro"); // ID del elemento de icono

        if (document.body.classList.contains("modo-oscuro")) {
            document.getElementById("textoModoOscuro").innerHTML = "Cambiar A Modo Color:"
            iconoModoOscuro.src = "./assets/modoClaro.png";// Icono para el modo claro

        } else {
            document.getElementById("textoModoOscuro").innerHTML = "Cambiar A Modo Oscuro:"
            iconoModoOscuro.src = "./assets/modoOscuro.png"; // Icono para el modo oscuro
        }

    });

    document.getElementById("info").addEventListener("click", function () {

        document.getElementById("modalTablaPremios").style.display = "flex";
    });

    //SONIDO
    document.getElementById("sonido").addEventListener("click", function () {
        //PAUSAR LA MUSICA
        if (musicaSuena == true) {
            musica.pause();
            musicaSuena = false;
            document.getElementById("sonido").src = "./assets/sonidoRojo.png";
        } else {
            //REAUNUDAR LA MUSICA
            musica.play();
            musicaSuena = true;
            document.getElementById("sonido").src = "./assets/sonido.png";
        }

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
    //CARGAR MUSICA AL CARGAR LA PAGINA
    if (musicaSuena == true) {
        musica.play();
    }


}

function girarCarretes(carretes) {
    if (estaGirando == true) return; // Si ya está girando, no hacer nada

    estaGirando = true; // Bloquea el evento mientras está girando

    var sonidoCarrete = new Audio('assets/spin.mp3');



    // Generamos 3 números aleatorios para cada carrete (de 1 a 15)
    let numerosAleatorios = [
        Math.floor(Math.random() * 15),  // Primer carrete Icono 1
        Math.floor(Math.random() * 15),  // Primer carrete Icono 2
        Math.floor(Math.random() * 15),  // Primer carrete Icono 3

        Math.floor(Math.random() * 15),  // Segundo carrete Icono 1
        Math.floor(Math.random() * 15),  // Segundo carrete Icono 2
        Math.floor(Math.random() * 15),  // Tercer carrete Icono 3

        Math.floor(Math.random() * 15),  // Primer carrete Icono 1
        Math.floor(Math.random() * 15),  // Segundo carrete Icono 2
        Math.floor(Math.random() * 15),  // Tercer carrete Icono 3

    ];
    //Actualizamos texto
    document.getElementById("textoTragaperras").innerHTML = "¡BUENA SUERTE!";


    // Acceder a los carretes y actualizar las imágenes
    let carrete1 = document.getElementById("carrete1").getElementsByTagName("img");
    let carrete2 = document.getElementById("carrete2").getElementsByTagName("img");
    let carrete3 = document.getElementById("carrete3").getElementsByTagName("img");


    // Agregar la clase 'girar' a cada icono del carrete 1
    for (i = 0; i < carrete1.length; i++) {
        carrete1[i].classList.add('girar');
    }




    // ESPERO DOS SEGUNDOS PARA QUE COMIENCEN LOS CARRETES A GIRAR Y NO SE VEA EL CAMBIO DE IMAGEN
    setTimeout(() => {
        //COMBINACIONES A COMPROBAR
        //CAMBIO LAS IMAGENES ALEATORIAMENTE 
        carrete1[0].src = "assets/" + carretes[0][numerosAleatorios[0]];
        carrete1[1].src = "assets/" + carretes[0][numerosAleatorios[1]];
        carrete1[2].src = "assets/" + carretes[0][numerosAleatorios[2]];


    }, 2000);



    setTimeout(() => {


        // Eliminar la clase 'girar' después de que las imágenes se hayan actualizado


        for (i = 0; i < carrete1.length; i++) {
            carrete1[i].classList.remove('girar');
        }



        //AQUI SE CAMBIA EL RESTO DE IMAGENES DE LA TRAGAPERRAS PARA QUE EN LA PROXIMA TIRADA LOS ICONOS NO SEAN LOS MISMOS Y LA ANIMACION DE GIRO SEA DINAMICA
        for (i = 3; i < carrete1.length; i++) {
            var aleatorio = Math.floor(Math.random() * 15);
            carrete1[i].src = "assets/" + carretes[0][aleatorio];
        }

        for (i = 3; i < carrete2.length; i++) {
            var aleatorio = Math.floor(Math.random() * 15);
            carrete2[i].src = "assets/" + carretes[1][aleatorio];
        }

        for (i = 3; i < carrete3.length; i++) {
            var aleatorio = Math.floor(Math.random() * 15);
            carrete3[i].src = "assets/" + carretes[2][aleatorio];
        }

        sonidoCarrete.play();



        //ANIMACION CARRETE 2
        for (i = 0; i < carrete2.length; i++) {
            carrete2[i].classList.add('girar');
        }


        // ESPERO DOS SEGUNDOS PARA QUE COMIENCEN LOS CARRETES A GIRAR Y NO SE VEA EL CAMBIO DE IMAGEN
        setTimeout(() => {
            //COMBINACIONES A COMPROBAR
            //CAMBIO LAS IMAGENES ALEATORIAMENTE 
            carrete2[0].src = "assets/" + carretes[1][numerosAleatorios[3]];
            carrete2[1].src = "assets/" + carretes[1][numerosAleatorios[4]];
            carrete2[2].src = "assets/" + carretes[1][numerosAleatorios[5]];


        }, 2000);
        setTimeout(() => {


            // Eliminar la clase 'girar' después de que las imágenes se hayan actualizado


            for (i = 0; i < carrete2.length; i++) {
                carrete2[i].classList.remove('girar');
            }

            //AQUI SE CAMBIA EL RESTO DE IMAGENES DE LA TRAGAPERRAS PARA QUE EN LA PROXIMA TIRADA LOS ICONOS NO SEAN LOS MISMOS Y LA ANIMACION DE GIRO SEA DINAMICA
            for (i = 3; i < carrete1.length; i++) {
                var aleatorio = Math.floor(Math.random() * 15);
                carrete1[i].src = "assets/" + carretes[0][aleatorio];
            }

            for (i = 3; i < carrete2.length; i++) {
                var aleatorio = Math.floor(Math.random() * 15);
                carrete2[i].src = "assets/" + carretes[1][aleatorio];
            }

            for (i = 3; i < carrete3.length; i++) {
                var aleatorio = Math.floor(Math.random() * 15);
                carrete3[i].src = "assets/" + carretes[2][aleatorio];
            }

            sonidoCarrete.play();

            //ANIMACION CARRETE 3
            for (i = 0; i < carrete3.length; i++) {
                carrete3[i].classList.add('girar');
            }


            // ESPERO DOS SEGUNDOS PARA QUE COMIENCEN LOS CARRETES A GIRAR Y NO SE VEA EL CAMBIO DE IMAGEN
            setTimeout(() => {
                //COMBINACIONES A COMPROBAR
                //CAMBIO LAS IMAGENES ALEATORIAMENTE 
                carrete3[0].src = "assets/" + carretes[2][numerosAleatorios[6]];
                carrete3[1].src = "assets/" + carretes[2][numerosAleatorios[7]];
                carrete3[2].src = "assets/" + carretes[2][numerosAleatorios[8]];



            }, 2000);
            setTimeout(() => {


                // Eliminar la clase 'girar' después de que las imágenes se hayan actualizado


                for (i = 0; i < carrete3.length; i++) {
                    carrete3[i].classList.remove('girar');
                }

                //AQUI SE CAMBIA EL RESTO DE IMAGENES DE LA TRAGAPERRAS PARA QUE EN LA PROXIMA TIRADA LOS ICONOS NO SEAN LOS MISMOS Y LA ANIMACION DE GIRO SEA DINAMICA
                for (i = 3; i < carrete1.length; i++) {
                    var aleatorio = Math.floor(Math.random() * 15);
                    carrete1[i].src = "assets/" + carretes[0][aleatorio];
                }

                for (i = 3; i < carrete2.length; i++) {
                    var aleatorio = Math.floor(Math.random() * 15);
                    carrete2[i].src = "assets/" + carretes[1][aleatorio];
                }

                for (i = 3; i < carrete3.length; i++) {
                    var aleatorio = Math.floor(Math.random() * 15);
                    carrete3[i].src = "assets/" + carretes[2][aleatorio];
                }

                sonidoCarrete.play();



            }, 3000); // Tiempo de duración de la animación (3 segundos)



        }, 3000); // Tiempo de duración de la animación (3 segundos)



        //DEPUES DE TODAS LAS ANIMACIONES ACTIVAMOS QUE SE PUEDA VOLVER A TIRAR
        estaGirando = false;
        document.getElementById("textoTragaperras").innerHTML = "¡TIRE PARA GANAR!";



    }, 3000); // Tiempo de duración de la animación (3 segundos)



}



// Mostrar mensaje de error en el modal
function mostrarError(mensaje) {
    document.getElementById('mensajeError').textContent = mensaje;
    document.getElementById('modalError').style.display = "flex";
}