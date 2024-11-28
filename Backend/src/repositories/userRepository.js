import RepositoryBase from "./RepositoryBase.js";
import User from "../models/User.js";

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
}

export default new UserRepository();
