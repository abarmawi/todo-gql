import { TodoModel, TodoStatus } from '../db/models/todo';
import { TodoListModel } from '../db/models/todo-list';
import { TodoExternalService } from './todo-external-service';

export class TodoHandler {
  private static _todoHandler: TodoHandler;

  public static get instance(): TodoHandler {
    if (this._todoHandler) {
      return this._todoHandler;
    }

    this._todoHandler = new TodoHandler(TodoExternalService.instance);
    return this._todoHandler;
  }

  constructor(private todoExternalService: TodoExternalService) {}

  async createTodo(userId: number, title: string, todoListId?: number | null, todoListName?: string | null) {
    const _todoListId = await this.getTodoListId(userId, todoListId, todoListName);

    const transaction = await TodoModel.sequelize!.transaction();

    const todo = await TodoModel.create(
      {
        userId,
        title,
        todoListId: _todoListId,
      },
      {
        transaction,
      },
    );

    try {
      const externalServiceId = await this.todoExternalService.create(todo);

      todo.externalServiceId = externalServiceId;
      todo.save();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('An error occurred while creating/syncing a todo', error);
      await transaction.rollback();

      throw error;
    }

    await transaction.commit();
    return todo;
  }

  async createTodoList(userId: number, title: string) {
    const todoList = await TodoListModel.create({
      userId,
      title,
    });

    return todoList;
  }

  async updateTodo(userId: number, todoId: number, status?: TodoStatus | null, title?: string | null) {
    const values: { [key: string]: unknown } = {};
    if (status) {
      values['status'] = status;
    }
    if (title) {
      values['title'] = title;
    }

    const transaction = await TodoModel.sequelize!.transaction();

    const todo = await TodoModel.update(values, {
      where: {
        userId,
        id: todoId,
      },
      returning: true,
      transaction,
    });

    if (!todo[0]) {
      throw new Error('No affected rows');
    }

    try {
      await this.todoExternalService.update(todo[1][0]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('An error occurred while updating/syncing a todo', error);
      await transaction.rollback();

      throw error;
    }

    await transaction.commit();
    return todo[1][0];
  }

  async updateTodoList(userId: number, todoListId: number, title?: string | null) {
    const values: { [key: string]: unknown } = {};
    if (title) {
      values['title'] = title;
    }
    const todoList = await TodoListModel.update(values, {
      where: {
        userId,
        id: todoListId,
      },
      returning: true,
    });

    if (!todoList[0]) {
      throw new Error('No affected rows');
    }
    return todoList[1][0];
  }

  async findTodos(
    whereClause: {
      userId: number;
      status?: TodoStatus | null;
      todoListId?: number | null;
    },
    limit = 10,
    offset = 0,
  ): Promise<{ todos: Array<TodoModel>; count: number }> {
    const where = { ...whereClause };
    if (!where.todoListId) {
      delete where.todoListId;
    }

    const todos = await TodoModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [['status', 'ASC']],
    });

    return {
      todos: todos.rows,
      count: todos.count,
    };
  }

  async findTodoLists(
    whereClause: {
      id?: number | null;
      userId: number;
    },
    limit = 10,
    offset = 0,
  ): Promise<{ todoLists: Array<TodoListModel>; count: number }> {
    const where = { ...whereClause };
    if (!where.id) {
      delete where.id;
    }

    const todos = await TodoListModel.findAndCountAll({
      where,
      limit,
      offset,
    });

    return {
      todoLists: todos.rows,
      count: todos.count,
    };
  }

  private async getTodoListId(
    userId: number,
    todoListId?: number | null,
    todoListName?: string | null,
  ): Promise<number | null> {
    if (todoListName) {
      let todoListTodoList = await TodoListModel.findOne({
        where: {
          title: todoListName,
        },
      });

      if (todoListTodoList) {
        return todoListTodoList.dataValues.id;
      } else {
        todoListTodoList = await TodoListModel.create({
          userId,
          title: todoListName,
        });

        return todoListTodoList.dataValues.id;
      }
    }

    return todoListId || null;
  }
}
