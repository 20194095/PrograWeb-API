import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository.js";

class AuthController {
    async register(req, res) {
        const { nombre, email, password, tipo } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await userRepository.create({
                nombre,
                email,
                password: hashedPassword,
                tipo,
            });
            res.status(201).json(user);
        } catch (error) {
            console.error("Error in register:", error);
            res.status(500).json({ error: "Failed to register user" });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await userRepository.findByEmail(email);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: "Invalid credentials" });
            }
            const token = jwt.sign({ id: user.id, tipo: user.tipo }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });
            res.json({ token });
        } catch (error) {
            console.error("Error in login:", error);
            res.status(500).json({ error: "Failed to log in" });
        }
    }
}

export default new AuthController();
