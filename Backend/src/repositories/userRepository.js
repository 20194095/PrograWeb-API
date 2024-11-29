import RepositoryBase from "./RepositoryBase.js";
import User from "../models/user.js";

class UserRepository extends RepositoryBase {
    constructor() {
        super(User);
    }

    // Buscar un usuario por email
    async findByEmail(email) {
        try {
            return await this.model.findOne({ where: { email } });
        } catch (error) {
            console.error("Error in findByEmail:", error);
            return null;
        }
    }

    // Actualizar información del usuario
    async updateUser(id, updates) {
        try {
            await this.model.update(updates, { where: { id } });
            return await this.findById(id);
        } catch (error) {
            console.error("Error in updateUser:", error);
            return null;
        }
    }
}


export default new UserRepository();
