import RepositoryBase from "./RepositoryBase.js";
import Orden from "../models/orden.js";
import ItemDeLaOrden from "../models/ItemDeLaOrden.js";

class OrderRepository extends RepositoryBase {
    constructor() {
        super(Orden);
    }

    // Obtener órdenes por usuario
    async getOrdersByUserId(userId) {
        try {
            return await this.model.findAll({
                where: { idUsuario: userId },
                include: ["order_items"], // Relación con ítems de la orden
            });
        } catch (error) {
            console.error("Error in getOrdersByUserId:", error);
            return null;
        }
    }

    // Crear una nueva orden
    async createOrder(userId, items, total, subTotal, metodoDeEntrega, nroTarjeta, tipoTarjeta, fecha) {
        try {
            const order = await this.model.create({
                idUsuario: userId,
                total,
                subTotal,
                metodoDeEntrega,
                nroTarjeta,
                tipoTarjeta,
                fecha, // Incluir el campo fecha
            });

            // Crear los ítems de la orden
            const orderItems = items.map((item) => ({
                idOrden: order.id,
                idProducto: item.idProducto,
            }));

            await ItemDeLaOrden.bulkCreate(orderItems);

            return order;
        } catch (error) {
            console.error("Error en createOrder:", error);
            throw error;
        }
    }
    async getOrderById(orderId) {
        try {
            console.log("Fetching order with ID:", orderId); // Log del ID recibido
            const order = await this.model.findOne({
                where: { id: orderId },
                include: [
                    {
                        model: ItemDeLaOrden,
                        as: "order_items",
                    },
                ],
            });
            console.log("Order fetched:", order); // Log del resultado
            return order;
        } catch (error) {
            console.error("Error in getOrderById:", error);
            return null;
        }
    }
    async getAllOrders() {
        try {
            return await this.model.findAll({
                include: [
                    {
                        model: ItemDeLaOrden,
                        as: "order_items",
                    },
                ],
            });
        } catch (error) {
            console.error("Error in getAllOrders:", error);
            return null;
        }
    }
    
    
    
    
}


export default new OrderRepository();
