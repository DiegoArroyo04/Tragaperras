# 🎰 Proyecto Tragaperras Multilingüe

## Descripción

Este es un proyecto de una máquina tragaperras (slot machine) desarrollada en JavaScript, HTML y CSS. El objetivo es simular una experiencia de juego interactiva con diferentes funciones como tiradas automáticas, bonos especiales, traducción multilingüe y controles intuitivos (como el uso de la barra espaciadora para jugar).

El proyecto incluye:
- Animaciones de giro en los carretes.
- Multiplicadores dinámicos según las combinaciones ganadoras.
- Función de bono especial para giros gratis con multiplicadores mejorados.
- Traducción automática del contenido de la interfaz entre varios idiomas (español e inglés).
- Control del juego con botones visuales o con el teclado.

---

## Características principales

### 🎮 Jugabilidad
- **Girar los carretes**: Usa el botón de girar o la barra espaciadora para iniciar una tirada.
- **Bonos**: Si aparecen tres símbolos especiales (jirafas), se activa un bono de giros gratis con multiplicadores mejorados.
- **Tiradas automáticas**: Configura un número de tiradas automáticas y el sistema se encargará de gestionar el juego por ti.

### 🌍 Multilingüe
- Soporte para español e inglés.
- Traducción de textos dinámicos y estáticos en la interfaz.
- Mantiene las imágenes y estilos al cambiar de idioma.

### 🔥 Multiplicadores y premios
- Cada símbolo tiene diferentes multiplicadores dependiendo de su posición en los carretes (línea central, superior, inferior, diagonal).
- Los multiplicadores cambian dinámicamente durante el bono de giros gratis.
- Los premios acumulados se actualizan en tiempo real.

### ⚙️ Funciones técnicas
- Bloqueo de acciones mientras los carretes están girando para evitar errores.
- Ajustes personalizados: cambiar entre modo oscuro y claro, insertar créditos y realizar retiros.
- Gestión de saldos y apuestas.

---

## Tecnologías utilizadas

- **JavaScript**: Lógica del juego, gestión de eventos, animaciones y dinámicas del proyecto.
- **HTML**: Estructura de la interfaz de usuario.
- **CSS**: Estilos para la interfaz y las animaciones de los carretes.
- **[i18next](https://www.i18next.com/)**: Biblioteca para la traducción multilingüe.

---

## Instalación y configuración

1. **Clona este repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/proyecto-tragaperras.git
   cd proyecto-tragaperras
