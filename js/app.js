(function () {

    let DB;

    document.addEventListener('DOMContentLoaded', () => {
        crearDB();
    })

    // Crear la base de datos de indexedBD
    function crearDB() {
        // Crear
        const crearDB = window.indexedDB.open('crm', 1);

        // 404
        crearDB.onerror = function () {
            console.log('Hubo un error');
        }

        // 200
        crearDB.onsuccess = function () {
            DB = crearDB.result;
            console.log('Creado correctamente');
        }

        // Definir las columnas
        crearDB.onupgradeneeded = function (e) {
            const db = e.target.result;

            const objectStore = db.createObjectStore('crm', {
                keyPath: 'id',
                autoIncrement: true,
            })

            objectStore.createIndex('nombre', 'nombre', { unique: false });
            objectStore.createIndex('email', 'email', { unique: true });
            objectStore.createIndex('telefono', 'telefono', { unique: false });
            objectStore.createIndex('empresa', 'empresa', { unique: false });
            objectStore.createIndex('id', 'id', { unique: true });

            console.log('DB lista y creada');
        }
    }
})();