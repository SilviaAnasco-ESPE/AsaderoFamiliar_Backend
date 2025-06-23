import { DataTypes } from 'sequelize';
import {sequelize} from '../config/database.js';

export const Inventory = sequelize.define('Inventory', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantity: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  minThreshold: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'inventory',
  timestamps: true
});
