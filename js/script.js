
/* 
Almacena la información de los planetas (nombre, distancia, diámetro, temperatura, lunas) 
y algunas observaciones de ejemplo. Estos arrays son la fuente de datos para toda la página.
    *- Añadir/quitar planetas: debes mantener la misma estructura (nombre, distancia, etc.) para que la tabla y el select sigan funcionando. También tendrías que actualizar el HTML (menú, imágenes, paneles) para que coincidan.
    *- Cambiar nombres: si cambias "Mercurio" por "Mercury", el select y la tabla mostrarán el nuevo nombre, pero los data-planet en HTML deben coincidir. Si no, el menú y los paneles no se conectarán correctamente.
    *- Añadir observaciones de ejemplo: es seguro, solo se mostrarán más tarjetas al inicio.
*/
var planetas = [
    { nombre: "Mercurio", distancia: "57.9 millones km", diametro: "4,879 km", temperatura: "-173 a 427°C", lunas: 0 },
    { nombre: "Venus", distancia: "108.2 millones km", diametro: "12,104 km", temperatura: "462°C", lunas: 0 },
    { nombre: "Tierra", distancia: "149.6 millones km", diametro: "12,742 km", temperatura: "15°C", lunas: 1 },
    { nombre: "Marte", distancia: "227.9 millones km", diametro: "6,779 km", temperatura: "-65°C", lunas: 2 },
    { nombre: "Júpiter", distancia: "778.5 millones km", diametro: "139,820 km", temperatura: "-110°C", lunas: 79 },
    { nombre: "Saturno", distancia: "1,433 millones km", diametro: "116,460 km", temperatura: "-140°C", lunas: 83 },
    { nombre: "Urano", distancia: "2,877 millones km", diametro: "50,724 km", temperatura: "-195°C", lunas: 27 },
    { nombre: "Neptuno", distancia: "4,498 millones km", diametro: "49,244 km", temperatura: "-200°C", lunas: 14 },
    { nombre: "Plutón", distancia: "5,906 millones km", diametro: "2,377 km", temperatura: "-230°C", lunas: 5 }
];

var observaciones = [
    { nombre: "Ana Martínez", edad: 28, planeta: "Saturno", mensaje: "Me encantaría observar los anillos de Saturno con más detalle.", fecha: "2026-02-15" },
    { nombre: "Carlos López", edad: 35, planeta: "Marte", mensaje: "Interesado en las misiones a Marte y su potencial para vida.", fecha: "2026-02-16" }
];

//planets: selecciona todos los elementos con clase planet.
var planets = document.querySelectorAll('.planet');
//menuItems: selecciona todos los elementos del menú lateral.
var menuItems = document.querySelectorAll('.menu-item');
//planetOrder: define el orden en que se muestran los planetas en el carrusel .
var planetOrder = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];
//spacing: distancia en píxeles entre cada planeta en el eje Z.
var spacing = 2000;

/* 
Al llamarla con un planetId (ej. 'mars'), reposiciona todos los planetas en el espacio 3D 
para que el planeta seleccionado quede centrado. Además, actualiza las 
clases active tanto en los planetas como en los elementos del menú.
*/
function showPlanet(planetId) {
    var targetIndex = planetOrder.indexOf(planetId);
    
    for(var i = 0; i < planets.length; i++) {
        var planet = planets[i];
        var planetIndex = planetOrder.indexOf(planet.getAttribute('data-planet'));
        var diff = planetIndex - targetIndex;
        
        // Aplicar transformación
        /* planet.style.transform = 'translateZ(' + (-diff * spacing) + 'px) translateY(-50%) scale(0.8)'; */
        
        // Activar/desactivar clase
        if(planet.getAttribute('data-planet') === planetId) {
            planet.className = 'planet ' + planetId + ' active';
        } else {
            planet.className = 'planet ' + planet.getAttribute('data-planet');
        }
    }
    
    // Actualizar menú
    for(var j = 0; j < menuItems.length; j++) {
        if(menuItems[j].getAttribute('data-planet') === planetId) {
            menuItems[j].className = 'menu-item ' + planetId + ' active';
        } else {
            menuItems[j].className = 'menu-item ' + menuItems[j].getAttribute('data-planet');
        }
    }
}

