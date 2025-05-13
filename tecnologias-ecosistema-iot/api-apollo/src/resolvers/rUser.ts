import users from "../database/dUser"; //Importamos los usuarios.
import {randomUUID} from "crypto";
import {rPost} from "./rPost";

//Definimos la estructura de un usuario:
type User = 
{
    id: string,
    name: string,
    lastName: string,
    email: string,
    age: number,
    enabled: boolean
};

//Definimos la estructura del resultado de una mutación sobre los usuarios:
type MutationUserResult = 
{
    user: User | undefined,
    message: string
};

//Un hola mundo de prueba:
const getHello = (): string => 'Hello world!';

//Obtener un usuario por su id:
const getUser = (args: {id: string}): User | undefined => users.find((user) => user.id === args.id);

//Obtener todos los usuarios:
const getUsers = (): User[] => users;

//Agregar un usuario:
const createUser = (args:
{
    //Recibimos un nombre, un apellido, un email y una edad:
    name: string,
    lastName: string,
    email: string,
    age: number,
    enabled: boolean
}): User =>
{
    //Generamos un id aleatorio:
    const generatedId = randomUUID().toString();

    //Cargamos un usuario con los datos indicados:
    const user = 
    {
        id: generatedId,
        ...args //Accedemos al campo y valor pasado en los argumentos.
    };

    //Agregamos el usuario al arreglo:
    users.push(user);

    //Retornamos el usuario generado:
    return user;
};

//Modificar un usuario:
const updateUser = (args: 
{
    id: string,
    name?: string,
    lastName?: string,
    email?: string,
    age?: number,
    enabled?: boolean
}
): MutationUserResult =>
{
    //Obtenemos el usuario a modificar:
    let user = getUser({id: args.id});

    //Suponemos que el usuario no existe:
    let message = "El usuario con id #" + args.id + " no existe.";

    //Si el usuario existe:
    if(user)
    {
      //Modificamos según los datos ingresados:
      if(args.name) user.name = args.name;
      if(args.lastName) user.lastName = args.lastName;
      if(args.email) user.email = args.email;
      if(args.age) user.age = args.age;
      if(args.enabled !== undefined) user.enabled = args.enabled;

      //Definimos el mensaje del resultado de la mutación:
      message = "Usuario modificado con éxito.";
    }

    //Retornamos el usuario modificado/no encontrado y el mensaje asociado a la modificación:
    return {user, message};
};

//Eliminar un usuario (lógico):
const logicalDeleteUser = (args:
{
    id: string
}): string =>
{
    //Obtenemos el usuario:
    let user = getUser({id: args.id});

    //Suponemos que el usuario no existe:
    let message = "El usuario con id #" + args.id + " no existe.";

    //Si el usuario existe:
    if(user)
    {
      //Si está deshabilitado:
      if(!user.enabled)
      {
          message = "El usuario ya estaba deshabilitado.";
      }
      else
      {
          //Deshabilitamos el usuario:
          user.enabled = false;

          //Deshabilitamos cada una de las publicaciones del usuario:
          rPost.getPostsOfUser({userId: args.id}).forEach(post => 
          {
              //Si la publicación está habilitada:
              if(post.enabled)
              {
                  //La deshabilitamos:
                  post.enabled = false;
              }
          });

          //Definimos el resultado de la mutación:
          message = "Usuario deshabilitado con éxito.";
      }
    }

    //Retornamos el resultado de la mutación:
    return message;
};

//Eliminar un usuario (físico):
const deleteUser = (args: 
{
    id: string
}): string =>
{
    //Buscamos el índice de ese usuario:
    const index = users.findIndex((user) => user.id === args.id);

    //Suponemos que el usuario no existe:
    let message = "El usuario con id #" + args.id + " no existe.";

    //Si el usuario existe:
    if(index !== -1)
    {
        //Obtenemos la cantidad de publicaciones del usuario:
        let quantyPostsOfUser = rPost.getPostsOfUser({userId: args.id}).length;

        //Si tiene al menos una:
        if(quantyPostsOfUser > 0)
        {
            message = "No se puede eliminar el usuario porque tiene " + quantyPostsOfUser + " publicación/ones asociada/s.";
        }
        else
        {
            //Eliminamos el usuario:
            users.splice(index, 1);

            //Definimos el resultado de la mutación:
            message = "Usuario eliminado con éxito.";
        }
    }

    //Retornamos el resultado de la mutación:
    return message;
};

//Exportamos los métodos definidos:
export const rUser = 
{
    getHello,
    getUser,
    getUsers,
    createUser,
    updateUser,
    logicalDeleteUser,
    deleteUser
};