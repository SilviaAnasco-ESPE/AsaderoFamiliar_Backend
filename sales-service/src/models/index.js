import { Product } from './Product.js';
import { Category } from './Category.js';
import { OrderDetail} from './OrderDetails.js';
import { Order } from './Order.js';

// Relación: Un Category tiene muchos Products
Category.hasMany(Product, {
  foreignKey: 'categoryId',
  as: 'products'
});

// Relación: Un Product pertenece a un Category
Product.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category'
});

Product.hasMany(OrderDetail, {
  foreignKey: 'productId',
  as: 'orderDetails'
});

OrderDetail.belongsTo(Product, {
  foreignKey: 'productId',  
  as: 'product'
});

Order.hasMany(OrderDetail, {
  foreignKey: 'orderId',
    as: 'orderDetails' 
});

OrderDetail.belongsTo(Order, {
  foreignKey: 'orderId',
  as: 'order'
});