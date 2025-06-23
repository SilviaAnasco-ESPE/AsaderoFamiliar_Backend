import {Employee} from '../models/Employee.js';
import {Branch} from '../models/Branch.js';

export const getAllEmployees = async ({page, limit, role, branch, isActive}) => {
  try {
    const skip = (page - 1) * limit;
    let filter = {};

    if (role) {
        filter.role = role;
    }
    if (branch) {
        filter.branch = branch;
    }
    if (isActive !== undefined) {
        filter.isActive = isActive;
    }

    const employees = await Employee.findAll({
        where: filter,             // Filtros
        offset: skip,              // Saltar registros
        limit: parseInt(limit),    // Límite de resultados
        order: [['createdAt', 'DESC']] // Ordenar por fecha descendente
      });

    const total = await Employee.count({ where: filter });
  
    return {
        employees, // Devolver la lista de empleados
        pagination: {
        page: parseInt(page), // Número de la página actual
        limit: parseInt(limit), // Límite de registros por página
        total, // Total de registros que coinciden con el filtro
        pages: Math.ceil(total / limit) // Total de páginas
        }
    }
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

export const getEmployeeById = async (id) => {
    const empleado = await Employee.findByPk(id);
    if (!empleado) {
      throw new Error('Empleado no encontrado');
    }
    return empleado;
};
  
export const createEmployee = async (employeeData) => {
    // Validar que la branchId exista
    const branch = await Branch.findByPk(employeeData.branchId);
    console.log('branch', branch);

    if (!branch) throw new Error('Sucursal no encontrada');

    // Validar datos únicos
    const existingEmployee = await Employee.findOne({
        $or: [
            { documentNumber: employeeData.documentNumber },
            { email: employeeData.email },
            { firebaseUid: employeeData.firebaseUid }
        ]
    });

    if (existingEmployee) {
        // Determinar cuál campo ya existe y lanzar un error específico
        if (existingEmployee.documentNumber === employeeData.documentNumber) throw new Error('Empleado con esta cédula ya existe');
        if (existingEmployee.email === employeeData.email) throw new Error('Empleado con este correo ya existe');
        if (existingEmployee.firebaseUid === employeeData.firebaseUid) throw new Error('Empleado con este UID ya existe');
    }
    
    const employee = new Employee(employeeData);

    console.log('employee', employee);

    await employee.save();
    return employee;
};

export const updateEmployee = async (id, updateData) => {
    // Buscar al empleado actual
    const employee = await Employee.findByPk(id);
    if (!employee) {
      throw new Error('Empleado no encontrado');
    }
  
    // Validar existencia de la sucursal si se proporciona branchId
    if (updateData.branchId && updateData.branchId !== employee.branchId) {
      const branch = await Branch.findByPk(updateData.branchId);
      if (!branch) {
        throw new Error('Sucursal no encontrada');
      }
    }
  
    // Validar cambios únicos SOLO si el valor cambia
    if (
      updateData.documentNumber &&
      updateData.documentNumber !== employee.documentNumber
    ) {
      const exists = await Employee.findOne({
        where: { documentNumber: updateData.documentNumber }
      });
      if (exists) throw new Error('Empleado con este número de documento ya existe');
    }
  
    if (updateData.email && updateData.email !== employee.email) {
      const exists = await Employee.findOne({
        where: { email: updateData.email }
      });
      if (exists) throw new Error('Empleado con este correo ya existe');
    }
  
    if (updateData.firebaseUid && updateData.firebaseUid !== employee.firebaseUid) {
      const exists = await Employee.findOne({
        where: { firebaseUid: updateData.firebaseUid }
      });
      if (exists) throw new Error('Empleado con este UID ya existe');
    }
  
    // Realiza la actualización
    await employee.update(updateData);
  
    // Devuelve el empleado actualizado
    return employee;
  };
  
export const deleteEmployee = async (id) => {
    const deleted = await Employee.destroy({
      where: { id }
    });
    
    if (deleted === 0) {
      throw new Error('Empleado no encontrado');
    }
    
    return { message: 'Empleado eliminado' };
  };
  