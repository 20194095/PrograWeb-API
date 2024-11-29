import RepositoryBase from "./RepositoryBase.js";
import CarritoDeCompra from "../models/CarritoDeCompra.js";
import ItemDeCarrito from "../models/ItemCarrito.js";

class CartRepository extends RepositoryBase {
    constructor() {
        super(CarritoDeCompra);
    }

    // Obtener el carrito completo del usuario (con ítems)
    async getCartByUserId(userId) {
        try {
            return await this.model.findOne({
                where: { idUsuario: userId },
                include: [
                    {
                        model: ItemDeCarrito,
                        include: ["product"], // Relación con productos
                    },
                ],
            });
        } catch (error) {
            console.error("Error in getCartByUserId:", error);
            return null;
        }
    }

    // Agregar un producto al carrito
    async addProductToCart(cartId, productId, cantidad) {
        try {
            // Verificar si el producto ya existe en el carrito
            const existingItem = await ItemDeCarrito.findOne({
                where: { idCarrito: cartId, idProducto: productId },
            });
    
            if (existingItem) {
                // Si ya existe, actualiza la cantidad
                existingItem.cantidad += cantidad;
                await existingItem.save(); // Guarda los cambios
                return existingItem;
            }
    
            // Si no existe, crea un nuevo ítem en el carrito
            return await ItemDeCarrito.create({
                idCarrito: cartId,
                idProducto: productId,
                cantidad,
            });
        } catch (error) {
            console.error("Error in addProductToCart:", error);
            return null;
        }
    }
    

    // Actualizar la cantidad de un producto en el carrito
    async updateQuantity(cartId, productId, cantidad) {
        try {
            await ItemDeCarrito.update(
                { cantidad },
                { where: { idCarrito: cartId, idProducto: productId } }
            );
            return await ItemDeCarrito.findOne({
                where: { idCarrito: cartId, idProducto: productId },
            });
        } catch (error) {
            console.error("Error in updateQuantity:", error);
            return null;
        }
    }

    // Eliminar un producto del carrito
    async removeProductFromCart(cartId, productId) {
        try {
            return await ItemDeCarrito.destroy({
                where: { idCarrito: cartId, idProducto: productId },
            });
        } catch (error) {
            console.error("Error in removeProductFromCart:", error);
            return null;
        }
    }

    // Vaciar el carrito
    async clearCart(cartId) {
        try {
            return await ItemDeCarrito.destroy({ where: { idCarrito: cartId } });
        } catch (error) {
            console.error("Error in clearCart:", error);
            return null;
        }
    }
    // Crear un nuevo carrito
    async createCart(userId) {
        try {
            // Verifica si el usuario ya tiene un carrito
            const existingCart = await this.model.findOne({ where: { idUsuario: userId } });
            if (existingCart) {
                return existingCart; // Retorna el carrito existente
            }
    
            // Si no existe, crea uno nuevo
            return await this.model.create({ idUsuario: userId });
        } catch (error) {
            console.error("Error in createCart:", error);
            throw error;
        }
    }
    

}


export default new CartRepository();
