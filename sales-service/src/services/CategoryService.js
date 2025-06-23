import '../models/index.js';
import { Category } from '../models/Category.js';
import { Product } from '../models/Product.js';

export const getAllCategories = async ({ page, limit }) => {
  const offset = (page - 1) * limit;
  const categories = await Category.findAll({
    offset,
    limit: parseInt(limit),
    order: [['createdAt', 'DESC']],
    include: [{ model: Product, as: 'products' }]
  });

  const total = await Category.count();

  return {
    categories,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  };
};

export const getCategoryById = async (id) => {
  const category = await Category.findByPk(id, {
    include: [{ model: Product, as: 'products' }]
  });

  if (!category) throw new Error('Categoría no encontrada');
  return category;
};

export const createCategory = async (data) => {
  const category = await Category.create(data);
  return category;
};

export const updateCategory = async (id, data) => {
  const category = await Category.findByPk(id);
  if (!category) throw new Error('Categoría no encontrada');

  await category.update(data);
  return category;
};

export const deleteCategory = async (id) => {
  const deleted = await Category.destroy({ where: { id } });
  if (deleted === 0) throw new Error('Categoría no encontrada');
  return { message: 'Categoría eliminada correctamente' };
};
