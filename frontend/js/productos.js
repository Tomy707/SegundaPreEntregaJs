//  manejar los productos
class ProductService {
    constructor() {
        this.products = [];
    }

    async loadProducts() {
        try {
            const response = await fetch('/frontend/json/productos.json');
            if (!response.ok) {
                throw new Error('Error al cargar los productos');
            }
            this.products = await response.json();
            return this.products;
        } catch (error) {
            throw new Error(`Error en la carga de productos: ${error}`);
        }
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            throw new Error('Producto no encontrado');
        }
        return product;
    }

    filterByCategory(category) {
        if (!category || category === 'todos') {
            return this.products;
        }
        return this.products.filter(product => product.category === category);
    }
}