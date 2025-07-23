import { DataTypes } from 'sequelize';
import { sequelize } from '../db';

export const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  is_completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'task',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});
