import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { Category} from './Category.js';

export const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 50]
      }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 100]
        }
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0
      }
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false
    },
  }, {
    tableName: 'product',
    timestamps: true, // Agrega createdAt y updatedAt
    indexes: [
      {
        fields: ['categoryId'],
        using: 'btree' // Índice para optimizar consultas por categoryId
      },
      {
        fields: ['name'], // Índice compuesto para optimizar consultas por name
        using: 'gin',
        operator: 'gin_trgm_ops'
      }
    ]
  });