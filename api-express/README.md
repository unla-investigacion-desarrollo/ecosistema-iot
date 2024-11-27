## Descripción de la API

El proyecto consiste en una API de GraphQL desarrollada con TypeScript, Node.JS, y Express. Se puede interactuar con la misma mediante la interfaz GraphiQL.

La API permite el CRUD (Create, Read, Update and Delete) de objetos del tipo Pet (Mascota). Por lo tanto, a continuación se listan los métodos implementados y que pueden ser consumidos:
- ### **Queries**:
  - ```getPet(id: ID!): Pet``` que devuelve la mascota con ese id.
  - ```getPets: [Pet]``` que devuelve todas las mascotas.
- ### **Mutations**:
  - ```createPet(name: String!, age: Int!, pictureUri: String, ownerName: String!): Pet!``` que devuelve el Pet creado.
  - ```updatePet(id: ID!, name: String, age: Int, pictureUri: String, ownerName: String): Pet!``` que devuelve la mascota modificada según los parámetros indicados si es que existe.
  - ```deletePet(id: ID!): ID!``` que elimina la mascota si es que existe.

Ejemplos de uso:

1)
 {
  getPets {
    id
    name
    age
    pictureUri
  }
}

2)
 mutation{
  createPet(name: "some name", age: 10, pictureUri: "some uri", ownerName:"some owner") {
    id
    name
    age
    pictureUri
  }
}
  
## Guía de instalación

Para realizar el procedimiento de instalación del proyecto y que pueda consumir la API, debe seguir los siguientes pasos:
1. Obtenga el código del proyecto desde este repositorio. Para ello, puede descargar todo el repositorio como un .zip o utilizar el comando ```git clone``` con el enlace al repositorio.
2. Si no lo tiene aún, instale Node.JS. Para ello, puede ir a la [página oficial de Node.JS](https://nodejs.org/en) y elegir la versión según el sistema operativo que tenga. Es importante elegir alguna que tenga la nomenclatura LTS ya que son las versiones que nos aseguran que van a tener soporte por un largo periodo de tiempo. En nuestro caso, para el proyecto utilizamos la versión 22.11.0.
3. Instale las dependencias requeridas con el comando ```npm install```.
4. Instale las dependencias del desarrollo con el comando ```npm install -D typescript ts-node @types/node @types/express @types/graphql nodemon```.
5. Corra el servidor con el comando ```npm run start:dev```. Si todo sale bien, por la consola se le indicará que el servidor está corriendo en el puerto 3000.
6. Ya tiene el servidor en funcionamiento y puede consumir la API. Diríjase a http://localhost:3000/graphiql para interactuar con la interfaz.
