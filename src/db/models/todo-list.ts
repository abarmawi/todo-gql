import { Model, DataTypes } from 'sequelize';
import { getDb } from '../db';
import { TodoModel } from './todo';

export class TodoListModel extends Model {}

TodoListModel.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize: getDb(),
    modelName: 'TodoList',
    freezeTableName: true,
  },
);

TodoListModel.hasMany(TodoModel, {});
