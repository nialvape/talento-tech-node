import * as productsService from '../services/products.service.js';

export const getAllProducts = async (req, res) => {
    const products = await productsService.getAll();
    res.json(products);
};

export const getProductById = async (req, res) => {
    const product = await productsService.getById(req.params.id);
    res.json(product);
};

export const createProduct = async (req, res) => {
    const product = await productsService.create(req.body);
    res.status(201).json(product);
};

export const deleteProduct = async (req, res) => {
    await productsService.remove(req.params.id);
    res.json({ message: `Producto ${req.params.id} eliminado` });
};
