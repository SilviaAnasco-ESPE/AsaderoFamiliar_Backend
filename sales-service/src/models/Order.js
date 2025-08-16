import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 0 // Asegura que el total no sea negativo
      }
    },
    customerId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    employeeId: {
      type: DataTypes.UUID,
      allowNull: false
    },
  }, {
    tableName: 'order',
    timestamps: true, // Agrega createdAt y updatedAt
    indexes: [
      {
        fields: ['customerId']
      }
    ]
  });