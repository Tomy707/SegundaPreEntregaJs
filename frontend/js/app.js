
document.addEventListener('DOMContentLoaded', async () => {

    const storageService = new StorageService();
    const productService = new ProductService();
    const cartService = new CartService(storageService);

    
    const { 
        productosContainer, 
        listaCarrito, 
        totalElement, 
        vaciarCarritoBtn, 
        categoriaBtns 
    } = getDOMElements();

    // carga de productos
    try {
        await productService.loadProducts();
        renderProducts(productService.filterByCategory('todos'));
        renderCart();
    } catch (error) {
        handleError(error);
    }

    
    function setupEventListeners() {
        productosContainer.addEventListener('click', handleProductClick);
        listaCarrito.addEventListener('click', handleCartClick);
        vaciarCarritoBtn.addEventListener('click', handleClearCart);
        categoriaBtns.forEach(btn => {
            btn.addEventListener('click', handleCategoryFilter);
        });
    }

   
    function renderProducts(products) {
        productosContainer.innerHTML = products.map(({ id, img, name, price, stock }) => `
            <div class="producto">
                <div>
                    <img src="${img}" alt="${name}">
                    <h3>${name}</h3>
                    <p>$${price}</p>
                    <p>Stock: ${stock}</p>
                </div>
                <button class="agregar-carrito" data-id="${id}">Agregar al carrito</button>
            </div>
        `).join('');
    }

    function renderCart() {
        const cart = cartService.getCart();
        listaCarrito.innerHTML = cart.map(({ id, name, price, quantity }) => `
            <li>
                <span>${name} - $${price}</span>
                <div class="cantidad-control">
                    <button class="decrementar" data-id="${id}">-</button>
                    <span>${quantity}</span>
                    <button class="incrementar" data-id="${id}">+</button>
                </div>
                <button class="eliminar-producto" data-id="${id}">Eliminar</button>
            </li>
        `).join('');
        
        totalElement.textContent = cartService.calculateTotal();
    }

    // eventos
    function handleProductClick(e) {
        if (e.target.classList.contains('agregar-carrito')) {
            try {
                const id = Number(e.target.dataset.id);
                const product = productService.getProductById(id);
                cartService.addToCart(product);
                renderCart();
                showToast(`${product.name} agregado al carrito`);
            } catch (error) {
                handleError(error);
            }
        }
    }

    function handleCartClick(e) {
        try {
            const id = Number(e.target.dataset.id);
            
            if (e.target.classList.contains('eliminar-producto')) {
                cartService.removeFromCart(id);
            } else if (e.target.classList.contains('incrementar')) {
                cartService.updateQuantity(id, true);
            } else if (e.target.classList.contains('decrementar')) {
                cartService.updateQuantity(id, false);
            }
            
            renderCart();
        } catch (error) {
            handleError(error);
        }
    }

    function handleClearCart() {
        try {
            cartService.clearCart();
            renderCart();
        } catch (error) {
            handleError(error);
        }
    }

    function handleCategoryFilter(e) {
        try {
            categoriaBtns.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            const category = e.target.dataset.categoria;
            const filteredProducts = productService.filterByCategory(category);
            renderProducts(filteredProducts);
        } catch (error) {
            handleError(error);
        }
    }


    function getDOMElements() {
        return {
            productosContainer: document.getElementById('productos'),
            listaCarrito: document.getElementById('lista-carrito'),
            totalElement: document.getElementById('total'),
            vaciarCarritoBtn: document.getElementById('vaciar-carrito'),
            categoriaBtns: document.querySelectorAll('.categoria-btn')
        };
    }

    function handleError(error) {
        Swal.fire({
            title: 'Error',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#0f1d69',
        });
    }

    function showToast(message) {
        Toastify({
            text: message,
            duration: 3000,
            gravity: "bottom",
            position: "right",
            backgroundColor: "#0f1d69",
        }).showToast();
    }


    setupEventListeners();
});