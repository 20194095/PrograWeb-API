import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/userRepository.js";

const register = async (req, res) => {
    try {
        const { nombre, apellido, email, password, tipo, direccion, ciudad, telefono } = req.body;

        const existingUser = await UserRepository.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "El correo ya está registrado." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserRepository.create({
            nombre,
            apellido,
            email,
            password: hashedPassword,
            tipo,
            direccion,
            ciudad,
            telefono,
        });
        
        console.log("Usuario creado:", newUser); // Log adicional
        
        

        return res.status(201).json({ message: "Usuario registrado exitosamente.", user: newUser });
    } catch (error) {
        console.error("Error en register:", error);
        return res.status(500).json({ message: "Error al registrar el usuario." });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserRepository.findByEmail(email);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado." });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Contraseña incorrecta." });

        const token = jwt.sign(
            { id: user.id, email: user.email, tipo: user.tipo },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({ message: "Inicio de sesión exitoso.", token });
    } catch (error) {
        console.error("Error en login:", error.message);
        return res.status(500).json({ message: "Error al iniciar sesión." });
    }
};

export default { register, login };

