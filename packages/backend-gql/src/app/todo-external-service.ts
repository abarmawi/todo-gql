import axios from 'axios';
import { TodoModel, TodoStatus } from '../db/models/todo';

export class TodoExternalService {
  private static _todoExternalService: TodoExternalService;

  public static get instance(): TodoExternalService {
    if (this._todoExternalService) {
      return this._todoExternalService;
    }

    this._todoExternalService = new TodoExternalService();
    return this._todoExternalService;
  }

  public async create(todo: TodoModel): Promise<string> {
    const response = await axios.post(`${process.env.APP_MOCK_TODO_SERVER}/`, {
      title: todo.title,
      status: TodoStatus[todo.status],
      todoId: todo.id,
    });

    return response.data.id;
  }

  public async update(todo: TodoModel): Promise<string> {
    const response = await axios.put(`${process.env.APP_MOCK_TODO_SERVER}/${todo.externalServiceId}`, {
      title: todo.title,
      status: TodoStatus[todo.status],
      todoId: todo.id,
    });

    return response.data.id;
  }
}
