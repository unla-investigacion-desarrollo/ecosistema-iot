//Contiene y exporta codigo para que se ejecute el server
import express from "express";
import { createHandler } from 'graphql-http/lib/use/express'; // Cambia aquí
import schema from "./schema";
import { root } from "./resolvers";

const server = express();

// Configuración de GraphQL
server.use(
  '/graphql',
  createHandler({
    schema: schema,
    rootValue: root,
    // Aquí no se incluye graphiql directamente
  })
);

import { graphiqlExpress } from 'graphql-server-express';

server.use(
  '/graphiql',
  graphiqlExpress({ endpointURL: '/graphql' }) // Aquí se especifica el endpoint de GraphQL
);

export default server; 