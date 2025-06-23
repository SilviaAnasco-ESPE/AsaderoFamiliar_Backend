import express from 'express';
import * as controller from '../controllers/InventoryController.js';

const router = express.Router();

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'inventory-service' });
});

router.post('/inventory', controller.create);
router.get('/inventory', controller.getAll);
router.get('/low-stock', controller.getLowStock);
router.get('/inventory/:id', controller.getById);
router.put('/inventory/:id', controller.update);
router.delete('/inventory/:id', controller.remove);

export default router;
