import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Category = sequelize.define('Category', {
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
  }, {
    tableName: 'category',
    timestamps: true, // Agrega createdAt y updatedAt
    indexes: [
      {
        fields: ['name'], // Índice compuesto para optimizar consultas por name
        using: 'gin',
        operator: 'gin_trgm_ops'
      }
    ]
  });