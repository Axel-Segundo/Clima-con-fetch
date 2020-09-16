const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
})

function buscarClima(e) {
    e.preventDefault();

    // Validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === '') {
        mostrarError('Ambos campos son obligatorios');

        return;
    }

    consularAPI(ciudad,pais);
}

function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-100');

    if(!alerta) {
        // Crear una alerta
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-nd', 'nx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `
            <strong class="font-bold">¡Error!</strong>
            <span class="block">${mensaje}</span>
        `;

        container.appendChild(alerta);

        // Se elimine la alerta
        setTimeout(() => {
            alerta.remove();
        }, 5000);
    }
}

function consularAPI(ciudad, pais) {
    const appId = 'fe64435eebca59da42d0e2af93900716';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            limpiarHTML();
            if(datos.cod === "404") {
                mostrarError('Ciudad no encontrada')
                return;
            }

            //Imprime la respuesta

            mostrarClima(datos);

        })
}

function mostrarClima(datos) {
    const {main: { temp, temp_max, temp_min}} = datos;

    const centigrados = kelvinACentigrados(temp);

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(actual);

    resultado.appendChild(resultadoDiv);
}

function kelvinACentigrados(grados) {
    return parseInt(grados - 273.15);
}

function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}