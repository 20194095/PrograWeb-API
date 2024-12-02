import Sequelize from "sequelize";

const hostname = 'prograulima.postgres.database.azure.com';
const username = 'administrador';
const password = 'Pwwp4296';
const database = 'Coolbox';
const port = 5432;
const dialect = 'postgres';

const sequelize = new Sequelize(database, username, password, {
    host: hostname,
    port: port,
    dialect: dialect,
    dialectOptions: {
        ssl: {
            require: true, // Obliga a usar SSL
            rejectUnauthorized: false // Ignora certificados autofirmados
        }
    },
    logging: console.log, // Opcional: para ver las consultas SQL en la consola
});

export default sequelize;
