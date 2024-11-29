import RepositoryBase from "./RepositoryBase.js";
import Product from "../models/Product.js";
import { Op } from "sequelize";

class ProductRepository extends RepositoryBase {
    constructor() {
        super(Product);
    }

    // Filtrar productos por nombre
    async findByName(name) {
        try {
            return await this.model.findAll({
                where: {
                    nombre: { [Op.like]: `%${name}%` },
                },
            });
        } catch (error) {
            console.error("Error in findByName:", error);
            return null;
        }
    }
}


export default new ProductRepository();
