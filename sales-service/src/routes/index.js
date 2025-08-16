import express from 'express';

import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/CategoryController.js';

import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/ProductController.js';

import {
  getAllOrders,
  getOrderById,
  createOrder,
  deleteOrder,
  generateSalesReport
} from '../controllers/OrderController.js';

const router = express.Router();

// 🔎 Health check
router.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'asadero-api' });
});

// 📂 Category routes
router.get('/categories', getAllCategories);
router.get('/categories/:id', getCategoryById);
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

// 🍗 Product routes
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// 🧾 Order routes
router.get('/orders', getAllOrders);
router.get('/orders/:id', getOrderById);
router.post('/orders', createOrder);
router.delete('/orders/:id', deleteOrder); // opcional: agregar updateOrder si manejas estados

//Report
router.get('/reports/pdf', generateSalesReport);

export default router;
