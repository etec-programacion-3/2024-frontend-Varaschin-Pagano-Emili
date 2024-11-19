import { Router } from 'express';
import { productoController } from '../controllers/producto.controller';

const router = Router();

router.get('/productos', productoController.getAll);
router.post('/productos', productoController.create);

export default router; 