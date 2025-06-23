import {
  getAllOrders as _getAllOrders,
  getOrderById as _getOrderById,
  createOrder as _createOrder,
  deleteOrder as _deleteOrder
} from '../services/OrderService.js';

// Obtener todas las órdenes con detalles y productos
const getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const result = await _getAllOrders({
      page: parseInt(page),
      limit: parseInt(limit)
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error al obtener las órdenes:', error);
    res.status(500).json({ message: 'Error al obtener las órdenes', error: error.message });
  }
};

// Obtener una orden por ID con sus detalles
const getOrderById = async (req, res, next) => {
  try {
    const order = await _getOrderById(req.params.id);
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

// Crear una nueva orden
const createOrder = async (req, res, next) => {
  try {
    const order = await _createOrder(req.body);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

// Eliminar una orden
const deleteOrder = async (req, res, next) => {
  try {
    const msg = await _deleteOrder(req.params.id);
    res.status(204).json(msg);
  } catch (err) {
    next(err);
  }
};

export {
  getAllOrders,
  getOrderById,
  createOrder,
  deleteOrder
};
