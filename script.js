window.onload = function() {
  cargarDatos();
  mostrarFechaActual();
  mostrarGifAleatorio(96, 9, 88);
};

function guardarDatos(cuentaId) {
  const fecha = document.getElementById('fecha' + cuentaId).value;

  // Guardar los datos en localStorage
  localStorage.setItem('fecha' + cuentaId, fecha);

  // Si es la cuenta 205 (el temporizador), se guarda el momento actual
  if (cuentaId === 205) {
      const ahora = new Date();
      const tiempoFinal = ahora.getTime() + 2 * 60 * 60 * 1000; // 2 horas en milisegundos
      localStorage.setItem('tiempoFinal205', tiempoFinal); // Guardar el tiempo de finalización
  }

  actualizarDiasRestantes(cuentaId, fecha);

  alert('Datos guardados para la cuenta ' + cuentaId);
}


function cargarDatos() {
  for (let i = 201; i <= 205; i++) {
    const nombreUsuario = localStorage.getItem('nombre' + i);
    const password = localStorage.getItem('password' + i);
    const fecha = localStorage.getItem('fecha' + i);
    
    if (nombreUsuario) {
      document.getElementById('nombre' + i).value = nombreUsuario;
    }
    if (password) {
      document.getElementById('password' + i).value = password;
    }
    if (fecha) {
      document.getElementById('fecha' + i).value = fecha;
      actualizarDiasRestantes(i, fecha);
    }
  }
}

function actualizarDiasRestantes(cuentaId, fecha) {
  const hoy = new Date();

  if (cuentaId === 205) { // Nueva cuenta regresiva de 2 horas
      let tiempoFinal = localStorage.getItem('tiempoFinal205');
      
      if (tiempoFinal) {
          tiempoFinal = parseInt(tiempoFinal);
          const intervalo = setInterval(() => {
              const ahora = new Date().getTime();
              let tiempoRestante = tiempoFinal - ahora;

              if (tiempoRestante > 0) {
                  const horas = Math.floor(tiempoRestante / (1000 * 60 * 60));
                  const minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
                  const segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);
                  document.getElementById('restantes' + cuentaId).textContent = `Tiempo restante: ${horas}h ${minutos}m ${segundos}s`;
              } else {
                  document.getElementById('restantes' + cuentaId).textContent = "Disponible";
                  clearInterval(intervalo);
              }
          }, 1000);
      } else {
          document.getElementById('restantes' + cuentaId).textContent = "Disponible";
      }
  } else {
      const fechaVencimiento = new Date(fecha);
      hoy.setHours(0, 0, 0, 0); // Establecer la hora de hoy a las 00:00 para una comparación de solo fecha
      let diferencia = fechaVencimiento - hoy;

      if (diferencia <= 0) {
          document.getElementById('restantes' + cuentaId).textContent = "Disponible";
      } else {
          const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24)); // Calcular días restantes redondeando hacia arriba
          document.getElementById('restantes' + cuentaId).textContent = `Días restantes: ${dias}`;
      }
  }
}

function togglePasswordVisibility(cuentaId) {
  const passwordField = document.getElementById('password' + cuentaId);
  const toggleIcon = passwordField.nextElementSibling;

  if (passwordField.type === "password") {
    passwordField.type = "text";
    toggleIcon.src = "Src/Icons/eye-off.png"; // Cambia al icono de ocultar
  } else {
    passwordField.type = "password";
    toggleIcon.src = "Src/Icons/eye.png"; // Cambia al icono de mostrar
  }
}

function mostrarFechaActual() {
  const fechaActual = new Date();
  const fechaFormateada = fechaActual.toLocaleDateString('es-ES', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  document.getElementById('fechaActual').textContent = `Fecha: ${fechaFormateada}`;
}

function mostrarGifAleatorio(numShiny, numLegendario, numNormales) {
  const shinyGifs = [96];
  const legendarioGifs = [6];
  const normalesGifs = [88];

  for (let i = 1; i <= numShiny; i++) {
    shinyGifs.push(`Src/Animaciones/shiny/gif${i}.gif`);
  }
  for (let i = 1; i <= numLegendario; i++) {
    legendarioGifs.push(`Src/Animaciones/legendario/gif${i}.gif`);
  }
  for (let i = 1; i <= numNormales; i++) {
    normalesGifs.push(`Src/Animaciones/normales/gif${i}.gif`);
  }

  const probabilidad = Math.random();
  let gifSeleccionado;

  if (probabilidad <= 0.01) { // 0.1% para Legendario
    const randomIndex = Math.floor(Math.random() * legendarioGifs.length);
    gifSeleccionado = legendarioGifs[randomIndex];
    console.log("Pokemon Legendario Numero: " + randomIndex);
    alert("Pokemon Legendario");
  } else if (probabilidad <= 0.11) { // 1% para Shiny (1% + 0.1%)
    const randomIndex = Math.floor(Math.random() * shinyGifs.length);
    gifSeleccionado = shinyGifs[randomIndex];
    console.log("Pokemon Shiny Numero: " + randomIndex);
    alert("Pokemon Shiny");
  } else { // El resto para Normales
    const randomIndex = Math.floor(Math.random() * normalesGifs.length);
    gifSeleccionado = normalesGifs[randomIndex];
    console.log("Normal Numero: " + randomIndex);
  }

  document.getElementById('randomGif').src = gifSeleccionado;
}
