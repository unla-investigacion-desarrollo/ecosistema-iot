import schema from "./schema";
import { root } from "./resolvers"
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

// Crea una instancia de ApolloServer
const server = new ApolloServer({typeDefs: schema, rootValue: root, playground: true});

// Crea una aplicación Express
const app = express();

// Usa ApolloServer como middleware en Express
server.start().then(() => {
  server.applyMiddleware({ app });
});

export default app; 