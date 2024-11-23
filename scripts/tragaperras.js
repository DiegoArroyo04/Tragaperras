var estaGirando = false;
// Referencia a la barra de volumen y el texto del volumen
const barraVolumen = document.getElementById("barraVolumen");
const valorVolumen = document.getElementById("valorVolumen");
var volumen = barraVolumen.value / 100; // Convertir el valor de 0-100 a 0.0-1.0

var barraTiradas = document.getElementById("barraTiradas");
var valorTiradas = document.getElementById("valorTiradas");
var tiradas = barraTiradas.value;
var activadorGiros = false;


//CANCION 
var musica = new Audio('assets/musicaTragaperras.mp3');
musica.loop = true;
var musicaSuena = true;

//SALDO APUESTAS
var saldo = 0.00;
var creditos = 0;
var apuesta = 20;

var intervaloTiradas = null;


//ICONOS
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

//IDIOMAS
var idiomaActual = 'es';
i18next.init({
    lng: 'es', // Idioma predeterminado
    resources: {
        es: {
            translation: {
                saldo: "Saldo:{{saldo}}€",
                saldoActual: "Saldo actual:{{saldo}}€",
                tirar: "¡TIRE PARA GANAR!",
                girosGratis: "¡HAS GANADO 10 GIROS GRATIS!",
                depositarTitulo: "DEPOSITAR",
                placeholderDeposito: "Introduce la cantidad que deseas depositar",
                depositarBtn: "Depositar",
                abrirModalRetirar: "Retirar",
                retirarTitulo: "RETIRAR",
                placeholderRetiro: "Introduce la cantidad que deseas retirar",
                retirarBtn: "Retirar",
                abrirModalDepositar: "Depositar",
                textoConfirmacionDeposito: "Has depositado ",
                textoErrorFormatoDeposito: "Formato de deposito no válido",
                textoConfirmacionRetiro: "Has retirado ",
                textoErrorRetiroSaldoInsuficiente: "No tienes suficiente saldo para retirar esa cantidad.",
                textoErrorFormatoRetiro: "Por favor, ingresa una cantidad válida.",
                tituloAjustes: "Ajustes",
                cambiarIdiomaTexto: "Cambiar Idioma A Ingles:",
                textoModoOscuro: "Cambiar A Modo Oscuro:",
                textoModoColor: "Cambiar A Modo Color:",
                creditosBoton: "Insertar Creditos",
                insertarCreditosTitulo: "CONVERTIR EUROS A CREDITOS",
                placeholderEurosACreditos: "Introduce la cantidad de euros que deseas convertir a creditos",
                convertirBtn: "Convertir a creditos",
                abrirModalRetirarCreditos: "Retirar creditos",
                retirarCreditosTitulo: "CONVERTIR CREDITOS A EUROS",
                creditosActuales: "Creditos actuales:{{creditos}}",
                hasConvertido: "Has convertido ",
                eurosA: "€ a ",
                creditosTextoModalConversion: " creditos",
                errorEurosInsuficientesConversion: "No tienes tantos euros disponibles para convertir.",
                placeholderCreditosEuros: "Introduce la cantidad de creditos que deseas convertir a euros",
            }
        },
        en: {
            translation: {
                saldo: "Balance:{{saldo}}€",
                saldoActual: "Current Balance:{{saldo}}€",
                tirar: "SPIN TO WIN!",
                girosGratis: "YOU'VE WON 10 FREE SPINS!",
                depositarTitulo: "DEPOSIT",
                placeholderDeposito: "Enter the amount you want to deposit",
                depositarBtn: "Deposit",
                abrirModalRetirar: "Withdraw",
                retirarTitulo: "WITHDRAW",
                placeholderRetiro: "Enter the amount you want to withdraw",
                retirarBtn: "Withdraw",
                abrirModalDepositar: "Deposit",
                textoConfirmacionDeposito: "You have deposited ",
                textoErrorFormatoDeposito: "Invalid deposit format",
                textoConfirmacionRetiro: "You have withdrawn ",
                textoErrorRetiroSaldoInsuficiente: "You don't have enough balance to withdraw that amount.",
                textoErrorFormatoRetiro: "Please enter a valid amount.",
                tituloAjustes: "Settings",
                cambiarIdiomaTexto: "Change Language To Spanish",
                textoModoOscuro: "Switch to Dark Mode:",
                textoModoColor: "Switch to Color Mode:",
                creditosBoton: "Insert Credits",
                insertarCreditosTitulo: "BECOME EUROS TO CREDITS",
                placeholderEurosACreditos: "Enter the amount of euros you want to convert to credits",
                convertirBtn: "Convert to credits",
                abrirModalRetirarCreditos: "Withdraw credits",
                retirarCreditosTitulo: "BECOME CREDITS TO EUROS",
                creditosActuales: "Current credits:{{creditos}}",
                hasConvertido: "You have converted ",
                eurosA: "€ to ",
                creditosTextoModalConversion: " credits",
                errorEurosInsuficientesConversion: "You don't have that many euros available to convert.",
                placeholderCreditosEuros: "Enter the amount of credits you want to convert to euros",
            }
        }
    }
}, function (err, t) {
    actualizarTexto(); // Traduce el contenido al cargar
});

