import User from "./user.js";
import Producto from "./Product.js";
import ItemDeCarrito from "./ItemCarrito.js"
import CarritoDeCompra from "./CarritoDeCompra.js"
import Orden from "./orden.js";
import ItemDeLaOrden from "./ItemDeLaOrden.js";

export default function setupAssociations() {
    // Relación entre Usuario y CarritoDeCompra
    User.hasOne(CarritoDeCompra, { foreignKey: "idUsuario" });
    CarritoDeCompra.belongsTo(User, { foreignKey: "idUsuario" });

    // Relación entre Usuario y Orden
    User.hasMany(Orden, { foreignKey: "idUsuario" });
    Orden.belongsTo(User, { foreignKey: "idUsuario" });

    // Relación entre CarritoDeCompra y ItemDeCarrito
    CarritoDeCompra.hasMany(ItemDeCarrito, { foreignKey: "idCarrito" });
    ItemDeCarrito.belongsTo(CarritoDeCompra, { foreignKey: "idCarrito" });

    Producto.hasMany(ItemDeCarrito, { foreignKey: "idProducto", as: "items" });
    ItemDeCarrito.belongsTo(Producto, { foreignKey: "idProducto", as: "product" });
    

    Orden.hasMany(ItemDeLaOrden, { foreignKey: "idOrden", as: "order_items" });
    ItemDeLaOrden.belongsTo(Orden, { foreignKey: "idOrden" });
    


    // Relación entre Producto y ItemDeLaOrden
    Producto.hasMany(ItemDeLaOrden, { foreignKey: "idProducto" });
    ItemDeLaOrden.belongsTo(Producto, { foreignKey: "idProducto" });
}
