import app from './app.js';
import sequelize from './src/config/database.js';
import setupAssociations from "./src/models/associations.js"; // Importar relaciones

async function main() {
    try {
        const init = process.argv[2];

        // Definir relaciones entre modelos
        setupAssociations(); // Ahora las relaciones se registran aquí

        if (init) {
            await sequelize.sync({ force: true }); // Forzar recreación de tablas
        } else {
            await sequelize.sync({ force: false }); // Solo sincronizar tablas
        }

        console.log('Database synchronized');

        app.listen(4001, () => {
            console.log('Server is running on port 4001');
        });
    } catch (error) {
        console.error(error);
    }
}

main();
