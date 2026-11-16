import * as Product from '../models/product.model.js';
import { HttpError } from '../config/errors.js';

export const getAll = () => Product.getAllProducts();

export const getById = async (id) => {
    const product = await Product.getProductById(id);
    if (!product) throw new HttpError(404, `No existe un producto con id "${id}"`);
    return product;
};

export const create = async ({ title, price, category } = {}) => {
    if (typeof title !== 'string' || !title.trim()) {
        throw new HttpError(400, 'El campo "title" es obligatorio');
    }
    if (typeof category !== 'string' || !category.trim()) {
        throw new HttpError(400, 'El campo "category" es obligatorio');
    }
    const numericPrice = Number(price);
    if (price === undefined || price === null || price === '' || Number.isNaN(numericPrice) || numericPrice < 0) {
        throw new HttpError(400, 'El campo "price" debe ser un número mayor o igual a 0');
    }
    return Product.createProduct({ title: title.trim(), price: numericPrice, category: category.trim() });
};

export const remove = async (id) => {
    const deleted = await Product.deleteProduct(id);
    if (!deleted) throw new HttpError(404, `No existe un producto con id "${id}"`);
};
