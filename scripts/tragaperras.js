var estaGirando = false;
// Referencia a la barra de volumen y el texto del volumen
const barraVolumen = document.getElementById("barraVolumen");
const valorVolumen = document.getElementById("valorVolumen");
var volumen = barraVolumen.value / 100; // Convertir el valor de 0-100 a 0.0-1.0

var musica = new Audio('assets/musicaTragaperras.mp3');
musica.loop = true;
var musicaSuena = true;

var saldo = 0.00;
var creditos = 0;
var apuesta = 20;

window.addEventListener("load", function () {


    //Cargar hora por primera vez
    cargarHoraInicial();

    //JUEGO
    //APUESTAS
    //BOTON DE AUMENTAR APUESTA
    document.getElementById("aumentarApuesta").addEventListener("click", function () {

        //SI LA APUESTA ES MENOR DE DOSCIENTOS CREDITOS AUMENTAMOS LA APUESTA DE 20 EN 20 
        if (apuesta < 200) {
            apuesta += 20;
            document.getElementById("apuesta").innerHTML = apuesta;
        } else if (apuesta >= 200 && apuesta < 1000) {
            //SI LA APUESTA ESTA ENTRE 200 Y 1000 CREDITOS AUMENTAMOS DE 100 EN 100 
            apuesta += 100;
            document.getElementById("apuesta").innerHTML = apuesta;
        } else if (apuesta >= 1000 && apuesta < 2500) {
            //SI LA APUESTA ESTA ENTRE 1000 Y 2500 CREDITOS AUMENTAMOS DE 500 EN 500 
            apuesta += 500;
            document.getElementById("apuesta").innerHTML = apuesta;
        } else if (apuesta >= 2500 && apuesta < 10000) {
            //SI LA APUESTA ESTA ENTRE 2500 Y 10000 CREDITOS AUMENTAMOS DE 2500 EN 2500 
            apuesta += 2500;
            document.getElementById("apuesta").innerHTML = apuesta;
        }

        actualizarEstadoApuesta();

    });

    //BOTON DE DISMINUIR APUESTA
    document.getElementById("disminuirApuesta").addEventListener("click", function () {

        //SI LA APUESTA ES MENOR DE DOSCIENTOS CREDITOS RESTAMOS LA APUESTA DE 20 EN 20 
        if (apuesta <= 200 && apuesta > 20) {
            apuesta -= 20;
            document.getElementById("apuesta").innerHTML = apuesta;
        } else if (apuesta >= 200 && apuesta <= 1000) {
            //SI LA APUESTA ESTA ENTRE 200 Y 1000 CREDITOS RESTAMOS DE 100 EN 100 
            apuesta -= 100;
            document.getElementById("apuesta").innerHTML = apuesta;
        } else if (apuesta >= 1000 && apuesta <= 2500) {
            //SI LA APUESTA ESTA ENTRE 1000 Y 2500 CREDITOS RESTAMOS DE 500 EN 500 
            apuesta -= 500;
            document.getElementById("apuesta").innerHTML = apuesta;
        } else if (apuesta >= 2500 && apuesta <= 10000) {
            //SI LA APUESTA ESTA ENTRE 2500 Y 10000 CREDITOS RESTAMOS DE 2500 EN 2500 
            apuesta -= 2500;
            document.getElementById("apuesta").innerHTML = apuesta;
        }

        actualizarEstadoApuesta();

    });




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
        if (apuesta <= creditos) {
            girarCarretes(carretes);
            //QUITAR APUESTA
            creditos -= apuesta;
            document.getElementById("creditosTotales").innerHTML = creditos;
            document.getElementById("creditosInfo").innerHTML = "Creditos Actuales:" + creditos;
        } else {

            document.getElementById("textoTragaperras").innerHTML = "¡NO TIENES SUFICIENTES CREDITOS PARA ESA APUESTA!";
            setTimeout(() => {
                document.getElementById("textoTragaperras").innerHTML = "¡TIRE PARA GANAR!";
            }, 2000);

        }

    });

    //GIRAR CON EL ESPACIO
    window.addEventListener('keydown', function (event) {
        if (event.key === ' ') {
            event.preventDefault(); // Prevenir el desplazamiento de la página
            if (apuesta <= creditos) {
                girarCarretes(carretes);
                //QUITAR APUESTA
                creditos -= apuesta;
                document.getElementById("creditosTotales").innerHTML = creditos;
                document.getElementById("creditosInfo").innerHTML = "Creditos Actuales:" + creditos;
            } else {

                document.getElementById("textoTragaperras").innerHTML = "¡NO TIENES SUFICIENTES CREDITOS PARA ESA APUESTA!";
                setTimeout(() => {
                    document.getElementById("textoTragaperras").innerHTML = "¡TIRE PARA GANAR!";
                }, 2000);

            }
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
            //SALDO PARA HEADER
            document.getElementById("saldo").innerHTML = "Saldo:" + saldo + "€";
            //EN EL MODAL DE CREDITOS APARECERA EL SALDO ACTUAL 
            document.getElementById("saldoCreditosInfo").innerHTML = "Saldo Actual:" + saldo + "€";
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
            document.getElementById("saldoCreditosInfo").innerHTML = "Saldo Actual:" + saldo + "€";
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
    // Cerrar el modal de error al hacer clic en la "X"
    document.getElementById("cerrarModalDepositarCreditos").addEventListener("click", function () {
        document.getElementById("modalDepositarCreditos").style.display = "none";
    });
    // Cerrar el modal de error al hacer clic en la "X"
    document.getElementById("cerrarModalRetirarCreditos").addEventListener("click", function () {
        document.getElementById("modalRetirarCreditos").style.display = "none";
    });
    // Cerrar el modal de error al hacer clic en la "X"
    document.getElementById("cerrarModalRetirarCreditos").addEventListener("click", function () {
        document.getElementById("modalRetirarCreditos").style.display = "none";
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

        if (event.target == document.getElementById("modalSonidoPantalla")) {
            document.getElementById("modalSonidoPantalla").style.display = "none";
        }
        if (event.target == document.getElementById("modalDepositarCreditos")) {
            document.getElementById("modalDepositarCreditos").style.display = "none";
        }
        if (event.target == document.getElementById("modalRetirarCreditos")) {
            document.getElementById("modalRetirarCreditos").style.display = "none";
        }
        if (event.target == document.getElementById("modalTiradasAutomaticasPantalla")) {
            document.getElementById("modalTiradasAutomaticasPantalla").style.display = "none";
        }

    });

    window.addEventListener("scroll", (event) => {

        //ESCONDER MODAL DE SONIDO AL HACER SCROLL
        const modal = document.getElementById("modalSonidoPantalla");
        if (modal.style.display == "flex") {
            modal.style.display = "none";
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

    //CREDITOS
    document.getElementById("creditos").addEventListener("click", function () {
        document.getElementById("inputEurosACreditos").value = "";
        document.getElementById("modalDepositarCreditos").style.display = "flex";




    });
    //CONVERSION DE EUROS A CREDITOS
    document.getElementById("convertirBtn").addEventListener("click", function () {
        var eurosACreditos = parseFloat(document.getElementById("inputEurosACreditos").value);

        if (!isNaN(eurosACreditos) && eurosACreditos > 0 && eurosACreditos <= saldo) {
            mostrarError("Has convertido " + eurosACreditos + "€ a " + (eurosACreditos * 100) + " creditos");
            creditos += (eurosACreditos * 100);
            saldo -= eurosACreditos;
            document.getElementById("saldo").innerHTML = "Saldo:" + saldo + "€";
            document.getElementById("saldoCreditosInfo").innerHTML = "Saldo Actual:" + saldo + "€";
            document.getElementById("creditosInfo").innerHTML = "Creditos Actuales:" + creditos;
            document.getElementById("creditosTotales").innerHTML = creditos;

        } else if (eurosACreditos > saldo) {

            mostrarError("No tienes tantos euros disponibles para convertir.");
        } else {

            mostrarError("Por favor, ingresa una cantidad válida.");
        }

    });

    //MODAL DE RETIRAR CREDITOS 
    document.getElementById("abrirModalRetirarCreditos").addEventListener("click", function () {

        document.getElementById("inputEurosACreditos").value = "";
        document.getElementById("modalDepositarCreditos").style.display = "none";
        document.getElementById("modalRetirarCreditos").style.display = "flex";



    });

    //CONVERSION DE CREDITOS A EUROS
    document.getElementById("retirarCreditosBtn").addEventListener("click", function () {
        var creditosAEuros = parseFloat(document.getElementById("inputRetiroCreditos").value);


        if (!isNaN(creditosAEuros) && creditosAEuros > 0 && creditosAEuros <= creditos) {
            mostrarError("Has convertido " + creditosAEuros + " creditos a " + (creditosAEuros / 100) + " €");
            creditos -= creditosAEuros;
            saldo += (creditosAEuros / 100);

            document.getElementById("saldo").innerHTML = "Saldo:" + saldo + "€";
            document.getElementById("saldoCreditosInfo").innerHTML = "Saldo Actual:" + saldo + "€";
            document.getElementById("creditosInfo").innerHTML = "Creditos Actuales:" + creditos;
            document.getElementById("creditosTotales").innerHTML = creditos;

        } else if (creditosAEuros > creditos) {

            mostrarError("No tienes tantos creditos disponibles para convertir.");
        } else {

            mostrarError("Por favor, ingresa una cantidad válida.");
        }
    });


    //MODAL DE DEPOSITAR CREDITOS DESDE EL MODAL DE CONVERTIR CREDITOS A EUROS
    document.getElementById("abrirModalDepositarCreditos").addEventListener("click", function () {
        document.getElementById("inputRetiroCreditos").value = "";
        document.getElementById("modalRetirarCreditos").style.display = "none";
        document.getElementById("modalDepositarCreditos").style.display = "flex";
    });



    //INFORMACION
    document.getElementById("info").addEventListener("click", function () {

        document.getElementById("modalTablaPremios").style.display = "flex";
    });


    //SONIDO
    document.getElementById("sonido").addEventListener("click", function () {



        //PAUSAR LA MUSICA
        if (musicaSuena == true) {
            musica.pause();
            volumen = 0.0;
            musicaSuena = false;
            document.getElementById("sonido").src = "./assets/sonidoRojo.png";
            document.getElementById("iconoSonidoModal").src = "./assets/sonidoMuteRojo.png";
            //ABRO EL MODAL DE SONIDO
            document.getElementById("modalSonidoPantalla").style.display = "flex";

            // Cambia el color de la barra y del slider thumb a rojo
            barraVolumen.classList.add("mute");



        } else {
            //REAUNUDAR LA MUSICA
            musica.play();
            musicaSuena = true;
            document.getElementById("sonido").src = "./assets/sonido.png";
            //CIERRO EL MODAL DE SONIDO
            document.getElementById("modalSonidoPantalla").style.display = "none";

            // Vuelve a cambiar el color de la barra a su color original
            barraVolumen.classList.remove("mute");

        }


    });



    // Ajusta el volumen de todos los audios de la página
    barraVolumen.addEventListener("input", function () {
        volumen = barraVolumen.value / 100; // Convertir el valor de 0-100 a 0.0-1.0
        valorVolumen.textContent = barraVolumen.value; // Mostrar el valor actual

        musica.play();
        musica.volume = volumen;
        document.getElementById("iconoSonidoModal").src = "./assets/sonido.png";
        document.getElementById("sonido").src = "./assets/sonido.png"

        if (volumen == 0.0) {
            document.getElementById("iconoSonidoModal").src = "./assets/sonidoMuteRojo.png";
            document.getElementById("sonido").src = "./assets/sonidoRojo.png"
            barraVolumen.classList.add("mute"); // Añade la clase de mute

        } else {
            barraVolumen.classList.remove("mute"); // Elimina la clase de mute

        }

    });

    document.getElementById("iconoSonidoModal").addEventListener("click", function () {


        //PAUSAR LA MUSICA
        if (musicaSuena == true) {
            musica.pause();
            volumen = 0.0;
            musicaSuena = false;
            document.getElementById("sonido").src = "./assets/sonidoRojo.png";
            document.getElementById("iconoSonidoModal").src = "./assets/sonidoMuteRojo.png";

            // Cambia el color de la barra y del slider thumb a rojo
            barraVolumen.classList.add("mute");





        } else {
            //REAUNUDAR LA MUSICA
            musica.play();
            musicaSuena = true;
            document.getElementById("sonido").src = "./assets/sonido.png";
            document.getElementById("iconoSonidoModal").src = "./assets/sonido.png";

            //VOLER AL COLOR ORIGINAL EN LA BARRA
            barraVolumen.classList.remove("mute");

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
// FUNCIÓN PARA ACTUALIZAR ICONOS Y MENSAJES BASADOS EN EL VALOR DE APUESTA
function actualizarEstadoApuesta() {
    if (apuesta == 10000) {
        // Cambiar icono y mensaje para apuesta máxima
        document.getElementById("aumentarApuesta").src = "./assets/aumentarApuestaMaxima.png";
        document.getElementById("textoTragaperras").innerHTML = "¡APUESTA MAXIMA ALCANZADA!";
        setTimeout(() => {
            document.getElementById("textoTragaperras").innerHTML = "¡TIRE PARA GANAR!";
        }, 2000);
    } else if (apuesta == 20) {
        // Cambiar icono y mensaje para apuesta mínima
        document.getElementById("disminuirApuesta").src = "./assets/disminuirApuestaMinima.png";
        document.getElementById("textoTragaperras").innerHTML = "¡APUESTA MINIMA ALCANZADA!";
        setTimeout(() => {
            document.getElementById("textoTragaperras").innerHTML = "¡TIRE PARA GANAR!";
        }, 2000);
    } else {
        // Restaurar iconos y mensajes para valores intermedios
        document.getElementById("aumentarApuesta").src = "./assets/aumentarApuesta.png";
        document.getElementById("disminuirApuesta").src = "./assets/disminuirApuesta.png";
        document.getElementById("textoTragaperras").innerHTML = "¡TIRE PARA GANAR!";
        //SONIDO AUMENTAR Y DISMINUIR APUESTA
        var sonidoAumentarDisminuir = new Audio('assets/aumentarDisminuirApuesta.mp3');
        sonidoAumentarDisminuir.volume = volumen;
        sonidoAumentarDisminuir.play();
    }
}

//FUNCION PARA GIRAR LOS CARRETES Y SIMULAR EL JUEGO
function girarCarretes(carretes) {
    //COJO LA APUESTA ACTUAL AL GIRAR LOS CARRETES POR SI EL USUARIO LE DIERA POR SUBIR LA APUESTA AUNQUE SE LE HAYA COBRADO UNA MENOR
    var apuestaActual = apuesta;
    if (estaGirando == true) return; // Si ya está girando, no hacer nada

    estaGirando = true; // Bloquea el evento mientras está girando

    var sonidoCarrete = new Audio('assets/spin.mp3');
    sonidoCarrete.volume = volumen;
    reiniciarCarretes();


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

                //DEPUES DE TODAS LAS ANIMACIONES ACTIVAMOS QUE SE PUEDA VOLVER A TIRAR Y COMPROBAMOS LOS SIMBOLOS
                comprobarSimbolos(carrete1, carrete2, carrete3, apuestaActual);
                estaGirando = false;



            }, 3000); // Tiempo de duración de la animación (3 segundos)



        }, 3000); // Tiempo de duración de la animación (3 segundos)


    }, 3000); // Tiempo de duración de la animación (3 segundos)



}



// Mostrar mensaje de error en el modal
function mostrarError(mensaje) {
    document.getElementById('mensajeError').textContent = mensaje;
    document.getElementById('modalError').style.display = "flex";

    //CERRAR AUTOMATICAMENTE A LOS 2 SEGUNDOS
    setTimeout(() => {
        document.getElementById('modalError').style.display = "none";
    }, 2000);

}

function comprobarSimbolos(carrete1, carrete2, carrete3, apuestaActual) {


    var girafa = {
        imagen: "assets/iconoGirafa.png",
        multiCentral: 100,
        multiHorizontalesArribaAbajo: 50,
        multiDiagonal: 50
    };
    var arbol = {
        imagen: "assets/iconoArbol.png",
        multiCentral: 30,
        multiHorizontalesArribaAbajo: 15,
        multiDiagonal: 15
    };
    var loro = {
        imagen: "assets/iconoLoro.png",
        multiCentral: 20,
        multiHorizontalesArribaAbajo: 10,
        multiDiagonal: 10
    };
    var platanos = {
        imagen: "assets/iconoPlatanos.png",
        multiCentral: 10,
        multiHorizontalesArribaAbajo: 5,
        multiDiagonal: 5
    };

    var flor = {
        imagen: "assets/iconoFlor.png",
        multiCentral: 5,
        multiHorizontalesArribaAbajo: 2.5,
        multiDiagonal: 2.5
    };




    // COMPROBAR FILAS HORIZONTALES

    //GIRAFA
    comprobarFilasHorizontales(girafa, carrete1, carrete2, carrete3, apuestaActual);
    comprobarFilasHorizontales(arbol, carrete1, carrete2, carrete3, apuestaActual);
    comprobarFilasHorizontales(loro, carrete1, carrete2, carrete3, apuestaActual);
    comprobarFilasHorizontales(platanos, carrete1, carrete2, carrete3, apuestaActual);
    comprobarFilasHorizontales(flor, carrete1, carrete2, carrete3), apuestaActual;

    // COMPROBAR DIAGONALES
    comprobarDiagonales(girafa, carrete1, carrete2, carrete3, apuestaActual);
    comprobarDiagonales(arbol, carrete1, carrete2, carrete3, apuestaActual);
    comprobarDiagonales(loro, carrete1, carrete2, carrete3, apuestaActual);
    comprobarDiagonales(platanos, carrete1, carrete2, carrete3, apuestaActual);
    comprobarDiagonales(flor, carrete1, carrete2, carrete3, apuestaActual);

}
function comprobarFilasHorizontales(simbolo, carrete1, carrete2, carrete3, apuestaActual) {
    // Función auxiliar para obtener solo el nombre del archivo
    function obtenerNombreImagen(src) {
        return src.split('/').pop(); // Obtiene solo el nombre de la imagen
    }

    // LINEA DE ARRIBA
    if (obtenerNombreImagen(carrete1[0].src) === obtenerNombreImagen(carrete2[0].src) &&
        obtenerNombreImagen(carrete1[0].src) === obtenerNombreImagen(carrete3[0].src) &&
        obtenerNombreImagen(simbolo.imagen) === obtenerNombreImagen(carrete1[0].src)) {
        resaltarImagenes([carrete1[0], carrete2[0], carrete3[0]]);
        var premio = apuestaActual * simbolo.multiHorizontalesArribaAbajo;
        creditos += premio;
        document.getElementById("creditosTotales").innerHTML = creditos;
        document.getElementById("creditosInfo").innerHTML = "Creditos Actuales:" + creditos;
        setTimeout(() => mostrarError("¡HAS GANADO " + premio + " CREDITOS!"), 2000);
        document.getElementById("textoTragaperras").innerHTML = "GANANCIAS: " + premio + " CREDITOS!";
        setTimeout(() => document.getElementById("textoTragaperras").innerHTML = "¡TIRE PARA GANAR!", 5000);


    }

    // LINEA DEL MEDIO
    if (obtenerNombreImagen(carrete1[1].src) === obtenerNombreImagen(carrete2[1].src) &&
        obtenerNombreImagen(carrete1[1].src) === obtenerNombreImagen(carrete3[1].src) &&
        obtenerNombreImagen(simbolo.imagen) === obtenerNombreImagen(carrete1[1].src)) {
        resaltarImagenes([carrete1[1], carrete2[1], carrete3[1]]);
        var premio = apuestaActual * simbolo.multiCentral;
        creditos += premio;
        document.getElementById("creditosTotales").innerHTML = creditos;
        document.getElementById("creditosInfo").innerHTML = "Creditos Actuales:" + creditos;
        setTimeout(() => mostrarError("¡HAS GANADO " + premio + " CREDITOS!"), 2000);
        document.getElementById("textoTragaperras").innerHTML = "GANANCIAS: " + premio + " CREDITOS!";
        setTimeout(() => document.getElementById("textoTragaperras").innerHTML = "¡TIRE PARA GANAR!", 5000);

    }

    // LINEA DE ABAJO
    if (obtenerNombreImagen(carrete1[2].src) === obtenerNombreImagen(carrete2[2].src) &&
        obtenerNombreImagen(carrete1[2].src) === obtenerNombreImagen(carrete3[2].src) &&
        obtenerNombreImagen(simbolo.imagen) === obtenerNombreImagen(carrete1[2].src)) {
        resaltarImagenes([carrete1[2], carrete2[2], carrete3[2]]);
        var premio = apuestaActual * simbolo.multiHorizontalesArribaAbajo;
        creditos += premio;
        document.getElementById("creditosTotales").innerHTML = creditos;
        document.getElementById("creditosInfo").innerHTML = "Creditos Actuales:" + creditos;
        setTimeout(() => mostrarError("¡HAS GANADO " + premio + " CREDITOS!"), 2000);
        document.getElementById("textoTragaperras").innerHTML = "GANANCIAS: " + premio + " CREDITOS!";
        setTimeout(() => document.getElementById("textoTragaperras").innerHTML = "¡TIRE PARA GANAR!", 5000);

    }
}

function comprobarDiagonales(simbolo, carrete1, carrete2, carrete3, apuestaActual) {
    // Función auxiliar para obtener solo el nombre del archivo
    function obtenerNombreImagen(src) {
        return src.split('/').pop(); // Obtiene solo el nombre de la imagen
    }

    // DIAGONAL IZQUIERDA
    if (obtenerNombreImagen(carrete1[0].src) === obtenerNombreImagen(carrete2[1].src) &&
        obtenerNombreImagen(carrete1[0].src) === obtenerNombreImagen(carrete3[2].src) &&
        obtenerNombreImagen(simbolo.imagen) === obtenerNombreImagen(carrete1[0].src)) {
        resaltarImagenes([carrete1[0], carrete2[1], carrete3[2]]);
        var premio = apuestaActual * simbolo.multiDiagonal;
        creditos += premio;
        document.getElementById("creditosTotales").innerHTML = creditos;
        document.getElementById("creditosInfo").innerHTML = "Creditos Actuales:" + creditos;
        setTimeout(() => mostrarError("¡HAS GANADO " + premio + " CREDITOS!"), 2000);
        document.getElementById("textoTragaperras").innerHTML = "GANANCIAS: " + premio + " CREDITOS!";
        setTimeout(() => document.getElementById("textoTragaperras").innerHTML = "¡TIRE PARA GANAR!", 5000);

    }

    // DIAGONAL DERECHA
    if (obtenerNombreImagen(carrete3[0].src) === obtenerNombreImagen(carrete2[1].src) &&
        obtenerNombreImagen(carrete3[0].src) === obtenerNombreImagen(carrete1[2].src) &&
        obtenerNombreImagen(simbolo.imagen) === obtenerNombreImagen(carrete3[0].src)) {
        resaltarImagenes([carrete3[0], carrete2[1], carrete1[2]]);
        var premio = apuestaActual * simbolo.multiDiagonal;
        creditos += premio;
        document.getElementById("creditosTotales").innerHTML = creditos;
        document.getElementById("creditosInfo").innerHTML = "Creditos Actuales:" + creditos;
        setTimeout(() => mostrarError("¡HAS GANADO " + premio + " CREDITOS!"), 2000);
        document.getElementById("textoTragaperras").innerHTML = "GANANCIAS: " + premio + " CREDITOS!";
        setTimeout(() => document.getElementById("textoTragaperras").innerHTML = "¡TIRE PARA GANAR!", 5000);

    }
}
// Función para resaltar imágenes específicas
function resaltarImagenes(imagenes) {
    imagenes.forEach(imagen => {

        imagen.classList.add("destacar"); // Añadir clase de resaltar

    });
}

// Función para reiniciar los carretes y quitar el resaltado
function reiniciarCarretes() {
    // Eliminar la clase 'destacar' de todas las imágenes
    const imagenesDestacadas = document.querySelectorAll('.destacar');
    imagenesDestacadas.forEach(imagen => {
        imagen.classList.remove('destacar');
    });
}



