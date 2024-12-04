// Class / Constructor 
class Product{
    constructor(id, name, category, price){
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
    }
}

// Array de productos
const products = [
    new Product(1, "Camiseta Titular 2024", "remeras", 15000),
    new Product(2, "Camiseta Suplente 2024", "remeras", 14000),
    new Product(3, "Short Oficial", "shorts", 9000),
    new Product(4, "Medias Boca Juniors", "accesorios", 2000),
    new Product(5, "Campera de Entrenamiento", "abrigos", 25000),
];

//Filtro ingresado por el usuario

const userCategory = prompt("Ingresa la categoria por cual filtrar. (Remeras, Shorts, Accesorios y Abrigos)").toLowerCase().trim()

const filteredProduct = products.filter(product => 
    product.category.toLowerCase().trim() === userCategory
);

// Mostrar los productos

if (filteredProduct.length > 0) {
    console.log("Productos filtrados:", filteredProduct)
} else {
    console.log("No se encontraron productos en esa categoria")
};



