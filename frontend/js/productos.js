// constructor
class Product {
    constructor(id, img, name, category = '', price = '', stock = 0) {
        this.id = id;
        this.img = img;
        this.name = name;
        this.category = category;
        this.price = price;
        this.stock = stock;
    }
}

// array de productos
const products = [
    new Product(1, 'frontend/img/CamisetaAlternativaBocaJrs2425.png', "Camiseta Alternativa Boca Jrs 24/25", "remeras", 50000, Math.floor(Math.random() * 20) + 1),
    new Product(2, 'frontend/img/CamisetadeArquero2425.png', "Camiseta de Arquero 24/25", "remeras", 45000, Math.floor(Math.random() * 20) + 1),
    new Product(3, 'frontend/img/CamisetaPrePartidoBocaJrs2425.png', "Camiseta Pre Partido Boca Jrs 24/25", "remeras", 30000, Math.floor(Math.random() * 20) + 1),
    new Product(4, 'frontend/img/CamisetaTitularBocaJrs2425.png', "Camiseta Titular Boca Jrs 24/25", "remeras", 90000, Math.floor(Math.random() * 20) + 1),
    new Product(5, 'frontend/img/TerceraCamisetaAutenthicBoca2024.png', "Tercera Camiseta Autenthic Boca 2024", "remeras", 75000, Math.floor(Math.random() * 20) + 1),
    new Product(6, 'frontend/img/ShortAlternativoAuthentic2324.png', "Short Alternativo Authentic 23/24", "shorts", 35000, Math.floor(Math.random() * 20) + 1),
    new Product(7, 'frontend/img/ShortAlternativoBocaJrs2425.png', "Short Alternativo Boca Jrs 24/25", "shorts", 30000, Math.floor(Math.random() * 20) + 1),
    new Product(8, 'frontend/img/ShortdeArquero2425.png', "Short de Arquero 24/25", "shorts", 27000, Math.floor(Math.random() * 20) + 1),
    new Product(9, 'frontend/img/ShortTercerUniformeBoca2024.png', "Short Tercer Uniforme Boca 2024", "shorts", 40000, Math.floor(Math.random() * 20) + 1),
    new Product(10, 'frontend/img/ShortTitularBocaJrs2425.png', "Short Titular Boca Jrs 24/25", "shorts", 20000, Math.floor(Math.random() * 20) + 1),
    new Product(11, 'frontend/img/MediasAlternativasBocaJrs2223.png', "Medias Alternativas Boca Jrs 22/23", "medias", 10000, Math.floor(Math.random() * 20) + 1),
    new Product(12, 'frontend/img/MediasTercerUniforme2223.png', "Medias Tercer Uniforme 22/23", "medias", 12000, Math.floor(Math.random() * 20) + 1),
    new Product(13, 'frontend/img/MediasTercerUniforme2324.png', "Medias Tercer Uniforme 23/24", "medias", 16000, Math.floor(Math.random() * 20) + 1),
    new Product(14, 'frontend/img/MediasTercerUniformeBocaJuniors2024.png', "Medias Tercer Uniforme Boca Juniors 2024", "medias", 6999, Math.floor(Math.random() * 20) + 1),
    new Product(15, 'frontend/img/MediasUniformeAlternativoBocaJuniors2324.png', "Medias Alternativo Boca Juniors 23/24", "medias", 8999, Math.floor(Math.random() * 20) + 1),
    new Product(16, 'frontend/img/BuzoEstampadoconCapuchaBocaJuniors.png', "Buzo Estampado Boca Juniors", "abrigos", 70000, Math.floor(Math.random() * 20) + 1),
    new Product(17, 'frontend/img/CamperaInviernoBocaJrs.png', "Campera Invierno Boca Jrs", "abrigos", 120000, Math.floor(Math.random() * 20) + 1),
    new Product(18, 'frontend/img/CamperaSZNWB.png', "Campera SZNWB", "abrigos", 99999, Math.floor(Math.random() * 20) + 1),
];

