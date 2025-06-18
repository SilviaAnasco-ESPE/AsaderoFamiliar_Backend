import {Branch} from '../models/Branch.js';
import {Employee} from '../models/Employee.js';

export const getAllBranches = async ({page, limit, city, isActive}) => {
  try {
    const skip = (page - 1) * limit;
    let filter = {};

    if (city) {
        filter.city = city;
    }
    if (isActive !== undefined) {
        filter.isActive = isActive;
    }

    const branches = await Branch.findAll({
        where: filter,             // Filtros
        offset: skip,              // Saltar registros
        limit: parseInt(limit),    // Límite de resultados
        order: [['createdAt', 'DESC']] // Ordenar por fecha descendente
      });

    const total = await Branch.count({ where: filter });
  
    return {
        branches: branches, // Devolver la lista de sucursales
        pagination: {
        page: parseInt(page), // Número de la página actual
        limit: parseInt(limit), // Límite de registros por página
        total, // Total de registros que coinciden con el filtro
        pages: Math.ceil(total / limit) // Total de páginas
        }
    }
  } catch (error) {
    console.error('Error fetching branches:', error);
    throw error;
  }
};

export const getBranchById = async (id) => {
    const branch = await Branch.findByPk(id);
    if (!branch) {
      throw new Error('Sucursal no encontrada');
    }
    return branch;
};
  
export const createBranch = async (branchData) => {
console.log('branchData', branchData);
    // Validar datos únicos
    const existingBranch = await Branch.findOne({
        where: { name: branchData.body.name }});

    if (existingBranch) throw new Error('Sucursal con este nombre ya existe');
    
    const branch = new Branch(branchData.body);
    await branch.save();
    return branch;
};

export const updateBranch = async (id, updateData) => {
    // Buscar al empleado actual
    const branch = await Branch.findByPk(id);
    if (!branch) {
      throw new Error('Sucursal no encontrada');
    }
  
    // Validar cambios únicos SOLO si el valor cambia
    if (
      updateData.body.name &&
      updateData.body.name !== branch.name
    ) {
      const exists = await Branch.findOne({
        where: { name: updateData.body.name }
      });
      if (exists) throw new Error('Sucursal con este nombre ya existe');
    }
  
    // Realiza la actualización
    await branch.update(updateData.body);
  
    // Devuelve el empleado actualizado
    return branch;
  };
  
export const deleteBranch = async (id) => {
    // Verifica si existen empleados asignados a la sucursal
    const employeesCount = await Employee.count({
        where: { branchId: id }
    });

    if (employeesCount > 0) {
        throw new Error('No se puede eliminar la sucursal porque tiene empleados asociados');
    }

    const deleted = await Branch.destroy({
      where: { id }
    });
    
    if (deleted === 0) {
      throw new Error('Sucursal no encontrada');
    }
    
    return { message: 'Sucursal eliminada' };
};
  