import { Sequelize } from 'sequelize';
import { TodoModel } from '../../../src/db/models/todo';
import { toGQLTodo, toGQLTodoList } from '../../../src/gql/presenter';
import { TodoListModel } from '../../../src/db/models/todo-list';

jest.mock('../../../src/db/db', () => ({
  getDb: () => new Sequelize({ dialect: 'postgres' }),
}));

describe('Presenter', () => {
  describe('toGQLTodoList', () => {
    test('Should return TodoList', () => {
      const todoListModel = new TodoListModel({
        id: 1,
        title: 'foo',
      });

      const todoList = toGQLTodoList(todoListModel);

      expect(todoList).toEqual({
        id: 1,
        title: 'foo',
      });
    });
  });

  describe('toGQLTodo', () => {
    test('Should return Todo', () => {
      const todoModel = new TodoModel({
        id: 1,
        title: 'foo',
      });

      const todo = toGQLTodo(todoModel);

      expect(todo).toEqual({
        id: 1,
        status: 1,
        title: 'foo',
        todoListId: undefined,
      });
    });
  });
});
