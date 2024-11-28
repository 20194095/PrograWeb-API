import RepositoryBase from "./RepositoryBase.js";
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";

class OrderRepository extends RepositoryBase {
    constructor() {
        super(Order);
    }

    // Obtener órdenes por ID de usuario
    async getOrdersByUserId(userId) {
        try {
            return await this.model.findAll({
                where: { user_id: userId },
                include: ["order_items"], // Suponiendo que 'order_items' es la relación con los ítems de la orden
            });
        } catch (error) {
            console.error("Error in getOrdersByUserId:", error);
            return null;
        }
    }

    // Obtener una orden específica por ID
    async getOrderById(userId, orderId) {
        try {
            return await this.model.findOne({
                where: { user_id: userId, id: orderId },
                include: ["order_items"], // Incluir ítems de la orden
            });
        } catch (error) {
            console.error("Error in getOrderById:", error);
            return null;
        }
    }

    // Crear una nueva orden
    async createOrder(userId, cartItems, total) {
        try {
            const order = await this.model.create({
                user_id: userId,
                total,
                estado: "pendiente",
            });

            // Crear los ítems de la orden
            const orderItems = cartItems.map((item) => ({
                order_id: order.id,
                product_id: item.product_id,
                cantidad: item.cantidad,
                precio: item.product.precio,
            }));

            await OrderItem.bulkCreate(orderItems);

            return order;
        } catch (error) {
            console.error("Error in createOrder:", error);
            return null;
        }
    }
}

export default new OrderRepository();
