import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/userRepository.js";

const register = async (req, res) => {
    try {
        const { nombre, email, password, tipo } = req.body;

        // Validar si el correo ya existe
        const existingUser = await UserRepository.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "El correo ya está registrado." });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el nuevo usuario
        const newUser = await UserRepository.create({
            nombre,
            email,
            password: hashedPassword,
            tipo,
        });

        return res.status(201).json({ message: "Usuario registrado exitosamente.", user: newUser });
    } catch (error) {
        console.error("Error en register:", error);
        return res.status(500).json({ message: "Error al registrar el usuario." });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("Intentando login con email:", email);

        // Buscar usuario por email
        const user = await UserRepository.findByEmail(email);
        if (!user) {
            console.log("Usuario no encontrado");
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        console.log("Usuario encontrado:", user);

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log("Contraseña incorrecta");
            return res.status(401).json({ message: "Contraseña incorrecta." });
        }

        console.log("Generando token...");

        // Verificar que JWT_SECRET esté definido
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET no está configurado en las variables de entorno");
        }

        // Generar el token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, tipo: user.tipo },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        console.log("Token generado:", token);

        return res.status(200).json({ message: "Inicio de sesión exitoso.", token });
    } catch (error) {
        console.error("Error en login:", error.message);
        return res.status(500).json({ message: "Error al iniciar sesión." });
    }
};

export default { register, login };
