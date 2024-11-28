import RepositoryBase from "./RepositoryBase.js";
import CartItem from "../models/CartItem.js";

class CartRepository extends RepositoryBase {
    constructor() {
        super(CartItem);
    }

    // Obtener el carrito del usuario por su ID
    async getCartByUserId(userId) {
        try {
            return await this.model.findAll({
                where: { user_id: userId },
                include: ["product"], // Suponiendo que 'product' es la relación con los productos
            });
        } catch (error) {
            console.error("Error in getCartByUserId:", error);
            return null;
        }
    }

    // Agregar un producto al carrito
    async addProduct(userId, productId, cantidad) {
        try {
            return await this.model.create({ user_id: userId, product_id: productId, cantidad });
        } catch (error) {
            console.error("Error in addProduct:", error);
            return null;
        }
    }

    // Actualizar la cantidad de un producto en el carrito
    async updateQuantity(userId, productId, cantidad) {
        try {
            await this.model.update(
                { cantidad },
                { where: { user_id: userId, product_id: productId } }
            );
            return await this.model.findOne({ where: { user_id: userId, product_id: productId } });
        } catch (error) {
            console.error("Error in updateQuantity:", error);
            return null;
        }
    }

    // Eliminar un producto del carrito
    async removeProduct(userId, productId) {
        try {
            return await this.model.destroy({ where: { user_id: userId, product_id: productId } });
        } catch (error) {
            console.error("Error in removeProduct:", error);
            return null;
        }
    }

    // Vaciar el carrito del usuario
    async clearCart(userId) {
        try {
            return await this.model.destroy({ where: { user_id: userId } });
        } catch (error) {
            console.error("Error in clearCart:", error);
            return null;
        }
    }
}

export default new CartRepository();