/* 
Asigna a cada elemento del menú onclick que llama a showPlanet con su data-planet.
*/
for(var i = 0; i < menuItems.length; i++) {
    menuItems[i].onclick = function() {
        showPlanet(this.getAttribute('data-planet'));
    };
}

// Mostrar Mercurio al inicio
showPlanet('mercury');

/* 
Selecciona todos los botones "LEER MÁS", los paneles flotantes, la capa oscura de fondo y los botones de cerrar.
*/
var readMoreLinks = document.querySelectorAll('.read-more');
var panels = document.querySelectorAll('.info-panel');
var overlay = document.querySelector('.panel-overlay');
var closeBtns = document.querySelectorAll('.close-panel');

/* 
Al hacer clic en "LEER MÁS", previene el comportamiento por defecto del enlace, 
oculta cualquier otro panel abierto, y muestra el panel correspondiente al planeta 
(usando id="panel-...") y la capa oscura.
*/
for(var i = 0; i < readMoreLinks.length; i++) {
    readMoreLinks[i].onclick = function(e) {
        e.preventDefault();
        var planetId = this.getAttribute('data-planet');
        
        for(var j = 0; j < panels.length; j++) {
            panels[j].classList.remove('open');
        }
        
        document.getElementById('panel-' + planetId).classList.add('open');
        overlay.classList.add('active');
    };
}

/* 
Los botones de cerrar (close-panel) y la capa oscura (overlay) al hacer clic quitan la clase open de todos los 
paneles y desactivan la capa.
*/
for(var i = 0; i < closeBtns.length; i++) {
    closeBtns[i].onclick = function() {
        for(var j = 0; j < panels.length; j++) {
            panels[j].classList.remove('open');
        }
        overlay.classList.remove('active');
    };
}

overlay.onclick = function() {
    for(var j = 0; j < panels.length; j++) {
        panels[j].classList.remove('open');
    }
    overlay.classList.remove('active');
};

/* 
Genera filas de tabla a partir del array planetas y las inserta en el tbody
*/
var tbody = document.getElementById('tablaBody');
var tablaHTML = '';
for(var i = 0; i < planetas.length; i++) {
    tablaHTML += '<tr>' +
        '<td>' + planetas[i].nombre + '</td>' +
        '<td>' + planetas[i].distancia + '</td>' +
        '<td>' + planetas[i].diametro + '</td>' +
        '<td>' + planetas[i].temperatura + '</td>' +
        '<td>' + planetas[i].lunas + '</td>' +
        '</tr>';
}
tbody.innerHTML = tablaHTML;

// Añade una opción por cada planeta al <select> del formulario.
var select = document.getElementById('planetaFavorito');
for(var i = 0; i < planetas.length; i++) {
    select.innerHTML += '<option value="' + planetas[i].nombre + '">' + planetas[i].nombre + '</option>';
}

/* 
Captura el envío del formulario y evita la recarga de página (e.preventDefault()).
Crea un objeto nuevaObs con los valores de los campos y la fecha actual.
Lo añade al array observaciones.
Vuelve a generar todo el HTML de las tarjetas de observaciones y lo inserta en observacionesLista.
Muestra un mensaje de éxito temporal y resetea el formulario.
*/
// Función de validación
// ============================================
// VALIDACIONES EN TIEMPO REAL DEL FORMULARIO
// ============================================

