import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const CarritoDeCompra = sequelize.define("CarritoDeCompra", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default CarritoDeCompra;