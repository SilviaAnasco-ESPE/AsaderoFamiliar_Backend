import '../models/index.js';
import { Product } from '../models/Product.js';
import { Category } from '../models/Category.js';

export const getAllProducts = async ({ page, limit, categoryId }) => {
  const offset = (page - 1) * limit;
  const filter = {};

  if (categoryId) filter.categoryId = categoryId;

  const products = await Product.findAll({
    where: filter,
    offset,
    limit: parseInt(limit),
    order: [['createdAt', 'DESC']],
    include: [{ model: Category, as: 'category' }]
  });

  const total = await Product.count({ where: filter });

  return {
    products,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  };
};

export const getProductById = async (id) => {
  const product = await Product.findByPk(id, {
    include: [{ model: Category, as: 'category' }]
  });

  if (!product) throw new Error('Producto no encontrado');
  return product;
};

export const createProduct = async (data) => {
  const category = await Category.findByPk(data.categoryId);
  if (!category) throw new Error('Categoría no encontrada');

  const product = await Product.create(data);
  return product;
};

export const updateProduct = async (id, data) => {
  const product = await Product.findByPk(id);
  if (!product) throw new Error('Producto no encontrado');

  if (data.categoryId && data.categoryId !== product.categoryId) {
    const category = await Category.findByPk(data.categoryId);
    if (!category) throw new Error('Nueva categoría no encontrada');
  }

  await product.update(data);
  return product;
};

export const deleteProduct = async (id) => {
  const deleted = await Product.destroy({ where: { id } });
  if (deleted === 0) throw new Error('Producto no encontrado');
  return { message: 'Producto eliminado correctamente' };
};
