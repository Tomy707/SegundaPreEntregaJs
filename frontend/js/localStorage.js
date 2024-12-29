// usar el almacenamiento local
class StorageService {
    constructor(storage = localStorage) {
        this.storage = storage;
    }

    getItem(key) {
        try {
            return this.storage.getItem(key);
        } catch (error) {
            throw new Error(`Error al obtener datos: ${error}`);
        }
    }

    setItem(key, value) {
        try {
            this.storage.setItem(key, value);
        } catch (error) {
            throw new Error(`Error al guardar datos: ${error}`);
        }
    }

    removeItem(key) {
        try {
            this.storage.removeItem(key);
        } catch (error) {
            throw new Error(`Error al eliminar datos: ${error}`);
        }
    }
}