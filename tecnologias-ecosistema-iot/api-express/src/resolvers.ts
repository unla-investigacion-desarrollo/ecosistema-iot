//Resolvers que generan respuestas para las consultas 
import pets from "./database";
import { randomUUID } from "crypto";

type Pet = {
  id: string;
  name: string;
  age: number;
  pictureUri: string;
  ownerName: string;
};

const getPet = (args: { id: string }): Pet | undefined => {
  return pets.find((pet) => pet.id === args.id);
};

const getPets = (): Pet[] => {
  return pets;
};

const createPet = (args: {
  name: string;
  age: number;
  pictureUri: string;
  ownerName: string;
}): Pet => {
  // generate randon uuid for pet object
  const generatedId = randomUUID().toString();
  // create pet object and save
  const pet = { id: generatedId, ...args };
  pets.push(pet);
  return pet;
};

const updatePet = (args: {
  id: string;
  name?: string;
  age?: number;
  pictureUri?: string;
  ownerName?: string;
}): Pet => {
  // loop through pets array and get object of pet
  const index = pets.findIndex((pet) => pet.id === args.id);
  const pet = pets[index];

  // update field if it is passed as an argument
  if (args.age) pet.age = args.age;
  if (args.name) pet.name = args.name;
  if (args.pictureUri) pet.pictureUri = args.pictureUri;

  return pet;
};

const deletePet = (args: { id: string }): string => {
  // loop through pets array and delete pet with id
  const index = pets.findIndex((pet) => pet.id === args.id);
  if (index !== -1) {
    pets.splice(index, 1);
  }

  return args.id;
};


export const root = {
  getPet,
  getPets,
  createPet,
  updatePet,
  deletePet,
};




// Define los resolvers
