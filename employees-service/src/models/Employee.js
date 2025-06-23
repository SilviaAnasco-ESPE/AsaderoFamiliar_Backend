import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { Branch } from './Branch.js';

export const Employee = sequelize.define('Employee', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    documentNumber: {
        type: DataTypes.STRING, // Cambia a INTEGER si la cédula es solo numérica
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
        allowNull: true, // Permitir nulos si es necesario
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
      },
    role: {
      type: DataTypes.ENUM('administrador', 'supervisor', 'empleado'),
      allowNull: false
    },
    charge: {
        type: DataTypes.ENUM('cocinero', 'ayudante de cocina', 'mesero', 'parrillero'),
        allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    firebaseUid: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10, 100] // Ajusta la longitud mínima y máxima según tus necesidades
      }
    },
    branchId: {
        type: DataTypes.UUID,
        references: {
          model: Branch, // Relación con el modelo Branch
          key: 'id'
        },
        allowNull: false
      },
  }, {
    tableName: 'employee',
    timestamps: true, // Agrega createdAt y updatedAt
    indexes: [
      {
        fields: ['branchId'],
        using: 'btree' // Índice para optimizar consultas por branchId
      },
      {
        fields: ['role']
      },
      {
        fields: ['firebaseUid'] // Índice para búsquedas rápidas por cuid
      },
      {
        fields: ['email'], // Índice para búsquedas rápidas por email
        using: 'gin',
        operator: 'gin_trgm_ops'
      },
      {
        fields: ['branchId', 'isActive'], // Índice compuesto para optimizar consultas por branchId y role
      },
      {
        fields: ['names', 'lastnames'], // Índice compuesto para optimizar consultas por branchId y role
        using: 'gin',
        operator: 'gin_trgm_ops'
    }
    ]
  });