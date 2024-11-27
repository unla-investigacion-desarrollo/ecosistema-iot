import {buildSchema} from "graphql";

//Definimos el esquema:
const sPost = buildSchema(`
    scalar DateTime

    type User 
    {
        id: ID!
        name: String!
        lastName: String!
        email: String!
        age: Int!
        enabled: Boolean!
    }

    type Post
    {
        id: ID!
        content: String!
        dateTime: DateTime!
        enabled: Boolean!
        user: User!
    }

    type MutationPostResult 
    {
        post: Post
        message: String!
    }

    type Query 
    {
        getPost(id: ID!): Post
        getPosts: [Post]
        getPostsOfUser(userId: ID!): [Post]
    }

    type Mutation 
    {
        createPost(content: String!, dateTime: DateTime!, enabled: Boolean!, userId: ID!): MutationPostResult!
        updatePost(id: ID!, content: String, dateTime: DateTime, enabled: Boolean): MutationPostResult!
        logicalDeletePost(id: ID!): String!
        deletePost(id: ID!): String!
    }
`);

//Exportamos el esquema:
export default sPost; 
