import sUser from "./schemas/sUser";
import sPost from "./schemas/sPost";
import {rUser} from "./resolvers/rUser"
import {rPost} from "./resolvers/rPost"
const express = require('express');
const {ApolloServer} = require('apollo-server-express');

//Definimos los esquemas y resolvers que debe tener en cuenta el servidor:
const schemas = [sUser, sPost];
const rootValue = {...rUser, ...rPost};

//Crea una instancia de ApolloServer:
const server = new ApolloServer({typeDefs: schemas, rootValue, playground: true});

//Crea una aplicación Express:
const app = express();

//Usa ApolloServer como middleware en Express:
server.start().then(() => {
  server.applyMiddleware({ app });
});

//Exportamos la aplicación:
export default app; 