import {
  getAllCategories as _getAllCategories,
  getCategoryById as _getCategoryById,
  createCategory as _createCategory,
  updateCategory as _updateCategory,
  deleteCategory as _deleteCategory
} from '../services/CategoryService.js';

export const getAllCategories = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const result = await _getAllCategories({ page, limit });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const category = await _getCategoryById(req.params.id);
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const category = await _createCategory(req.body);
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const category = await _updateCategory(req.params.id, req.body);
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const msg = await _deleteCategory(req.params.id);
    res.status(204).json(msg);
  } catch (err) {
    next(err);
  }
};
