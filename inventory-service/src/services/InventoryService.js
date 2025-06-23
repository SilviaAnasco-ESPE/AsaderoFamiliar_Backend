import { Op, Sequelize } from 'sequelize';
import { Inventory } from '../models/Inventory.js';

export const createInventoryItem = async (data) => {
   // Validar datos únicos
    const existingInventoryItem = await Inventory.findOne({
      where: { name: data.name }});
  
    if (existingInventoryItem) throw new Error('Item con este nombre ya existe');
      
    const inventoryItem = new Inventory(data);
    await inventoryItem.save();
    return inventoryItem;
};

export const getAllInventory = async ({page, limit}) => {
  try {
      const skip = (page - 1) * limit;
  
      const inventory = await Inventory.findAll({
        offset: skip,
        limit: parseInt(limit),
        order: [['createdAt', 'DESC']]
      });
  
      const total = await Inventory.count();
  
      return {
        inventory: inventory,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      console.error('Error al obtener el inventario:', error);
      throw error;
    }
};

export const getInventoryItemById = async (id) => {
    const inventoryItem = await Inventory.findByPk(id);
    if (!inventoryItem) {
        throw new Error('Inventario no encontrado');
    }
    return inventoryItem;
};

export const updateInventoryItem = async (id, data) => {
  const inventoryItem = await Inventory.findByPk(id);
    if (!inventoryItem) {
        throw new Error('Inventario no encontrado');
    }

    // Validar datos únicos
    if(data.name && data.name !== inventoryItem.name) {
      const existingInventoryItem = await Inventory.findOne({
        where: { name: data.name }
      });
  
      if (existingInventoryItem) throw new Error('Item con este nombre ya existe');
    }

  return await inventoryItem.update(data);
};

export const deleteInventoryItem = async (id) => {
  const material = await Inventory.findByPk(id);
  if (!material) throw new Error('Item de inventario no encontrado');
  await material.destroy();
};

export const getLowStockMaterials = async () => {
  return await Inventory.findAll({
    where: {
      quantity: { [Op.lte]: Sequelize.col('minThreshold') }
    }
  });
};
