import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from './resolvers';
import { typeDefs } from './schema';
import { TrackAPI } from './datasources/track-api';

const port = Number(process.env.PORT) || 4000;

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
  });

  const { url } = await startStandaloneServer(server, {
    context: async () => {
      const { cache } = server;

      return {
        dataSources: {
          trackAPI: new TrackAPI({ cache }),
        },
      };
    },
    listen: { port },
  });

  console.log(`🚀 Server is running!
🔉 Listening on port ${port}
📭 Query at ${url}
  `);
}

startApolloServer();
