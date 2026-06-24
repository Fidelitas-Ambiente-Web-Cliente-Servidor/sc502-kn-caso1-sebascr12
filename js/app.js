//categoria en los filtros pa que se pinte en colores si no no entra al bucle y hace la funcion de filtrar
let categoriaActiva = 'Todos';


const menu = [
  { nombre: 'Bruschetta Clásica', descripcion: 'Pan tostado con tomate y albahaca fresca', precio: 4500, categoria: 'Entrada' },
  { nombre: 'Tabla de Quesos', descripcion: 'Selección de quesos importados con mermelada', precio: 7800, categoria: 'Entrada' },
  { nombre: 'Lomo al Vino Tinto', descripcion: 'Lomo de res en reducción de vino tinto', precio: 15500, categoria: 'Plato Fuerte' },
  { nombre: 'Pasta Carbonara', descripcion: 'Pasta con tocino, huevo y queso parmesano', precio: 10200, categoria: 'Plato Fuerte' },
  { nombre: 'Salmón a la Plancha', descripcion: 'Filete de salmón con vegetales al vapor', precio: 13800, categoria: 'Plato Fuerte' },
  { nombre: 'Tiramisú', descripcion: 'Postre italiano con café y mascarpone', precio: 5200, categoria: 'Postre' },
  { nombre: 'Cheesecake de Maracuyá', descripcion: 'Cheesecake cremoso con coulis de maracuyá', precio: 4800, categoria: 'Postre' },
];


const reservas = [];


function renderMenu() {

  const contenedor = document.getElementById('contenedor-menu');
  if (!contenedor) return;
  //se limpia el cont
  contenedor.innerHTML = '';
  //condicional de categorias
  const platosAFiltrar = menu.filter(plato => {
    if (categoriaActiva === 'Todos') return true;
    //condicional de categorias con el nombre
    return plato.categoria === categoriaActiva;
  });
  //para cada plato se crea la col de bootstrap
  platosAFiltrar.forEach(plato => {
    const col = document.createElement('div');
    col.className = 'col';
    const card = document.createElement('div');//contenedor principal
    card.className = 'card-plato';
    const precioFormateado = `₡${plato.precio.toLocaleString('es-CR')}`; //en el json no tiene el precio bien 
    //inner para crear el card
    card.innerHTML = `
      <div class="card-body">
        <div>
          <h5 class="card-title">${plato.nombre}</h5>
          <p class="card-text">${plato.descripcion}</p>
        </div>
        <div class="precio-categoria">
          <span class="precio">${precioFormateado}</span>
          <span class="categoria-badge">${plato.categoria}</span>
        </div>
      </div>
    `;
    //append para anidar todo
    col.appendChild(card);
    contenedor.appendChild(col);
  });
}


function filtrarCategoria(categoria) {
  //categoria activa en el momento
  categoriaActiva = categoria;
  //pone el botoncito en azul
  const botones = document.querySelectorAll('#contenedor-filtros button');
  //for each botones, if categoria activa es igual a la categoria del boton, ponerlo en azul, si no, quitarlo
  botones.forEach(boton => {
    const categoriaBoton = boton.getAttribute('data-categoria');
    if (categoriaBoton === categoria) {
      boton.classList.add('active');
    } else {
      boton.classList.remove('active');
    }
  });
  renderMenu();
}

function validarFormulario() {
  const nombreInput = document.getElementById('nombre');
  const correoInput = document.getElementById('correo');
  const fechaInput = document.getElementById('fecha');
  const horaSelect = document.getElementById('hora');
  const personasInput = document.getElementById('personas');
  const btnSubmit = document.getElementById('btn-submit');

  //errores
  const errorNombre = document.getElementById('error-nombre');
  const errorCorreo = document.getElementById('error-correo');
  const errorFecha = document.getElementById('error-fecha');
  const errorHora = document.getElementById('error-hora');
  const errorPersonas = document.getElementById('error-personas');

  let formularioValido = true; //funcion para ver si el formulario es valido
  //validar nombre
  const nombreVal = nombreInput.value.trim();
  const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; //asegurar el formato

  //validaciones del nombre
  if (nombreVal === '') {
    errorNombre.textContent = 'El nombre completo es obligatorio.';
    nombreInput.classList.add('is-invalid');
    nombreInput.classList.remove('is-valid');
    formularioValido = false;
  } else if (nombreVal.length < 5) {
    errorNombre.textContent = 'El nombre debe tener al menos 5 caracteres.';
    nombreInput.classList.add('is-invalid');
    nombreInput.classList.remove('is-valid');
    formularioValido = false;
  } else if (!regexNombre.test(nombreVal)) {
    errorNombre.textContent = 'El nombre solo puede contener letras y espacios.';
    nombreInput.classList.add('is-invalid');
    nombreInput.classList.remove('is-valid');
    formularioValido = false;
  } else {
    errorNombre.textContent = '';
    nombreInput.classList.remove('is-invalid');
    nombreInput.classList.add('is-valid');
  }
  //validacion de correo
  const correoVal = correoInput.value.trim();
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (correoVal === '') {
    errorCorreo.textContent = 'El correo es obligatorio.';
    correoInput.classList.add('is-invalid');
    correoInput.classList.remove('is-valid');
    formularioValido = false;
  } else if (!regexCorreo.test(correoVal)) {
    errorCorreo.textContent = 'Ingrese un formato de correo valido (test@correo.com).';
    correoInput.classList.add('is-invalid');
    correoInput.classList.remove('is-valid');
    formularioValido = false;
  } else {
    errorCorreo.textContent = '';
    correoInput.classList.remove('is-invalid');
    correoInput.classList.add('is-valid');
  }
  //fecha
  const fechaVal = fechaInput.value;
  const hoyStr = new Date().toLocaleDateString('sv-SE'); // formato YYYY-MM-DD 
  if (fechaVal === '') {
    errorFecha.textContent = 'La fecha de reserva es obligatoria.';
    fechaInput.classList.add('is-invalid');
    fechaInput.classList.remove('is-valid');
    formularioValido = false;
  } else if (fechaVal < hoyStr) {
    errorFecha.textContent = 'La fecha no puede ser en el pasado.';
    fechaInput.classList.add('is-invalid');
    fechaInput.classList.remove('is-valid');
    formularioValido = false;
  } else {
    errorFecha.textContent = '';
    fechaInput.classList.remove('is-invalid');
    fechaInput.classList.add('is-valid');
  }
  //horas
  const horaVal = horaSelect.value;
  if (horaVal === '') {
    errorHora.textContent = 'Debe seleccionar una hora para la reserva.';
    horaSelect.classList.add('is-invalid');
    horaSelect.classList.remove('is-valid');
    formularioValido = false;
  } else {
    errorHora.textContent = '';
    horaSelect.classList.remove('is-invalid');
    horaSelect.classList.add('is-valid');
  }
  //cantidad de personas
  const personasVal = parseInt(personasInput.value, 10);
  if (isNaN(personasVal) || personasInput.value === '') {
    errorPersonas.textContent = 'El número de personas es obligatorio.';
    personasInput.classList.add('is-invalid');
    personasInput.classList.remove('is-valid');
    formularioValido = false;
  } else if (personasVal < 1 || personasVal > 20) {
    errorPersonas.textContent = 'El número de personas debe estar entre 1 y 20.';
    personasInput.classList.add('is-invalid');
    personasInput.classList.remove('is-valid');
    formularioValido = false;
  } else {
    errorPersonas.textContent = '';
    personasInput.classList.remove('is-invalid');
    personasInput.classList.add('is-valid');
  }
  // habilitar o deshabilitar boton de enviar
  if (formularioValido) {
    btnSubmit.removeAttribute('disabled');
  } else {
    btnSubmit.setAttribute('disabled', 'true');
  }
  //devuelve el formato valido del formulario
  return formularioValido;
}

