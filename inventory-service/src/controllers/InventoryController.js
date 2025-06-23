import * as service from '../services/InventoryService.js';

export const create = async (req, res) => {
  try {
    const material = await service.createInventoryItem(req.body);
    res.status(201).json(material);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const materials = await service.getAllInventory({
        page: parseInt(page),
        limit: parseInt(limit)
    });
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const material = await service.getInventoryItemById(req.params.id);
    if (!material) return res.status(404).json({ message: 'No encontrado' });
    res.json(material);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const updated = await service.updateInventoryItem(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    await service.deleteInventoryItem(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLowStock = async (req, res) => {
  try {
    const lowStock = await service.getLowStockMaterials();
    res.json(lowStock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
