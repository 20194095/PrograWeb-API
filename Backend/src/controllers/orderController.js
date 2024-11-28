import orderRepository from "../repositories/orderRepository.js";

const findAll = async (req, res) => {
    try {
        const orders = await orderRepository.getOrdersByUserId(req.user.id);
        return res.status(200).json(orders);
    } catch (error) {
        console.error("Error in findAll:", error);
        return res.status(500).json({ message: "Error retrieving orders." });
    }
};

const findOne = async (req, res) => {
    try {
        const order = await orderRepository.getOrderById(req.user.id, req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found." });

        return res.status(200).json(order);
    } catch (error) {
        console.error("Error in findOne:", error);
        return res.status(500).json({ message: "Error retrieving order." });
    }
};

const create = async (req, res) => {
    const { cartItems, total } = req.body;

    try {
        const order = await orderRepository.createOrder(req.user.id, cartItems, total);
        return res.status(201).json(order);
    } catch (error) {
        console.error("Error in create:", error);
        return res.status(500).json({ message: "Error creating order." });
    }
};

export default { findAll, findOne, create };