function agregarReserva() {
  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const fecha = document.getElementById('fecha').value;
  const hora = document.getElementById('hora').value;
  const personas = parseInt(document.getElementById('personas').value, 10);
  const comentarios = document.getElementById('comentarios').value.trim();
  //array de reservas
  const nuevaReserva = { nombre, correo, fecha, hora, personas, comentarios };
  reservas.push(nuevaReserva);
  //crear y agregar la fila a la tabla
  const tbody = document.getElementById('tbody-reservas');
  const fila = document.createElement('tr');
  fila.className = 'fila-reserva';
  // resaltar visualmente grupos de 6 o más personas
  if (personas >= 6) {
    fila.classList.add('vip');
  }
  //insertar las celdas
  fila.innerHTML = `
    <td>${nombre}</td>
    <td>${correo}</td>
    <td>${fecha}</td>
    <td>${hora}</td>
    <td class="text-center font-weight-bold">${personas}</td>
  `;

  tbody.appendChild(fila);
  //limpiar el formulario y sus estilos visuales
  const form = document.getElementById('form-reserva');
  form.reset();
  const inputs = form.querySelectorAll('.form-control, .form-select');
  inputs.forEach(input => {
    input.classList.remove('is-valid', 'is-invalid');
  });
  document.getElementById('btn-submit').setAttribute('disabled', 'true'); //quitar el boton de envio, para limpiar
  actualizarResumen();
}


function actualizarResumen() {
  //elementos del DOM
  const totalReservasElement = document.getElementById('resumen-total');
  const totalPersonasElement = document.getElementById('resumen-personas');
  const mayorReservaElement = document.getElementById('resumen-mayor');
  const totalReservas = reservas.length;
  //suma + cantidad de personas para obtener el total de personas
  const totalPersonas = reservas.reduce((suma, reserva) => suma + reserva.personas, 0);
  //reserva con mayor numero de personas
  let mayorReservaTexto = 'N/A';
  if (totalReservas > 0) { //si el total de reservas es diferente de 0 entonces
    const mayor = reservas.reduce((max, actual) => actual.personas > max.personas ? actual : max, reservas[0]);
    mayorReservaTexto = `${mayor.nombre} (${mayor.personas} personas a las ${mayor.hora})`;
  }
  //dom actualizado
  totalReservasElement.textContent = totalReservas;
  totalPersonasElement.textContent = totalPersonas;
  mayorReservaElement.textContent = mayorReservaTexto;
}

//listeners
document.addEventListener('DOMContentLoaded', function () {
  renderMenu();
  //listeners para los botones del menu
  const botones = document.querySelectorAll('#contenedor-filtros button');
  botones.forEach(boton => {
    boton.addEventListener('click', function () {
      const categoria = this.getAttribute('data-categoria');
      filtrarCategoria(categoria);
    });
  });
  const inputsAValidar = document.querySelectorAll('#form-reserva input, #form-reserva select');
  inputsAValidar.forEach(input => {
    //listener para detectar cambios en el formulario
    input.addEventListener('input', validarFormulario);
    input.addEventListener('change', validarFormulario);
  });
});


document.getElementById('form-reserva').addEventListener('submit', function (e) {
  e.preventDefault(); // Evitar recarga de página
  // Realizar validación final por seguridad
  if (validarFormulario()) {
    agregarReserva();
  }

});
