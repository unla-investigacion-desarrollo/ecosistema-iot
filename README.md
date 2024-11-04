## Descripción de la API

El proyecto consiste en una API de GraphQL desarrollada con TypeScript, Node.JS, Express y Apollo Server. Se puede interactuar con la misma mediante la interfaz Apollo Studio de Apollo Server.

La API permite el CRUD (Create, Read, Update and Delete) objetos de los tipos User (Usuario) y Post (Publicación), donde las Post tienen un User asociado. Por lo tanto, a continuación se listan los métodos implementados y que pueden ser consumidos:
- ### **Queries**:
  - #### *User*
    - ```getHello: String``` que devuelve un 'Hello world!'.
    - ```getUser(id: ID!): User``` que devuelve el User que tenga ese id o nulo si no existe.
    - ```getUsers: [User]``` que devuelve todos los User.
  - #### *Post*
    - ```getPost(id: ID!): Post``` que devuelve el Post que tenga ese id o nulo si no existe.
    - ```getPosts: [Post]``` que devuelve todos los Post.
    - ```getPostsOfUser(userId: ID!): [Post]``` que devuelve todos los Post del User con ese id.
- ### **Mutations**:
  - #### *User*
    - ```createUser(name: String!, lastName: String!, email: String!, age: Int!, enabled: Boolean!): User!``` que devuelve el User creado.
    - ```updateUser(id: ID!, name: String, lastName: String, email: String, age: Int, enabled: Boolean): MutationUserResult!``` que devuelve un mensaje y el objeto según el resultado de la operación (el id no puede ser modificado), donde si el usuario no existe se genera un mensaje indicando la situación y el objeto es nulo, mientras que si el usuario existe, es modificado y se retorna un mensaje indicando la modificación y el objeto actualizado.
    - ```deleteUser(id: ID!): String!``` que devuelve un mensaje indicando si el usuario pudo ser eliminado (baja física) o no. Solo pueden ser eliminados los usuarios que existan y no tengan publicaciones asociadas.
    - ```logicalDeleteUser(id: ID!): String!``` que devuelve un mensaje indicando si el usuario pudo ser deshabilitado (baja lógica) o no. Solo pueden ser deshabilitados los usuarios que existen y están habilitados. Además, al deshabilitar un usuario, se deshabilitan cada una de sus publicaciones asociadas.
  - #### *Post*
    - ```createPost(content: String!, dateTime: DateTime!, enabled: Boolean!, userId: ID!): MutationPostResult!``` que devuelve un mensaje y el objeto según el resultado de la operación, donde si el usuario no existe se genera un mensaje indicando que la publicación no puede ser creada y el objeto es nulo, mientras que si el usuario existe, se genera la publicación y se retorna junto a un mensaje que indica el alta de la misma.
    - ```updatePost(id: ID!, content: String, dateTime: DateTime, enabled: Boolean): MutationPostResult!``` que devuelve un mensaje y el objeto según el resultado de la operación, donde si la publicación no existe se genera un mensaje indicando esa situación y el objeto es nulo, mientras que si la publicación existe, se modifica según los parámetros ingresados (no puede ser modificado el id ni el usuario asociado) y se retorna un mensaje indicando esa operación y el objeto resultante.
    - ```deletePost(id: ID!): String!``` que devuelve un mensaje indicando si la publicación pudo ser eliminada (baja física) o no según si existe o no, respectivamente.
    - ```logicalDeletePost(id: ID!): String!``` que devuelve un mensaje indicando que la publicación pudo ser deshabilitada (baja lógica) si existe o que no pudo ser deshabilitado si no existe o ya estaba deshabilitada.

## Guía de instalación

Para realizar el procedimiento de instalación del proyecto y que pueda consumir la API, debe seguir los siguientes pasos:
1. Obtenga el código del proyecto desde este repositorio. Para ello, puede descargar todo el repositorio como un .zip o utilizar el comando ```git clone``` con el enlace al repositorio.
2. Si no lo tiene aún, instale Node.JS. Para ello, puede ir a la [página oficial de Node.JS](https://nodejs.org/en) y elegir la versión según el sistema operativo que tenga. Es importante elegir alguna que tenga la nomenclatura LTS ya que son las versiones que nos aseguran que van a tener soporte por un largo periodo de tiempo. En nuestro caso, para el proyecto utilizamos la versión 22.11.0.
3. Diríjase a la carpeta donde tenga descargado este proyecto (lo que logró con el paso 1) e inicialice Node.JS con el comando ```npm init -y```.
4. Instale las dependencias ```apollo-server-express```, ```graphql```, ```typescript```, ```graphql-scalars``` y ```nodemon``` con el comando ```npm install apollo-server-express graphql typescript nodemon@latest```.
5. Corra el servidor con el comando ```npm run dev```. Si todo sale bien, por la consola se le indicará que el servidor está corriendo en el puerto 3030.
6. Ya tiene el servidor en funcionamiento y puede consumir la API. Diríjase a http://localhost:3030/graphql para interactuar con la interfaz de Apollo Studio.




