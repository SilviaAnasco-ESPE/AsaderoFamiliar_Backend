import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const OrderDetail = sequelize.define('OrderDetails', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    orderId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    productId:{
        type: DataTypes.UUID,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            min: 1 // Asegura que la cantidad sea al menos 1
        }
    },
    unitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 0 // Asegura que el total no sea negativo
      }
    }
  }, {
    tableName: 'orderDetail',
    timestamps: true, // Agrega createdAt y updatedAt
    indexes: [
      {
        fields: ['orderId']
      },
      {
        fields: ['productId']
      }
    ]
  });