// Función para crear contenedores de error y asignar eventos
function inicializarValidacionesTiempoReal() {
    // Lista de campos a validar con su ID y tipo de evento
    const campos = [
        { id: 'nombre', evento: 'input' },
        { id: 'email', evento: 'input' },
        { id: 'edad', evento: 'input' },
        { id: 'planetaFavorito', evento: 'change' },
        { id: 'mensaje', evento: 'input' },
        { id: 'terminos', evento: 'change' }
    ];

    campos.forEach(campo => {
        const input = document.getElementById(campo.id);
        if (!input) return;

        // Crear contenedor de error si no existe
        let errorSpan = document.getElementById(`error-${campo.id}`);
        if (!errorSpan) {
            errorSpan = document.createElement('span');
            errorSpan.id = `error-${campo.id}`;
            errorSpan.className = 'field-error'; // Clase para estilo (rojo, pequeño)
            errorSpan.style.color = 'red';
            errorSpan.style.fontSize = '0.9rem';
            errorSpan.style.display = 'block'; // Ocupa su propia línea
            errorSpan.style.marginTop = '0.25rem';
            // Insertar después del input (o dentro del form-group)
            input.parentNode.insertBefore(errorSpan, input.nextSibling);
        }

        // Asignar evento para validar en tiempo real
        input.addEventListener(campo.evento, function() {
            const error = validarCampoIndividual(campo.id);
            errorSpan.textContent = error || '';
        });
    });
}

// Función que valida un campo específico y devuelve el mensaje de error (o cadena vacía si es válido)
// ============================================
// VALIDACIONES EN TIEMPO REAL DEL FORMULARIO
// ============================================

// Función para crear contenedores de error y asignar eventos
function inicializarValidacionesTiempoReal() {
    const campos = [
        { id: 'nombre', evento: 'input' },
        { id: 'email', evento: 'input' },
        { id: 'edad', evento: 'input' },
        { id: 'planetaFavorito', evento: 'change' },
        { id: 'mensaje', evento: 'input' },
        { id: 'terminos', evento: 'change' }
    ];

    campos.forEach(campo => {
        const input = document.getElementById(campo.id);
        if (!input) return;

        // Crear contenedor de error si no existe
        let errorSpan = document.getElementById(`error-${campo.id}`);
        if (!errorSpan) {
            errorSpan = document.createElement('span');
            errorSpan.id = `error-${campo.id}`;
            errorSpan.className = 'field-error';
            errorSpan.style.color = 'red';
            errorSpan.style.fontSize = '0.9rem';
            errorSpan.style.display = 'block';
            errorSpan.style.marginTop = '0.25rem';
            input.parentNode.insertBefore(errorSpan, input.nextSibling);
        }

        // Asignar evento para validar en tiempo real
        input.addEventListener(campo.evento, function() {
            const error = validarCampoIndividual(campo.id);
            errorSpan.textContent = error || '';
        });
    });
}

// Función que valida un campo específico
function validarCampoIndividual(campoId) {
    const valor = campoId === 'terminos' 
        ? document.getElementById('terminos').checked 
        : document.getElementById(campoId).value.trim();
    
    switch (campoId) {
        case 'nombre':
            if (valor === '') return 'El nombre es obligatorio.';
            if (valor.length < 3) return 'El nombre debe tener al menos 3 caracteres.';
            if (!/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(valor)) return 'Solo letras y espacios.';
            return '';
        
        case 'email':
            if (valor === '') return 'El email es obligatorio.';
            if (!/^\S+@\S+\.\S+$/.test(valor)) return 'Formato inválido (ej: usuario@dominio.com).';
            return '';
        
        case 'edad':
            if (valor === '') return 'La edad es obligatoria.';
            const edadNum = Number(valor);
            if (!Number.isInteger(edadNum) || edadNum < 1 || edadNum > 120) 
                return 'Debe ser un número entero entre 1 y 120.';
            return '';
        
        case 'planetaFavorito':
            if (valor === '') return 'Selecciona un planeta.';
            return '';
        
        case 'mensaje':
            if (valor === '') return 'El mensaje es obligatorio.';
            if (valor.length < 10) return 'El mensaje debe tener al menos 10 caracteres.';
            return '';
        
        case 'terminos':
            if (!valor) return 'Debes aceptar los términos.';
            return '';
        
        default:
            return '';
    }
}

// Función de validación general
function validarFormularioCompleto() {
    let errores = [];
    const campos = ['nombre', 'email', 'edad', 'planetaFavorito', 'mensaje', 'terminos'];
    
    campos.forEach(campoId => {
        const error = validarCampoIndividual(campoId);
        if (error) errores.push(error);
    });
    
    return errores;
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    inicializarValidacionesTiempoReal();
});

