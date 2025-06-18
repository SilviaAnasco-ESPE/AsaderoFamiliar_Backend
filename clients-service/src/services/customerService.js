import {Customer} from '../models/Customer.js';

export const getAllCustomers = async ({page, limit}) => {
  try {
    const skip = (page - 1) * limit;
    let filter = {};

    const customers = await Customer.findAll({
        where: filter,             // Filtros
        offset: skip,              // Saltar registros
        limit: parseInt(limit),    // Límite de resultados
        order: [['createdAt', 'DESC']] // Ordenar por fecha descendente
      });

    const total = await Customer.count({ where: filter });
  
    return {
        customers: customers, // Devolver la lista de empleados
        pagination: {
        page: parseInt(page), // Número de la página actual
        limit: parseInt(limit), // Límite de registros por página
        total, // Total de registros que coinciden con el filtro
        pages: Math.ceil(total / limit) // Total de páginas
        }
    }
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

export const getCustomerById = async (id) => {
    const customer = await Customer.findOne({
      where: { id: id }
    });
    if (!customer) {
      throw new Error('Cliente no encontrado');
    }
    return customer;
};
  
export const createCustomer = async (customerData) => {
    // Validar datos únicos
    const existingCustomer = await Customer.findOne({
        where: { email: customerData.email }
      });
    if (existingCustomer) throw new Error('Cliente con este email ya existe');
    
    const customer = new Customer(customerData);
    await customer.save();
    return customer;
};

export const updateCustomer = async (id, updateData) => {
    // Buscar al cliente actual
    const customer = await Customer.findByPk(id);
    if (!customer) {
      throw new Error('Cliente no encontrado');
    }
  
    // Validar cambios únicos SOLO si el valor cambia
    if (updateData.email && updateData.email !== customer.email) {
      const exists = await Customer.findOne({
        where: { email: updateData.email }
      });
      if (exists) throw new Error('Cliente con este correo ya existe');
    }
  
    // Realiza la actualización
    await customer.update(updateData);
  
    // Devuelve el empleado actualizado
    return customer;
  };
  
export const deleteCustomer = async (id) => {
    const deleted = await Customer.destroy({
      where: { id }
    });
    
    if (deleted === 0) {
      throw new Error('Cliente no encontrado');
    }
    
    return { message: 'Cliente eliminado' };
  };
  