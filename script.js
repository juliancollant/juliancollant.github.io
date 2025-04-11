document.addEventListener('DOMContentLoaded', function() {
  // Inicializar el carrusel de imágenes del banner
  iniciarCarrusel();

  // Mostrar trabajadores por oficio
  mostrarTrabajadores();

  // Función para manejar el carrusel del banner
  function iniciarCarrusel() {
    let idx = 0;
    const imgs = document.querySelectorAll('.banner-img');
    setInterval(() => {
      imgs[idx].classList.remove('active');
      idx = (idx + 1) % imgs.length;
      imgs[idx].classList.add('active');
    }, 3000); // Cambiar cada 3 segundos
  }

  // Función para mostrar trabajadores
  function mostrarTrabajadores() {
    const contenedor = document.getElementById("contenedor-trabajadores");
    let trabajadores = JSON.parse(localStorage.getItem("trabajadores"));

    if (!trabajadores || trabajadores.length === 0) {
      trabajadores = generarTrabajadoresIniciales();
      localStorage.setItem("trabajadores", JSON.stringify(trabajadores));
    }

    contenedor.innerHTML = "";

    trabajadores.forEach(t => {
      const tarjeta = document.createElement("div");
      tarjeta.className = "tarjeta-trabajador";
      tarjeta.innerHTML = `
        <h3>${t.nombre}</h3>
        <p><strong>Oficio:</strong> ${t.oficio}</p>
        <p><strong>Edad:</strong> ${t.edad}</p>
        <p><strong>Localidad:</strong> ${t.localidad}</p>
        <p><strong>Antigüedad:</strong> ${t.antiguedad} años</p>
        <img src="${t.imagen}" alt="${t.nombre}" class="imagen-trabajador"/>
      `;
      contenedor.appendChild(tarjeta);
    });
  }

  // Función para generar trabajadores iniciales si no existen en localStorage
  function generarTrabajadoresIniciales() {
    const oficios = [
      "Carpintero", "Electricista", "Gasista", "Jardinero", "Mecánico",
      "Cerrajero", "Cocinero", "Costurera", "Cuidador", "Gomero"
    ];
    const localidades = ["Resistencia", "Fontana", "Vilelas", "Barranqueras"];
    const nombres = [
      "Luis", "María", "Carlos", "Ana", "José", "Elena", "Pedro", "Laura",
      "Jorge", "Sofía", "Miguel", "Clara", "Juan", "Julia", "Andrés",
      "Valeria", "Raúl", "Lucía", "Diego", "Cecilia"
    ];

    const trabajadores = [];
    for (let i = 0; i < 20; i++) {
      const nombre = nombres[i];
      const edad = Math.floor(Math.random() * 30) + 20;
      const localidad = localidades[Math.floor(Math.random() * localidades.length)];
      const oficio = oficios[i % oficios.length];
      const antiguedad = Math.floor(Math.random() * 15) + 1;
      const imagen = `imagenes/trabajador${(i % 10) + 1}.jpg`;

      trabajadores.push({ nombre, edad, localidad, oficio, antiguedad, imagen });
    }
    return trabajadores;
  }
});
