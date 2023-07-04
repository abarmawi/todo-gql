import { Model, DataTypes } from 'sequelize';
import { getDb } from '../db';

export enum TodoStatus {
  Pending = 1,
  Completed = 2,
}

export class TodoModel extends Model {
  declare id: number;
  userId!: number;
  title!: string;
  status!: TodoStatus;
  todoListId?: number;
}

TodoModel.init(
  {
    // Model attributes are defined here
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    todoListId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    status: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: TodoStatus.Pending,
    },
  },
  {
    sequelize: getDb(),
    modelName: 'Todo',
    freezeTableName: true,
    tableName: 'Todo',
  },
);
