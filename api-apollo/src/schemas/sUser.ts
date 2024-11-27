import {buildSchema} from "graphql";

//Definimos el esquema:
const sUser = buildSchema(`
    type User 
    {
        id: ID!
        name: String!
        lastName: String!
        email: String!
        age: Int!
        enabled: Boolean!
    }

    type MutationUserResult 
    {
        user: User
        message: String!
    }
        
    type Query 
    {
        getHello: String
        getUser(id: ID!): User
        getUsers: [User]
    }

    type Mutation 
    {
        createUser(name: String!, lastName: String!, email: String!, age: Int!, enabled: Boolean!): User!
        updateUser(id: ID!, name: String, lastName: String, email: String, age: Int, enabled: Boolean): MutationUserResult!
        logicalDeleteUser(id: ID!): String!
        deleteUser(id: ID!): String!
    }
`);

//Exportamos el esquema:
export default sUser; 
