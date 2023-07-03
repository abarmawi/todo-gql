import { GraphQLResolveInfo } from 'graphql';
import { Resolvers, Todo, QueryTodosArgs } from './__generated__/graphql';

export const resolvers: Resolvers = {
  // TodoStatus: {
  //   PENDING: 1,
  //   COMPLETED: 2,
  // },

  Query: {
    todos(_, args: QueryTodosArgs, __, info: GraphQLResolveInfo) {
      return [] as Todo[];
    },
  },
};
