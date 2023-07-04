import { Model, DataTypes } from 'sequelize';
import { getDb } from '../db';
import { TodoModel } from './todo';

export class TodoListModel extends Model {
  declare id: number;
  userId!: number;
  title!: string;
  todos!: Array<TodoModel>;
  getTodos!: () => Array<TodoModel>;
}

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
    tableName: 'TodoList',
  },
);

TodoListModel.hasMany(TodoModel, {
  foreignKey: 'todoListId',
});
