const {  gql } = require('apollo-server-express');

const schema = gql`

    type User {
      id: ID!
      name: String!
      age: Int!
    }

    input AddUserInput {
      name: String!
      age: Int!
    }

    type Query {
      getHello: String
      getUser(id: ID!): User
      getUsers: [User]
    }

    type Mutation {
      addUser(input: AddUserInput!): User!
    }
    `;

export default schema; 
 