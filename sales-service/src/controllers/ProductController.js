import {
  getAllProducts as _getAllProducts,
  getProductById as _getProductById,
  createProduct as _createProduct,
  updateProduct as _updateProduct,
  deleteProduct as _deleteProduct
} from '../services/ProductService.js';

export const getAllProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, categoryId } = req.query;
    const result = await _getAllProducts({ page, limit, categoryId });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await _getProductById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const product = await _createProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const product = await _updateProduct(req.params.id, req.body);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const msg = await _deleteProduct(req.params.id);
    res.status(204).json(msg);
  } catch (err) {
    next(err);
  }
};
