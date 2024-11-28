const adminMiddleware = (req, res, next) => {
    try {
        // Asegúrate de que el usuario esté autenticado y que el tipo sea "administrador"
        if (req.user && req.user.tipo === "administrador") {
            next(); // Continúa con la siguiente función
        } else {
            res.status(403).json({ message: "Acceso denegado: Solo administradores pueden realizar esta acción." });
        }
    } catch (error) {
        console.error("Error en adminMiddleware:", error);
        res.status(500).json({ message: "Error en la validación de administrador." });
    }
};

export default adminMiddleware;
