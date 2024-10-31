import users from "./database";
import { randomUUID } from "crypto";

type User = {
    id: string;
    name: string;
    age: number;
};


const getUser = (args: { id: string}): User | undefined => {
    return users.find((user) => user.id === args.id);
};


const getUsers = (): User[] =>{
  return users;
}


const getHello = (): String =>{
  return 'Hello world!';
}
    
      
    


/*
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
  Mutation: {
    addUser: (_parent, { input }: { input: AddUserInput }): User => {
      const id = String(users.length + 1);
      const user = { id, ...input };
      users.push(user);
      return user;
    },
  },
}; 
*/

export const root = {
    getUser,
    getHello,
    getUsers,
  };