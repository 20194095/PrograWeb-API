class RepositoryBase {
    constructor(model) {
        this.model = model;
    }

    // Listar todos los registros
    async findAll(options = {}) {
        try {
            return await this.model.findAll(options);
        } catch (error) {
            console.error("Error in findAll:", error);
            return null;
        }
    }

    // Crear un nuevo registro
    async create(entity) {
        try {
            console.log("Datos recibidos para creación:", entity); // Log de entrada
            const result = await this.model.create(entity);
            console.log("Resultado de la creación:", result); // Log de salida
            return result;
        } catch (error) {
            console.error("Error in create:", error);
            return null;
        }
    }
    

    // Buscar un registro por ID
    async findById(id) {
        try {
            return await this.model.findByPk(id);
        } catch (error) {
            console.error("Error in findById:", error);
            return null;
        }
    }

    // Actualizar un registro por ID
    async update(id, updates) {
        try {
            await this.model.update(updates, { where: { id } });
            return await this.findById(id);
        } catch (error) {
            console.error("Error in update:", error);
            return null;
        }
    }

    // Eliminar un registro por ID
    async delete(id) {
        try {
            return await this.model.destroy({ where: { id } });
        } catch (error) {
            console.error("Error in delete:", error);
            return null;
        }
    }
}

export default RepositoryBase;
