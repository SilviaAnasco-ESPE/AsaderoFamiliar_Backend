import '../models/index.js';
import { Order } from '../models/Order.js';
import { OrderDetail } from '../models/OrderDetails.js';
import { Product } from '../models/Product.js';


// Obtener todas las órdenes con detalles y productos
export const getAllOrders = async ({ page, limit }) => {
  try {
    const skip = (page - 1) * limit;

    const orders = await Order.findAll({
      offset: skip,
      limit: parseInt(limit),
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: OrderDetail,
          as: 'orderDetails',
          include: [
            {
              model: Product,
              as: 'product'
            }
          ]
        }
      ]
    });

    const total = await Order.count();

    return {
      orders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    };
  } catch (error) {
    console.error('Error al obtener las órdenes:', error);
    throw error;
  }
};

// Obtener una orden por ID con detalles
export const getOrderById = async (id) => {
  const order = await Order.findByPk(id, {
    include: [
      {
        model: OrderDetail,
        as: 'orderDetails',
        include: [{ model: Product, as: 'product' }]
      }
    ]
  });

  if (!order) {
    throw new Error('Orden no encontrada');
  }

  return order;
};

// Crear una nueva orden con sus detalles
export const createOrder = async ({ customerId, items }) => {
  /*
    items = [
      { productId: 'uuid', quantity: 2 },
      { productId: 'uuid2', quantity: 1 }
    ]
  */

  if (!items || items.length === 0) {
    throw new Error('No se proporcionaron productos en la orden');
  }

  // Calcular el total y verificar productos
  let total = 0.0;
  const orderDetailsData = [];

  for (const item of items) {
    const product = await Product.findByPk(item.productId);
    if (!product) throw new Error(`Producto no encontrado: ${item.productId}`);

    const unitPrice = parseFloat(product.price);
    const subtotal = unitPrice * item.quantity;
    total += subtotal;

    orderDetailsData.push({
      productId: product.id,
      quantity: item.quantity,
      unitPrice
    });
  }

  // Crear orden
  const newOrder = await Order.create({
    total,
    customerId
  });

  // Crear detalles
  for (const detail of orderDetailsData) {
    await OrderDetail.create({
      orderId: newOrder.id,
      ...detail
    });
  }

  return newOrder;
};

// Eliminar una orden
export const deleteOrder = async (id) => {
  const deleted = await Order.destroy({ where: { id } });

  if (deleted === 0) {
    throw new Error('Orden no encontrada');
  }

  return { message: 'Orden eliminada correctamente' };
};
