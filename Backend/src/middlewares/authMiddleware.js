import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {
        // Obtener el token del encabezado Authorization
        const token = req.headers.authorization?.split(" ")[1]; // Formato esperado: "Bearer <token>"
        if (!token) {
            return res.status(401).json({ message: "Acceso no autorizado. Falta el token." });
        }

        // Verificar el token con la clave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Añadir los datos del usuario al objeto req para su uso en las rutas
        req.user = decoded;

        // Continuar con el siguiente middleware o controlador
        next();
    } catch (error) {
        console.error("Error en authMiddleware:", error);
        return res.status(401).json({ message: "Token inválido o expirado." });
    }
};

export default authMiddleware;
