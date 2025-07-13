(function () {
    let DB;
    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded', () => {
        // Solo conectar a la DB, la creación está en app.js
        conectarDB();
        formulario.addEventListener('submit', validarCliente)
    });

    function validarCliente(e) {
        e.preventDefault();

        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if (nombre === '' || email === '' || telefono === '' || empresa === '') {
            imprimirAlerta('Todos los campos son obligatorios', 'error');
            return;
        }

        // Crear un objeto con la información
        const cliente = {
            nombre,
            email,
            telefono,
            empresa,
        }

        cliente.id = Date.now();
        crearNuevoCliente(cliente);
    }

    function crearNuevoCliente(cliente) {
        const transaction = window.DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');
        objectStore.add(cliente);

        // 400
        transaction.onerror = function () {
            imprimirAlerta('Error: Este correo electrónico ya está registrado.', 'error');
        }

        // 200
        transaction.oncomplete = function () {
            imprimirAlerta('Cliente agregado correctamente');
        }

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 3000);
    }
})();