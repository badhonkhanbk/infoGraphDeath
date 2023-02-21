import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';
import { ApolloServer, ServerRegistration } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import 'reflect-metadata';
import { GraphQLSchema } from 'graphql';

import Resolvers from './utils/AllResolvers';

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const database = process.env.DATABASE;

mongoose
  .connect(database)
  .then(() => console.log('DB connection successful!'))
  .catch((err) => {
    console.log(err);
  });

async function bootstrap() {
  let schema: GraphQLSchema;
  // ... Building schema here
  try {
    schema = await buildSchema({
      //@ts-ignore
      resolvers: Resolvers(),
    });
  } catch (e) {
    console.log(e);
  }

  // Create the GraphQL server
  const server = new ApolloServer({
    schema,
    context: ({ req }: any) => ({ req }),
    playground: true,
    introspection: true,
  });

  server.applyMiddleware({ app });

  const port: String = process.env.PORT || '4000';
  app.listen(Number(port) || 5000, () => {
    console.log('🚀 App is running on http://localhost:' + port + '/graphql');
  });
}

bootstrap();

// process.on('unhandledRejection', (err) => {
//   console.log('UNHANDLED REJECTION! 💥 Shutting down...');
//   process.exit(1);
// });

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  console.log('💥 Process terminated!');
});