window.addEventListener("load", function () {
    document.getElementById("modalVictoria").style.display = "flex";

    //Cargar hora por primera vez
    cargarHoraInicial();

    //JUEGO
    //APUESTAS
    //BOTON DE AUMENTAR APUESTA
    document.getElementById("aumentarApuesta").addEventListener("click", function () {

        //BLOQUEAR BOTON SI ESTAMOS EN EL BONO
        if (activadorGiros == true) {
            return;
        }

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
        //BLOQUEAR BOTON SI ESTAMOS EN EL BONO
        if (activadorGiros == true) {
            return;
        }
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

    //GIRAR CUANDO PULSE EL BOTON TIRAR
    document.getElementById("botonTirar").addEventListener('click', function () {

        //SI YA ESTA GIRANDO CORTAR LA EJECUCION
        if (estaGirando == true) {
            return;
        }

        //SI ES EL BOTON DE TIRAR
        if (document.getElementById("botonTirar").src.includes = "botonTirar.png") {
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

        //SI ES EL BOTON DE DETENER Y EL BONO ESTA ACTIVO BLOQUEAR EL BOTON PARA QUE NO HAGA NADA
        if (document.getElementById("botonTirar").src.includes("tiradasAutomaticasParar.png") && activadorGiros == true) {
            return;
        }

        //SI ES EL BOTON DE DETENER 
        if (document.getElementById("botonTirar").src.includes("tiradasAutomaticasParar.png")) {
            // Detener las tiradas automáticas
            if (intervaloTiradas != null) {
                clearInterval(intervaloTiradas);
                intervaloTiradas = null;
            }
            // Restaurar el botón a su estado de 'Tirar'
            document.getElementById("botonTirar").src = "./assets/botonTirar.png";
            document.getElementById("tiradasAutomaticas").style.display = "flex";
            document.getElementById("cantidadTiradas").style.display = "none";
            return;
        }


    });

    //GIRAR CON EL ESPACIO
    window.addEventListener('keydown', function (event) {

        //SI YA ESTA GIRANDO CORTAR LA EJECUCION
        if (estaGirando == true) {
            event.preventDefault(); // Prevenir el desplazamiento de la página
            return;
        }

        if (event.key === ' ') {
            event.preventDefault(); // Prevenir el desplazamiento de la página
            //SI ES EL BOTON DE TIRAR QUE GIRE
            if (document.getElementById("botonTirar").src.includes = "botonTirar.png" && activadorGiros == false) {
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
        }
    });

    //TIRADAS AUTOMATICAS
    document.getElementById("tiradasAutomaticas").addEventListener("click", function () {
        document.getElementById("modalTiradasAutomaticasPantalla").style.display = "flex";
    });


    barraTiradas.addEventListener("input", function () {

        valorTiradas.textContent = barraTiradas.value; // Mostrar el valor actual

    });

    document.getElementById("iniciarTiradas").addEventListener("click", tiradasAutomaticas);

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
            document.getElementById("saldo").textContent = i18next.t('saldo', { saldo: saldo });
            //EN EL MODAL DE CREDITOS APARECERA EL SALDO ACTUAL 
            document.getElementById("saldoCreditosInfo").textContent = i18next.t('saldoActual', { saldo: saldo });
            mostrarError(i18next.t('textoConfirmacionDeposito') + deposito + "€");
        } else {
            mostrarError(i18next.t('textoErrorFormatoDeposito'));
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
            document.getElementById("saldo").textContent = i18next.t('saldo', { saldo: saldo });
            document.getElementById("saldoCreditosInfo").textContent = i18next.t('saldoActual', { saldo: saldo });
            mostrarError(i18next.t('textoConfirmacionRetiro') + retiro + "€");
        } else if (retiro > saldo) {
            mostrarError(i18next.t('textoErrorRetiroSaldoInsuficiente'));
        } else {
            mostrarError(i18next.t('textoErrorFormatoRetiro'));
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
    // Cerrar el modal de error al hacer clic en la "X"
    document.getElementById("cerrarModalTiradas").addEventListener("click", function () {
        document.getElementById("modalTiradasAutomaticasPantalla").style.display = "none";
    });
    // Cerrar el modal de error al hacer clic en la "X"
    document.getElementById("cerrarModalVictoria").addEventListener("click", function () {
        document.getElementById("modalVictoria").style.display = "none";
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
        if (event.target == document.getElementById("modalVictoria")) {
            document.getElementById("modalVictoria").style.display = "none";
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
            document.getElementById("textoModoOscuro").textContent = i18next.t('textoModoColor');
            iconoModoOscuro.src = "./assets/modoClaro.png";// Icono para el modo claro

        } else {
            document.getElementById("textoModoOscuro").textContent = i18next.t('textoModoOscuro');
            iconoModoOscuro.src = "./assets/modoOscuro.png"; // Icono para el modo oscuro
        }

    });

    //CAMBIAR IDIOMA
    document.getElementById("idioma").addEventListener("click", function () {

        //ALTERNAR IDIOMAS
        idiomaActual = i18next.language === 'es' ? 'en' : 'es';

        // Cambiar idioma en i18next
        i18next.changeLanguage(idiomaActual, function () {
            actualizarTexto(); // Vuelve a traducir el texto
        });

        // Cambiar el ícono del idioma
        const icono = document.getElementById("idioma");
        if (idiomaActual === 'en') {
            icono.src = "./assets/iconoEspaña.png";
        } else {
            icono.src = "./assets/iconoIngles.png";
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

            mostrarError(i18next.t('hasConvertido') + eurosACreditos + i18next.t('eurosA') + (eurosACreditos * 100) + i18next.t('creditosTextoModalConversion'));
            creditos += (eurosACreditos * 100);
            saldo -= eurosACreditos;
            document.getElementById("saldo").textContent = i18next.t('saldo', { saldo: saldo });
            document.getElementById("saldoCreditosInfo").textContent = i18next.t('saldoActual', { saldo: saldo });
            document.getElementById("creditosInfo").textContent = i18next.t('creditosActuales', { creditos: creditos });;
            document.getElementById("creditosTotales").innerHTML = creditos;
            document.getElementById("inputEurosACreditos").value = "";

        } else if (eurosACreditos > saldo) {

            mostrarError(i18next.t('errorEurosInsuficientesConversion'));

        } else {

            mostrarError(i18next.t('textoErrorFormatoRetiro'));

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
function actualizarTexto() {
    // Traduce el saldo dinámico
    var saldoElement = document.getElementById("saldo");
    saldoElement.textContent = i18next.t('saldo', { saldo: saldo });

    var saldoActualElement = document.getElementById("saldoCreditosInfo");
    saldoActualElement.textContent = i18next.t('saldoActual', { saldo: saldo });

    var creditosActuales = document.getElementById("creditosInfo");
    creditosActuales.textContent = i18next.t('creditosActuales', { creditos: creditos });


    // ELEMENTOS ESTATICOS
    document.getElementById("textoTragaperras").textContent = i18next.t('tirar');
    document.querySelector(".mensajeVictoria").textContent = i18next.t('girosGratis');
    document.getElementById("depositarTitulo").textContent = i18next.t('depositarTitulo');
    document.getElementById("inputDeposito").setAttribute("placeholder", i18next.t('placeholderDeposito'));
    document.getElementById("depositarBtn").textContent = i18next.t('depositarBtn');
    document.getElementById("abrirModalRetirar").textContent = i18next.t('abrirModalRetirar');
    document.getElementById("retirarTitulo").textContent = i18next.t('retirarTitulo');
    document.getElementById("inputRetiro").setAttribute("placeholder", i18next.t('placeholderRetiro'));
    document.getElementById("retirarBtn").textContent = i18next.t('retirarBtn');
    document.getElementById("abrirModalDepositar").textContent = i18next.t('abrirModalDepositar');
    document.getElementById("tituloAjustes").textContent = i18next.t('tituloAjustes');
    document.getElementById("cambiarIdiomaTexto").textContent = i18next.t('cambiarIdiomaTexto');
    document.getElementById("textoModoOscuro").textContent = i18next.t('textoModoOscuro');
    document.getElementById("creditos").textContent = i18next.t('creditosBoton');
    document.getElementById("insertarCreditosTitulo").textContent = i18next.t('insertarCreditosTitulo');
    document.getElementById("inputEurosACreditos").setAttribute("placeholder", i18next.t('placeholderEurosACreditos'));
    document.getElementById("convertirBtn").textContent = i18next.t('convertirBtn');
    document.getElementById("abrirModalRetirarCreditos").textContent = i18next.t('abrirModalRetirarCreditos');
    document.getElementById("retirarCreditosTitulo").textContent = i18next.t('retirarCreditosTitulo');
    document.getElementById("inputRetiroCreditos").setAttribute("placeholder", i18next.t('placeholderCreditosEuros'));







}

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

        // PARAMOS LA ANIMACION ESPERANDO UN POCO PARA QUE DE TIEMPO A QUE LLEGUE A SU POSICION INICIAL

        for (i = 0; i < carrete1.length; i++) {
            carrete1[i].classList.remove('girar');
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

            // PARAMOS LA ANIMACION ESPERANDO UN POCO PARA QUE DE TIEMPO A QUE LLEGUE A SU POSICION INICIAL

            for (i = 0; i < carrete2.length; i++) {
                carrete2[i].classList.remove('girar');
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

                // PARAMOS LA ANIMACION ESPERANDO UN POCO PARA QUE DE TIEMPO A QUE LLEGUE A SU POSICION INICIAL

                for (i = 0; i < carrete3.length; i++) {
                    carrete3[i].classList.remove('girar');
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


    //MULTIPLICADOR DE LA GIRAFA PARA TODOS LOS SIMBOLOS EN EL BONO DE LAS 3 GIRAFAS
    if (activadorGiros == true) {

        flor.multiCentral = 100;
        flor.multiHorizontalesArribaAbajo = 50;
        flor.multiDiagonal = 50;

        platanos.multiCentral = 100;
        platanos.multiHorizontalesArribaAbajo = 50;
        platanos.multiDiagonal = 50;

        loro.multiCentral = 100;
        loro.multiHorizontalesArribaAbajo = 50;
        loro.multiDiagonal = 50;


        arbol.multiCentral = 100;
        arbol.multiHorizontalesArribaAbajo = 50;
        arbol.multiDiagonal = 50;

    } else {
        flor.multiCentral = 5;
        flor.multiHorizontalesArribaAbajo = 2.5;
        flor.multiDiagonal = 2.5;

        platanos.multiCentral = 10;
        platanos.multiHorizontalesArribaAbajo = 5;
        platanos.multiDiagonal = 5;

        loro.multiCentral = 20;
        loro.multiHorizontalesArribaAbajo = 10;
        loro.multiDiagonal = 10;


        arbol.multiCentral = 30;
        arbol.multiHorizontalesArribaAbajo = 15;
        arbol.multiDiagonal = 15;
    }


    calcularPremioCombinado(girafa, carrete1, carrete2, carrete3, apuestaActual);
    calcularPremioCombinado(arbol, carrete1, carrete2, carrete3, apuestaActual);
    calcularPremioCombinado(loro, carrete1, carrete2, carrete3, apuestaActual);
    calcularPremioCombinado(platanos, carrete1, carrete2, carrete3, apuestaActual);
    calcularPremioCombinado(flor, carrete1, carrete2, carrete3, apuestaActual);

}
function calcularPremioCombinado(simbolo, carrete1, carrete2, carrete3, apuestaActual) {


    // Obtiene solo el nombre de la imagen desde su ruta
    function obtenerNombreImagen(src) {
        return src.split('/').pop();
    }

    //ACUMULARA EL MULTIPLICADOR DE TODAS LAS CASUISTICAS Y SI HAY MAS DE DOS SE SUMARA 
    var multiplicadorTotal = 0;
    //ALMACENA LAS IMAGENES DE LAS COMBINACIONES GANADORAS PARA RESALTARLAS
    var combinacionesGanadoras = [];

    // COMBINACION LINEA CENTRAL
    if (obtenerNombreImagen(carrete1[1].src) === obtenerNombreImagen(carrete2[1].src) &&
        obtenerNombreImagen(carrete1[1].src) === obtenerNombreImagen(carrete3[1].src) &&
        obtenerNombreImagen(simbolo.imagen) === obtenerNombreImagen(carrete1[1].src)) {
        multiplicadorTotal += simbolo.multiCentral;
        combinacionesGanadoras.push([carrete1[1], carrete2[1], carrete3[1]]);
    }

    // COMBINACION LINEA SUPERIOR
    if (obtenerNombreImagen(carrete1[0].src) === obtenerNombreImagen(carrete2[0].src) &&
        obtenerNombreImagen(carrete1[0].src) === obtenerNombreImagen(carrete3[0].src) &&
        obtenerNombreImagen(simbolo.imagen) === obtenerNombreImagen(carrete1[0].src)) {
        multiplicadorTotal += simbolo.multiHorizontalesArribaAbajo;
        combinacionesGanadoras.push([carrete1[0], carrete2[0], carrete3[0]]);
    }

    // COMBINACION LINEA INFERIOR
    if (obtenerNombreImagen(carrete1[2].src) === obtenerNombreImagen(carrete2[2].src) &&
        obtenerNombreImagen(carrete1[2].src) === obtenerNombreImagen(carrete3[2].src) &&
        obtenerNombreImagen(simbolo.imagen) === obtenerNombreImagen(carrete1[2].src)) {
        multiplicadorTotal += simbolo.multiHorizontalesArribaAbajo;
        combinacionesGanadoras.push([carrete1[2], carrete2[2], carrete3[2]]);
    }

    // COMBINACION DIAGONAL IZQUIERDA
    if (obtenerNombreImagen(carrete1[0].src) === obtenerNombreImagen(carrete2[1].src) &&
        obtenerNombreImagen(carrete1[0].src) === obtenerNombreImagen(carrete3[2].src) &&
        obtenerNombreImagen(simbolo.imagen) === obtenerNombreImagen(carrete1[0].src)) {
        multiplicadorTotal += simbolo.multiDiagonal;
        combinacionesGanadoras.push([carrete1[0], carrete2[1], carrete3[2]]);
    }

    // COMBINACION DIAGONAL DERECHA
    if (obtenerNombreImagen(carrete3[0].src) === obtenerNombreImagen(carrete2[1].src) &&
        obtenerNombreImagen(carrete3[0].src) === obtenerNombreImagen(carrete1[2].src) &&
        obtenerNombreImagen(simbolo.imagen) === obtenerNombreImagen(carrete3[0].src)) {
        multiplicadorTotal += simbolo.multiDiagonal;
        combinacionesGanadoras.push([carrete3[0], carrete2[1], carrete1[2]]);
    }

    // Si hay algún multiplicador, calcular el premio
    if (multiplicadorTotal > 0) {
        combinacionesGanadoras.forEach(imagenes => resaltarImagenes(imagenes));
        var premio = apuestaActual * multiplicadorTotal;
        creditos += premio;
        document.getElementById("creditosTotales").innerHTML = creditos;
        document.getElementById("creditosInfo").innerHTML = "Creditos Actuales:" + creditos;
        mostrarModalVictoria("¡HAS GANADO " + premio + " CREDITOS!");
        document.getElementById("textoTragaperras").innerHTML = "GANANCIAS: " + premio + " CREDITOS!";
        setTimeout(() => document.getElementById("textoTragaperras").innerHTML = "¡TIRE PARA GANAR!", 5000);


    } else {
        document.getElementById("textoTragaperras").innerHTML = "¡TIRE PARA GANAR!"
    }

    //SI SON TRES GIRAFAS ACTIVAMOS GIROS GRATIS
    if (simbolo.imagen == "assets/iconoGirafa.png" && multiplicadorTotal > 0 && activadorGiros == false) {
        activadorGiros = true;

        // Esperar 2 segundos antes de mostrar el modal de giros gratis para que se vea el premio de la triple girafa
        setTimeout(() => {
            mostrarModalVictoria("¡HAS GANADO 10 GIROS GRATIS!");
            tiradasAutomaticas();
        }, 2000);

    }


}

function mostrarModalVictoria(mensaje) {
    // Asigna el mensaje de victoria
    document.getElementById("modalVictoriaMensaje").innerText = mensaje;

    document.getElementById("modalVictoria").style.display = "flex";
    //SONIDO MONEDAS CAYENDO
    var sonidoMonedas = new Audio('assets/sonidoMonedas.mp3');
    sonidoMonedas.volume = volumen;
    sonidoMonedas.play();

    //CERRAR AUTOMATICAMENTE A LOS 3 SEGUNDOS
    setTimeout(() => {
        document.getElementById('modalVictoria').style.display = "none";
    }, 3000);

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

function tiradasAutomaticas() {
    document.getElementById("modalTiradasAutomaticasPantalla").style.display = "none";
    tiradas = barraTiradas.value;

    //CAMBIAR EL VALOR DE LAS TIRADAS SI SE LLAMA DESDE EL BONO A 10 TIRADAS GRATUITAS
    if (activadorGiros == true) {
        // Detener cualquier tirada automática en curso
        clearInterval(intervaloTiradas);

        tiradas = 10;
        //PRIMERA TIRADA SIN DESCONTAR NADA PORQUE SON GRATIS
        document.getElementById("botonTirar").src = "./assets/tiradasAutomaticasParar.png";
        document.getElementById("disminuirApuesta").src = "./assets/disminuirApuestaMinima.png";
        document.getElementById("aumentarApuesta").src = "./assets/aumentarApuestaMaxima.png";
        document.getElementById("tiradasAutomaticas").style.display = "none";
        document.getElementById("cantidadTiradas").innerHTML = "TIRADAS RESTANTES: " + tiradas;
        document.getElementById("cantidadTiradas").style.display = "flex";
        girarCarretes(carretes);
        tiradas--;

        intervaloTiradas = setInterval(function () {
            if (tiradas > 0) {
                document.getElementById("cantidadTiradas").innerHTML = "TIRADAS RESTANTES: " + tiradas;
                girarCarretes(carretes);
                tiradas--;

            } else {
                // Si no hay más tiradas detener
                activadorGiros = false;
                clearInterval(intervaloTiradas);
                document.getElementById("botonTirar").src = "./assets/botonTirar.png";
                document.getElementById("disminuirApuesta").src = "./assets/disminuirApuesta.png";
                document.getElementById("aumentarApuesta").src = "./assets/aumentarApuesta.png";
                document.getElementById("tiradasAutomaticas").style.display = "flex";
                document.getElementById("cantidadTiradas").style.display = "none";
            }
        }, 14000); // Tiempo entre tiradas (14 segundos por si gana de tiempo al modal)

        //TIRADAS AUTOMATICAS COBRANDO 
    } else {

        // Realizar la primera tirada inmediatamente
        if (tiradas > 0 && apuesta <= creditos) {


            document.getElementById("botonTirar").src = "./assets/tiradasAutomaticasParar.png";
            document.getElementById("tiradasAutomaticas").style.display = "none";
            document.getElementById("cantidadTiradas").innerHTML = "TIRADAS RESTANTES: " + tiradas;
            document.getElementById("cantidadTiradas").style.display = "flex";
            girarCarretes(carretes);

            // Descontar la apuesta de la primera tirada
            creditos -= apuesta;
            document.getElementById("creditosTotales").innerHTML = creditos;
            document.getElementById("creditosInfo").innerHTML = "Creditos Actuales:" + creditos;

            tiradas--;


        } else {
            document.getElementById("textoTragaperras").innerHTML = "¡NO TIENES SUFICIENTES CREDITOS PARA ESA APUESTA!";
            setTimeout(() => {
                document.getElementById("textoTragaperras").innerHTML = "¡TIRE PARA GANAR!";
            }, 2000);
            return; // Salir si no se puede realizar la primera tirada
        }

        // Ejecutar tiradas automáticas con un intervalo
        intervaloTiradas = setInterval(function () {

            if (tiradas > 0 && apuesta <= creditos) {

                document.getElementById("cantidadTiradas").innerHTML = "TIRADAS RESTANTES: " + tiradas;
                girarCarretes(carretes);
                // Descontar apuesta
                creditos -= apuesta;
                document.getElementById("creditosTotales").innerHTML = creditos;
                document.getElementById("creditosInfo").innerHTML = "Creditos Actuales:" + creditos;

                tiradas--;


            } else {
                // Si no hay más tiradas o créditos insuficientes, detener
                activadorGiros = false;
                clearInterval(intervaloTiradas);
                document.getElementById("botonTirar").src = "./assets/botonTirar.png";
                document.getElementById("tiradasAutomaticas").style.display = "flex";
                document.getElementById("cantidadTiradas").style.display = "none";
                if (apuesta > creditos) {
                    document.getElementById("textoTragaperras").innerHTML = "¡NO TIENES SUFICIENTES CREDITOS PARA ESA APUESTA!";
                    setTimeout(() => {
                        document.getElementById("textoTragaperras").innerHTML = "¡TIRE PARA GANAR!";
                    }, 2000);
                }
            }
        }, 14000); // Tiempo entre tiradas (14 segundos por si gana de tiempo al modal)
    }


}



