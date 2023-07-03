import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { loadFiles } from '@graphql-tools/load-files';

async function main() {
  // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  const server = new ApolloServer({
    typeDefs: await loadFiles('src/gql/schemas/**/*.gql'),
    resolvers: await loadFiles('src/gql/resolvers/**/*.{js,ts}'),
  });

  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(process.env.port || 3000) },
  });
  // eslint-disable-next-line no-console
  console.log(`🚀  Server ready at: ${url}`);
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
