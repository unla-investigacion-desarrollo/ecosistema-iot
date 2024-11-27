//Se define el schema con todos su tipos queries y mutations
import { buildSchema } from "graphql";

const schema = buildSchema(`
    type Pet {
        id: ID!
        name: String!
        age: Int!
        pictureUri: String
        ownerName: String!
    }

    type Query {
        getPets: [Pet]
        getPet(id: ID!): Pet
    }

    type Mutation {
        createPet(name: String!, age: Int!, pictureUri: String, ownerName: String!): Pet!
        updatePet(id: ID!, name: String, age: Int, pictureUri: String, ownerName: String): Pet!
        deletePet(id: ID!): ID!
    }
    `);

export default schema; 