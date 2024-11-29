import orderRepository from "../repositories/orderRepository.js";

const findAll = async (req, res) => {
    try {
        // Verificar si el usuario es administrador
        if (req.user.tipo === "administrador") {
            const orders = await orderRepository.getAllOrders(); // Obtener todas las órdenes
            return res.status(200).json(orders);
        } else {
            const orders = await orderRepository.getOrdersByUserId(req.user.id); // Solo las órdenes del usuario
            return res.status(200).json(orders);
        }
    } catch (error) {
        console.error("Error in findAll:", error);
        return res.status(500).json({ message: "Error al recuperar las órdenes." });
    }
};


const findOne = async (req, res) => {
    try {
        const order = await orderRepository.getOrderById(req.params.id);
        if (!order) return res.status(404).json({ message: "Orden no encontrada." });

        return res.status(200).json(order);
    } catch (error) {
        console.error("Error in findOne:", error);
        return res.status(500).json({ message: "Error al recuperar la orden." });
    }
};




const create = async (req, res) => {
    const { items, total, subTotal, metodoDeEntrega, nroTarjeta, tipoTarjeta, fecha } = req.body;

    try {
        const order = await orderRepository.createOrder(
            req.user.id,
            items,
            total,
            subTotal,
            metodoDeEntrega,
            nroTarjeta,
            tipoTarjeta,
            fecha
        );
        return res.status(201).json(order);
    } catch (error) {
        console.error("Error en create:", error);
        return res.status(500).json({ message: "Error creando orden." });
    }
};




export default { findAll, findOne, create };
