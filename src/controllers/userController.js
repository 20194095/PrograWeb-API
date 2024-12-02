import userRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt";

const getMe = async (req, res) => {
    try {
        const user = await userRepository.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found." });
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error in getMe:", error);
        return res.status(500).json({ message: "Error retrieving user info." });
    }
};

const updateMe = async (req, res) => {
    const { nombre, apellido, email, password, direccion, ciudad, telefono } = req.body;

    try {
        const updates = { nombre, apellido, email, direccion, ciudad, telefono };
        if (password) updates.password = await bcrypt.hash(password, 10);

        const updatedUser = await userRepository.update(req.user.id, updates);
        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error in updateMe:", error);
        return res.status(500).json({ message: "Error actualizando usuario." });
    }
};


const deleteMe = async (req, res) => {
    try {
        await userRepository.delete(req.user.id);
        return res.status(204).send();
    } catch (error) {
        console.error("Error in deleteMe:", error);
        return res.status(500).json({ message: "Error deleting user." });
    }
};

export default { getMe, updateMe, deleteMe };
