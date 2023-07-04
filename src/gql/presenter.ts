import { TodoModel } from '../db/models/todo';
import { TodoListModel } from '../db/models/todo-list';
import { Todo, TodoList, TodoStatus } from './__generated__/graphql';

export const toGQLTodoList = (todoListModel: TodoListModel): TodoList => {
  return {
    id: todoListModel.id,
    title: todoListModel.title,
  };
};

export const toGQLTodo = (todoModel: TodoModel): Todo => {
  return {
    id: todoModel.id,
    title: todoModel.title,
    status: todoModel.status as unknown as TodoStatus,
    todoListId: todoModel.todoListId,
  };
};
