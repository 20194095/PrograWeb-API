import User from "./User.js";
import Product from "./Product.js";
import CartItem from "./CartItem.js";
import Order from "./Order.js";
import OrderItem from "./OrderItem.js";


export default function setupAssociations() {
    User.hasMany(CartItem, { foreignKey: "user_id" });
    CartItem.belongsTo(User, { foreignKey: "user_id" });

    User.hasMany(Order, { foreignKey: "user_id" });
    Order.belongsTo(User, { foreignKey: "user_id" });

    Order.hasMany(OrderItem, { foreignKey: "order_id" });
    OrderItem.belongsTo(Order, { foreignKey: "order_id" });

    Product.hasMany(CartItem, { foreignKey: "product_id" });
    CartItem.belongsTo(Product, { foreignKey: "product_id" });

    Product.hasMany(OrderItem, { foreignKey: "product_id" });
    OrderItem.belongsTo(Product, { foreignKey: "product_id" });
}
