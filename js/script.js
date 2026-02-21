
// Datos de planetas
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

// Variables para el carrusel 3D
var planets = document.querySelectorAll('.planet');
var menuItems = document.querySelectorAll('.menu-item');
var planetOrder = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];
var spacing = 2000;

// Función para cambiar de planeta
function showPlanet(planetId) {
    var targetIndex = planetOrder.indexOf(planetId);
    
    for(var i = 0; i < planets.length; i++) {
        var planet = planets[i];
        var planetIndex = planetOrder.indexOf(planet.getAttribute('data-planet'));
        var diff = planetIndex - targetIndex;
        
        // Aplicar transformación
        planet.style.transform = 'translateZ(' + (-diff * spacing) + 'px) translateY(-50%) scale(0.8)';
        
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

// Event listeners para el menú
for(var i = 0; i < menuItems.length; i++) {
    menuItems[i].onclick = function() {
        showPlanet(this.getAttribute('data-planet'));
    };
}

// Mostrar Mercurio al inicio
showPlanet('mercury');

// Paneles informativos
var readMoreLinks = document.querySelectorAll('.read-more');
var panels = document.querySelectorAll('.info-panel');
var overlay = document.querySelector('.panel-overlay');
var closeBtns = document.querySelectorAll('.close-panel');

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

// Llenar tabla
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

// Llenar select de planetas favoritos
var select = document.getElementById('planetaFavorito');
for(var i = 0; i < planetas.length; i++) {
    select.innerHTML += '<option value="' + planetas[i].nombre + '">' + planetas[i].nombre + '</option>';
}

// Formulario
document.getElementById('observacionForm').onsubmit = function(e) {
    e.preventDefault();
    
    var nuevaObs = {
        nombre: document.getElementById('nombre').value,
        edad: document.getElementById('edad').value,
        planeta: document.getElementById('planetaFavorito').value,
        mensaje: document.getElementById('mensaje').value,
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
            '<p class="fecha">📅 ' + observaciones[i].fecha + '</p>' +
            '</div>';
    }
    container.innerHTML = obsHTML;
    
    document.getElementById('formMensaje').innerHTML = '¡Registro exitoso!';
    this.reset();
    
    setTimeout(function() {
        document.getElementById('formMensaje').innerHTML = '';
    }, 3000);
};

// Mostrar observaciones iniciales
var container = document.getElementById('observacionesLista');
var obsHTML = '';
for(var i = 0; i < observaciones.length; i++) {
    obsHTML += '<div class="observacion-card">' +
        '<h4>' + observaciones[i].nombre + '</h4>' +
        '<p>Edad: ' + observaciones[i].edad + ' años</p>' +
        '<p>Planeta favorito: ' + observaciones[i].planeta + '</p>' +
        '<p>' + observaciones[i].mensaje.substring(0, 50) + '...</p>' +
        '<p class="fecha">📅 ' + observaciones[i].fecha + '</p>' +
        '</div>';
}
container.innerHTML = obsHTML;