// agarrar ids del html
const productosContainer = document.getElementById('productos');
const listaCarrito = document.getElementById('lista-carrito');
const totalElement = document.getElementById('total');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const categoriaBtns = document.querySelectorAll('.categoria-btn');

// carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// functions
const renderProducts = (productsToRender = products) => {
    productosContainer.innerHTML = '';
    productsToRender.forEach(({ id, img, name, price, stock }) => {
        const productoElement = document.createElement('div');
        productoElement.classList.add('producto');
        productoElement.innerHTML = `
            <div>
                <img src="${img}" alt="${name}">
                <h3>${name}</h3>
                <p>$${price}</p>
                <p>Stock: ${stock}</p>
            </div>
            <button class="agregar-carrito" data-id="${id}">Agregar al carrito</button>
        `;
        productosContainer.appendChild(productoElement);
    });
};

const renderCarrito = () => {
    listaCarrito.innerHTML = '';
    carrito.forEach(({ id, name, price, quantity }) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${name} - $${price}</span>
            <div class="cantidad-control">
                <button class="decrementar" data-id="${id}">-</button>
                <span>${quantity}</span>
                <button class="incrementar" data-id="${id}">+</button>
            </div>
            <button class="eliminar-producto" data-id="${id}">Eliminar</button>
        `;
        listaCarrito.appendChild(li);
    });
    updateTotal();
};

const updateTotal = () => {
    const total = carrito.reduce((acumulador, { price, quantity }) => acumulador + price * quantity, 0);
    totalElement.textContent = total;
};

const addToCart = (id) => {
    const product = products.find(p => p.id === id);
    const item = carrito.find(i => i.id === id);
    const currentQuantity = item ? item.quantity : 0;

    if (currentQuantity < product.stock) {
        item ? item.quantity++ : carrito.push({ ...product, quantity: 1 });
        saveCart();
        renderCarrito();
        Toastify({
            text: `${product.name} agregado al carrito`,
            duration: 3000,
            gravity: "bottom",
            position: "right",
            backgroundColor: "#0f1d69",
        }).showToast();
    } else {
        Swal.fire({
            title: 'Stock insuficiente',
            text: `Lo sentimos, no tenemos más stock de ${product.name}`,
            icon: 'error',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#0f1d69',
        });
    }
};

const removeFromCart = (id) => {
    carrito = carrito.filter(item => item.id !== id);
    saveCart();
    renderCarrito();
};

const incrementQuantity = (id) => {
    const item = carrito.find(i => i.id === id);
    const product = products.find(p => p.id === id);

    if (item.quantity < product.stock) {
        item.quantity++;
        saveCart();
        renderCarrito();
    } else {
        Swal.fire({
            title: 'Stock insuficiente',
            text: `Lo sentimos, no tenemos más stock de ${product.name}`,
            icon: 'error',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#0f1d69',
        });
    }
};

const decrementQuantity = (id) => {
    const item = carrito.find(i => i.id === id);
    item.quantity > 1 ? item.quantity-- : removeFromCart(id);
    saveCart();
    renderCarrito();
};

const saveCart = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

const vaciarCarrito = () => {
    carrito = [];
    saveCart();
    renderCarrito();
};

const filterProducts = (category) => {
    const filteredProducts = category === 'todos' ? products : products.filter(p => p.category === category);
    renderProducts(filteredProducts);
};

// eventos
productosContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('agregar-carrito')) {
        addToCart(Number(e.target.dataset.id));
    }
});

listaCarrito.addEventListener('click', (e) => {
    const id = Number(e.target.dataset.id);
    if (e.target.classList.contains('eliminar-producto')) {
        removeFromCart(id);
    } else if (e.target.classList.contains('incrementar')) {
        incrementQuantity(id);
    } else if (e.target.classList.contains('decrementar')) {
        decrementQuantity(id);
    }
});

vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

categoriaBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        categoriaBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        filterProducts(e.target.dataset.categoria);
    });
});


renderProducts();
renderCarrito();

