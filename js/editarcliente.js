(function () {

    let DB;
    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const telefonoInput = document.querySelector('#telefono');
    const empresaInput = document.querySelector('#empresa');

    document.addEventListener('DOMContentLoaded', () => {

        conectarDB();

        // Verificar el ID de la URL
        const parametrosURL = new URLSearchParams(window.location.search);
        const idCliente = parametrosURL.get('id');

        if (idCliente) {
            setTimeout(() => {
                obtenerCliente(idCliente);
            }, 100);
        }
    })

    function obtenerCliente(id) {
        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');

        const cliente = objectStore.openCursor();
        cliente.onsuccess = function (e) {
            const cursor = e.target.result;

            if (cursor) {
                if (cursor.value.id === Number(id)) {
                    llamarFormulario(cursor.value);
                }
                cursor.continue();
            }
        }
    }

    function llamarFormulario(datosClientes) {
        const { nombre, email, telefono, empresa } = datosClientes;

        nombreInput.value = nombre;
        emailInput.value = email;
        telefonoInput.value = telefono;
        empresaInput.value = empresa;
    }

    function conectarDB() {
        // abri la conexión
        const abrirConexion = window.indexedDB.open('crm', 1);

        // 400
        abrirConexion.onerror = function () {
            console.log('Hubo un error al conectace con la base de datos ');
        }

        // 200
        abrirConexion.onsuccess = function () {
            DB = abrirConexion.result;
        }
    }
})();