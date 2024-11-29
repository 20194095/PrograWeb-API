import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Orden = sequelize.define("Orden", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    subTotal: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    metodoDeEntrega: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    nroTarjeta: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    tipoTarjeta: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

export default Orden;