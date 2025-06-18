import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Customer = sequelize.define('Customer', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    documentNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Asegura que no haya cédulas duplicadas
        validate: {
            notEmpty: true,
            len: [1, 10] // Ajusta la longitud según el formato de la cédula
        }
    },
    names: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 100]
      }
    },
    lastnames: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 100]
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
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true, // Permitir nulos si es opcional
        validate: {
            is: /^[0-9]{10}$/, // Validación para asegurar que solo contenga 10 dígitos numéricos
        } 
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Asegura que no haya correos duplicados
        validate: {
          notEmpty: true,
          isEmail: true, // Valida que el formato sea un correo electrónico
          len: [5, 100] // Longitud mínima y máxima del correo
        }
    }
  }, {
    tableName: 'customer',
    timestamps: true, // Agrega createdAt y updatedAt
    indexes: [
      {
        fields: ['documentNumber'] // Índice para búsquedas rápidas por cédula
      },
      {
        fields: ['email'], // Índice para búsquedas rápidas por email
        using: 'gin',
        operator: 'gin_trgm_ops'
      },
      {
        fields: ['phoneNumber'] // Índice para búsquedas por teléfono
      },
      {
        fields: ['names', 'lastnames'], // Índice compuesto para búsquedas por nombre completo
        using: 'gin',
        operator: 'gin_trgm_ops'
      }
    ]
  });