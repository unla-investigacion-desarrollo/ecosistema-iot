import posts from "../database/dPost"; //Importamos las publicaciones.
import {rUser} from "./rUser"; //Importamos el resolver de usuarios.
import {randomUUID} from "crypto";
import {DateTimeResolver} from 'graphql-scalars';

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

//Definimos la estructura de una publicación:
type Post =
{
    id: string,
    content: string,
    dateTime: Date,
    enabled: boolean,
    user: User
}

//Definimos la estructura del resultado de una mutación sobre las publicaciones:
type MutationPostResult = 
{
    post: Post | undefined,
    message: string
};

//Obtener una publicación por su id:
const getPost = (args: {id: string}): Post | undefined => posts.find((post) => post.id === args.id);

//Obtener todas las publicaciones:
const getPosts = (): Post[] => posts;

//Obtener todas las publicaciones de un usuario:
const getPostsOfUser = (args: {userId: string}): Post[] =>
{
    //Definimos un arreglo donde guardaremos las publicaciones del usuario:
    let postsOfUser: Post[] = [];

    //Recorremos las publicaciones:
    posts.forEach(post => 
    {
        //Si es del usuario:
        if(post.user.id === args.userId)
        {
            //La agregamos al arreglo:
            postsOfUser.push(post);
        }    
    });

    //Retornamos las publicaciones del usuario:
    return postsOfUser;
}

//Agregar una publicación:
const createPost = (args:
{
    //Recibimos un contenido, una fecha y hora, activo/inactivo y un id de usuario:
    content: string,
    dateTime: Date,
    enabled: boolean,
    userId: string
}): MutationPostResult =>
{
    //Obtenemos el usuario con el id indicado:
    const user = rUser.getUser({id: args.userId});

    //Suponemos que la publicación no se va a poder agregar y definimos el mensaje de error asociado:
    let post = undefined;
    let message = "El usuario con id #" + args.userId + " no existe";

    //Si el usuario existe:
    if(user !== undefined)
    {
        //Generamos un id aleatorio:
        const generatedId = randomUUID().toString();
        
        //Cargamos una publicación con los datos indicados:
        post = 
        {
            id: generatedId,
            ...args, //Accedemos al campo y valor pasado en los argumentos.
            user: user
        };

        //Agregamos la publicación al arreglo:
        posts.push(post);

        //Definimos el mensaje de resultado de la generación:
        message = "Publicación creada con éxito";
    }

    //Retornamos la publicación generada/no generada y el mensaje asociado a la generación:
    return {post, message};
};

//Modificar una publicación:
const updatePost = (args:
{
    id: string,
    content?: string,
    dateTime ?: Date,
    enabled ?: boolean
}): MutationPostResult =>
{
    //Obtenemos la publicación a modificar:
    let post = getPost({id: args.id});

    //Definimos el mensaje suponiendo que no existe la publicación:
    let message = "La publicación con id #" + args.id + " no existe.";

    //Si la publicación existe:
    if(post)
    {
        //Modificamos según los datos ingresados:
        if(args.content) post.content = args.content;
        if(args.dateTime) post.dateTime = args.dateTime;
        if(args.enabled !== undefined) post.enabled = args.enabled;

        //Definimos el mensaje del resultado de la mutación:
        message = "Publicación modificada con éxito.";
    }

    //Retornamos la publicación modificada/no encontrada y el mensaje asociado a la modificación:
    return {post, message};
};

//Eliminar una publicación (lógico):
const logicalDeletePost = (args:
{
    id: string
}): string =>
{
    //Obtenemos la publicación:
    let post = getPost({id: args.id});

    //Suponemos que la publicación no existe:
    let message = "La publicación con id #" + args.id + " no existe.";

    //Si la publicación existe:
    if(post)
    {
        //Si está deshabilitada:
        if(!post.enabled)
        {
            message = "La publicación ya estaba deshabilitada.";
        }
        else
        {
            //Deshabilitamos la publicación:
            post.enabled = false;

            //Definimos el resultado de la mutación:
            message = "Publicación deshabilitada con éxito.";
        }
    }

    //Retornamos el resultado de la mutación:
    return message;
};

//Eliminar una publicación (físico):
const deletePost = (args: 
{
    id: string
}): string =>
{
    //Obtenemos el índice de la publicación en el array:
    let index = posts.findIndex((post) => post.id === args.id);

    //Suponemos que la publicación no existe:
    let message = "La publicación con id #" + args.id + " no existe.";

    //Si la publicación existe:
    if(index !== -1)
    {
        //Eliminamos la publicación:
        posts.splice(index, 1);

        //Definimos el resultado de la mutación:
        message = "Publicación eliminada con éxito.";
    }

    //Retornamos el resultado de la mutación:
    return message;
};

//Exportamos los métodos definidos:
export const rPost = 
{
    getPost,
    getPosts,
    getPostsOfUser,
    createPost,
    updatePost,
    logicalDeletePost,
    deletePost,
    DateTime: DateTimeResolver
};