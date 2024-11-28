import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.ENUM("cliente", "administrador"),
        allowNull: false,
        defaultValue: "cliente",
    },
});

export default User;
