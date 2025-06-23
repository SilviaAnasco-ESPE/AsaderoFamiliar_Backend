import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Branch = sequelize.define('Branch', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [1, 50]
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 200]
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 30]
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    tableName: 'branch',
    timestamps: true, // Agrega createdAt y updatedAt
    hooks: {
      beforeUpdate: (instance) => {
        instance.modification_date = new Date(); // Actualiza la fecha de modificación antes de cada actualización
      }
    },
    indexes: [
      {
        fields: ['name'], // Índice para búsquedas rápidas por nombre
      },
      {
        fields: ['city'], // Índice para búsquedas rápidas por ciudad
        using: 'gin',
        operator: 'gin_trgm_ops'
      }
    ]
  });