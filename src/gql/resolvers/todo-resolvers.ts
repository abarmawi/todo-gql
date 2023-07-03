import { Resolvers, Todo, QueryTodosArgs } from './__generated__/graphql';

export const resolvers: Resolvers = {
  Query: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async todos(_, args: QueryTodosArgs) {
      return [] as Todo[];
    },
  },
};
