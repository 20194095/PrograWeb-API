import productRepository from "../repositories/productRepository.js";

const findAll = async (req, res) => {
    const { nombre } = req.query;

    try {
        const products = nombre
            ? await productRepository.findByName(nombre)
            : await productRepository.findAll();
        return res.status(200).json(products);
    } catch (error) {
        console.error("Error in findAll:", error);
        return res.status(500).json({ message: "Error retrieving products." });
    }
};

const findOne = async (req, res) => {
    try {
        const product = await productRepository.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found." });

        return res.status(200).json(product);
    } catch (error) {
        console.error("Error in findOne:", error);
        return res.status(500).json({ message: "Error retrieving product." });
    }
};

const create = async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock, marca } = req.body; // Agregado `marca`
        const product = await productRepository.create({ nombre, descripcion, precio, stock, marca });
        return res.status(201).json(product);
    } catch (error) {
        console.error("Error en create:", error);
        return res.status(500).json({ message: "Error creando producto." });
    }
};


const update = async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock, marca } = req.body; // Agregado `marca`
        const updatedProduct = await productRepository.update(req.params.id, { nombre, descripcion, precio, stock, marca });
        return res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Error en update:", error);
        return res.status(500).json({ message: "Error actualizando producto." });
    }
};


const remove = async (req, res) => {
    try {
        await productRepository.delete(req.params.id);
        return res.status(204).send();
    } catch (error) {
        console.error("Error in remove:", error);
        return res.status(500).json({ message: "Error deleting product." });
    }
};

export default { findAll, findOne, create, update, remove };