// ============================================
// EVENTO SUBMIT DEL FORMULARIO
// ============================================
document.getElementById('observacionForm').onsubmit = function(e) {
    e.preventDefault();
    
    let mensajeDiv = document.getElementById('formMensaje');
    mensajeDiv.innerHTML = '';
    
    // Validar todo el formulario
    let errores = validarFormularioCompleto();
    
    if (errores.length > 0) {
        // Mostrar resumen de errores
        let listaErrores = '<ul style="color: red; text-align: left;">';
        for (let i = 0; i < errores.length; i++) {
            listaErrores += '<li>' + errores[i] + '</li>';
        }
        listaErrores += '</ul>';
        mensajeDiv.innerHTML = listaErrores;
        
        // Actualizar mensajes individuales (por si acaso)
        ['nombre', 'email', 'edad', 'planetaFavorito', 'mensaje', 'terminos'].forEach(id => {
            const errorSpan = document.getElementById(`error-${id}`);
            if (errorSpan) errorSpan.textContent = validarCampoIndividual(id);
        });
        return;
    }
    
    // Si pasa validación, crear objeto y guardar
    var nuevaObs = {
        nombre: document.getElementById('nombre').value.trim(),
        edad: document.getElementById('edad').value.trim(),
        planeta: document.getElementById('planetaFavorito').value,
        mensaje: document.getElementById('mensaje').value.trim(),
        fecha: new Date().toLocaleDateString()
    };
    
    observaciones.push(nuevaObs);
    
    // Mostrar observaciones actualizadas
    var container = document.getElementById('observacionesLista');
    var obsHTML = '';
    for(var i = 0; i < observaciones.length; i++) {
        obsHTML += '<div class="observacion-card">' +
            '<h4>' + observaciones[i].nombre + '</h4>' +
            '<p>Edad: ' + observaciones[i].edad + ' años</p>' +
            '<p>Planeta favorito: ' + observaciones[i].planeta + '</p>' +
            '<p>' + observaciones[i].mensaje.substring(0, 50) + '...</p>' +
            '<p class="fecha"> ' + observaciones[i].fecha + '</p>' +
            '</div>';
    }
    container.innerHTML = obsHTML;
    
    mensajeDiv.innerHTML = '¡Registro exitoso!';
    this.reset();
    
    // Limpiar mensajes de error individuales al resetear
    ['nombre', 'email', 'edad', 'planetaFavorito', 'mensaje', 'terminos'].forEach(id => {
        const errorSpan = document.getElementById(`error-${id}`);
        if (errorSpan) errorSpan.textContent = '';
    });
    
    setTimeout(function() {
        mensajeDiv.innerHTML = '';
    }, 3000);
};

// ============================================
// LIMPIAR ERRORES AL HACER CLIC EN "LIMPIAR"
// ============================================
document.getElementById('observacionForm').addEventListener('reset', function() {
    // Limpiar mensajes de error individuales
    ['nombre', 'email', 'edad', 'planetaFavorito', 'mensaje', 'terminos'].forEach(id => {
        const errorSpan = document.getElementById(`error-${id}`);
        if (errorSpan) errorSpan.textContent = '';
    });
    // Limpiar mensaje general
    document.getElementById('formMensaje').innerHTML = '';
});

// Al cargar la página, muestra las observaciones de ejemplo (las definidas al inicio) en la cuadrícula.
var container = document.getElementById('observacionesLista');
var obsHTML = '';
for(var i = 0; i < observaciones.length; i++) {
    obsHTML += '<div class="observacion-card">' +
        '<h4>' + observaciones[i].nombre + '</h4>' +
        '<p>Edad: ' + observaciones[i].edad + ' años</p>' +
        '<p>Planeta favorito: ' + observaciones[i].planeta + '</p>' +
        '<p>' + observaciones[i].mensaje.substring(0, 50) + '...</p>' +
        '<p class="fecha"> ' + observaciones[i].fecha + '</p>' +
        '</div>';
}
container.innerHTML = obsHTML;
