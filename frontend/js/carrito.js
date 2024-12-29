// usar el carrito
class CartService {
    constructor(storageService) {
        this.storage = storageService;
        this.CART_KEY = 'carrito';
    }

    getCart() {
        try {
            const cartData = this.storage.getItem(this.CART_KEY);
            return cartData ? JSON.parse(cartData) : [];
        } catch (error) {
            throw new Error(`Error al obtener el carrito: ${error}`);
        }
    }

    addToCart(product) {
        try {
            if (!product || !product.id) {
                throw new Error('Producto inválido');
            }

            const cart = this.getCart();
            const existingItem = cart.find(item => item.id === product.id);

            if (existingItem) {
                if (existingItem.quantity < product.stock) {
                    existingItem.quantity++;
                } else {
                    throw new Error('Stock insuficiente');
                }
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            this.storage.setItem(this.CART_KEY, JSON.stringify(cart));
        } catch (error) {
            throw new Error(`Error al agregar al carrito: ${error}`);
        }
    }

    updateQuantity(productId, increment) {
        try {
            const cart = this.getCart();
            const item = cart.find(item => item.id === productId);

            if (!item) {
                throw new Error('Producto no encontrado en el carrito');
            }

            if (increment && item.quantity < item.stock) {
                item.quantity++;
            } else if (!increment && item.quantity > 1) {
                item.quantity--;
            } else if (!increment && item.quantity === 1) {
                return this.removeFromCart(productId);
            }

            this.storage.setItem(this.CART_KEY, JSON.stringify(cart));
        } catch (error) {
            throw new Error(`Error al actualizar cantidad: ${error}`);
        }
    }

    removeFromCart(productId) {
        try {
            const cart = this.getCart();
            const updatedCart = cart.filter(item => item.id !== productId);
            this.storage.setItem(this.CART_KEY, JSON.stringify(updatedCart));
        } catch (error) {
            throw new Error(`Error al eliminar del carrito: ${error}`);
        }
    }

    clearCart() {
        try {
            this.storage.removeItem(this.CART_KEY);
        } catch (error) {
            throw new Error(`Error al vaciar el carrito: ${error}`);
        }
    }

    calculateTotal() {
        try {
            const cart = this.getCart();
            return cart.reduce((total, { price, quantity }) => total + price * quantity, 0);
        } catch (error) {
            throw new Error(`Error al calcular el total: ${error}`);
        }
    }
}