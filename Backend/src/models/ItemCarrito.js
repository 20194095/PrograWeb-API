import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const ItemDeCarrito = sequelize.define("ItemDeCarrito", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idCarrito: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idProducto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default ItemDeCarrito;