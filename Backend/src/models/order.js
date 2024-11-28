import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Order = sequelize.define("Order", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
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
    estado: {
        type: DataTypes.ENUM("pendiente", "pagado", "enviado", "entregado"),
        allowNull: false,
        defaultValue: "pendiente",
    },
});

export default Order;
