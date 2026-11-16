import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct
} from '../controllers/products.controller.js';

const router = Router();

// Todas las rutas de productos requieren un Bearer token válido
router.use(authenticate);

router.get('/', getAllProducts);
router.post('/create', createProduct);
router.get('/:id', getProductById);
router.delete('/:id', deleteProduct);

export default router;
