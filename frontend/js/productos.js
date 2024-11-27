

// Class / Constructor 
class Product{
    constructor(id, name, category, price){
        this.id = id;
        this.name = name;
        this.categori = category;
        this.price = price;
    }
}

// Filtrar Productos
function filterPrice(products){
    const  result = products.filter(product => {
    const  condition = product.price >= 10000
    return condition;
    })
    return result
}

// Array de productos
const products = [
    new Product(1, "Camiseta Titular 2024", "remeras", 15000),
    new Product(2, "Camiseta Suplente 2024", "remeras", 14000),
    new Product(3, "Short Oficial", "shorts", 9000),
    new Product(4, "Medias Boca Juniors", "accesorios", 2000),
    new Product(5, "Campera de Entrenamiento", "abrigos", 25000),
];


// Para probarlo en consola
const productosFiltrados = filterPrice(products);




