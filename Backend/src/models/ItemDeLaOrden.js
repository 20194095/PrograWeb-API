import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const ItemDeLaOrden = sequelize.define("ItemDeLaOrden", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idOrden: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idProducto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
});

export default ItemDeLaOrden;