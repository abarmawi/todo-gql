import {
  QueryTodosArgs,
  MutationCreateTodoArgs,
  TodoListTodosArgs,
  TodoList,
  Todo,
  MutationCreateTodoListArgs,
  Resolvers,
  MutationUpdateTodoArgs,
  MutationUpdateTodoListArgs,
} from '../__generated__/graphql';
import { TodoHandler } from '../../app/todo-handler';
import { TodoStatus } from '../../db/models/todo';
import { Context } from '../types';
import { toGQLTodo, toGQLTodoList } from '../presenter';

export const resolvers: Resolvers = {
  Query: {
    async todos(_, args: QueryTodosArgs, contextValue: Context): Promise<Array<Todo>> {
      const todos = await TodoHandler.instance.findTodos(
        {
          userId: contextValue.userId,
          status: args.searchParams.status as unknown as TodoStatus,
          todoListId: args.searchParams.todoListId,
        },
        args.searchParams.limit || 20,
        args.searchParams.offset || 0,
      );
      return todos.todos.map((todo) => toGQLTodo(todo));
    },

    async todoLists(_, __, contextValue: Context): Promise<Array<TodoList>> {
      const todoLists = await TodoHandler.instance.findTodoLists(
        {
          userId: contextValue.userId,
        },
        20,
        0,
      );
      return todoLists.todoLists.map((list) => toGQLTodoList(list));
    },
  },
  Mutation: {
    async createTodoList(_, args: MutationCreateTodoListArgs, contextValue: Context): Promise<TodoList> {
      const todoList = await TodoHandler.instance.createTodoList(contextValue.userId, args.title);

      return toGQLTodoList(todoList);
    },

    async updateTodoList(_, args: MutationUpdateTodoListArgs, contextValue: Context): Promise<TodoList> {
      const todoList = await TodoHandler.instance.updateTodoList(contextValue.userId, args.todoListId, args.title);

      return toGQLTodoList(todoList);
    },

    async createTodo(_, args: MutationCreateTodoArgs, contextValue: Context): Promise<Todo> {
      const todo = await TodoHandler.instance.createTodo(
        contextValue.userId,
        args.title,
        args.todoListId,
        args.todoListName,
      );

      return toGQLTodo(todo);
    },

    async updateTodo(_, args: MutationUpdateTodoArgs, contextValue: Context): Promise<Todo> {
      const todo = await TodoHandler.instance.updateTodo(
        contextValue.userId,
        args.todoId,
        args.status as unknown as TodoStatus,
        args.title,
      );

      return toGQLTodo(todo);
    },
  },

  TodoList: {
    async todos(todoList: TodoList, args: TodoListTodosArgs, contextValue: Context): Promise<Array<Todo>> {
      const todos = await TodoHandler.instance.findTodos(
        {
          userId: contextValue.userId,
          status: TodoStatus.Pending,
          todoListId: todoList.id,
        },
        args.limit || 20,
        args.offset || 0,
      );

      return todos.todos.map((todo) => toGQLTodo(todo));
    },
  },

  Todo: {
    async todoList(parent: Todo, _, contextValue: Context): Promise<TodoList | null> {
      const todoList = await TodoHandler.instance.findTodoLists({
        userId: contextValue.userId,
        id: parent.todoListId,
      });

      return todoList.todoLists.length ? toGQLTodoList(todoList.todoLists[0]) : null;
    },
  },
};
