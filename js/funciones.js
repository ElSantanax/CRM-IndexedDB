function conectarDB() {
    // abri la conexión
    const abrirConexion = window.indexedDB.open('crm', 1);

    // 400
    abrirConexion.onerror = function () {
        console.log('Hubo un error al conectarse con la base de datos ');
    }

    // 200
    abrirConexion.onsuccess = function () {
        window.DB = abrirConexion.result;
    }
}

function imprimirAlerta(mensaje, tipo) {
    // Crear Alerta
    const alerta = document.querySelector('.alerta');

    if (!alerta) {
        const divMensaje = document.createElement('DIV');
        divMensaje.classList.add('px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'border', 'alerta');

        if (tipo === 'error') {
            divMensaje.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
        } else {
            divMensaje.classList.add('bg-green-100', 'border-green-400', 'text-green-700');
        }

        divMensaje.textContent = mensaje;
        
        const formulario = document.querySelector('#formulario');
        if (formulario) {
            formulario.appendChild(divMensaje);
        }

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }
}