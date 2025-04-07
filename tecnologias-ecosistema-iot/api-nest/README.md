## Descripción de la API

El proyecto consiste en una API de GraphQL desarrollada con TypeScript, Node.js, Nest.js y Apollo Server. Se puede interactuar con la misma mediante la interfaz Apollo Studio de Apollo Server.

La API permite el CRUD (Create, Read, Update and Delete) de objetos de los tipos Usuario y Tarjeta, donde las Tarjeta tienen un Usuario asociado. Por lo tanto, a continuación se listan los métodos implementados y que pueden ser consumidos:
- ### **Queries**:
  - #### *Usuario*
    - ```traerUsuarioPorId(id: ID!): Usuario``` que devuelve el Usuario que tenga ese id o nulo si no existe.
    - ```traerUsuarioPorDni(dni: Float!): Usuario``` que devuelve el Usuario que tenga ese DNI o nulo si no existe.
    - ```traerUsuarios: [Usuario]``` que devuelve todos los Usuario.
  - #### *Tarjeta*
    - ```traerTarjetaPorId(id: ID!): Tarjeta``` que devuelve la Tarjeta que tenga ese id o nulo si no existe.
    - ```traerPorCodigo(codigo: String!): Tarjeta``` que devuelve la Tarjeta que tenga ese código o nulo si no existe.
    - ```traerTarjetas: [Tarjeta]``` que devuelve todas las Tarjeta.
    - ```traerTarjetasConSaldoEntreRangos(minimo: Float!, maximo: Float!): [Tarjeta]``` que devuelve todas las Tarjeta que tengan un saldo mayor o igual al mínimo y menor o igual al máximo.
    - ```traerTarjetasEntreFechas(fechaDesde: Date!, fechaHasta: Date!): [Tarjeta]``` que devuelve todas las Tarjeta que tengan una fecha de alta posterior o igual a la fecha desde y anterior o igual a la fecha hasta.
- ### **Mutations**:
  - #### *Usuario*
    - ```agregarUsuario(dni: Float!, nombre: String!, apellido: String!): ResultadoMutacionUsuario!``` que deriva en alguno de los siguientes resultados:
      - el usuario es agregado y se retorna un mensaje indicando eso y el nuevo usuario.
      - el usuario no puede ser agregado debido a que el código que se le intenta asignar le pertenece a otro usuario, por lo que se retorna un mensaje indicando ese error y un usuario nulo. 
    - ```eliminarUsuario(dni: Float!): String!``` que deriva en alguno de los siguientes resultados:
      - el usuario es eliminiado y se retorna un mensaje indicando eso.
      - el usuario tiene una tarjeta asociada, por lo que se elimina tanto el usuario como la tarjeta y se retorna un mensaje indicando eso.
      - el usuario a eliminar no existe y no puede ser eliminado, por lo que se retorna un mensaje indicando ese error.
    - ```modificarUsuario(id: ID!, dni: Float, nombre: String, apellido: String): ResultadoMutacionUsuario!``` que deriva en alguno de los siguientes resultados:
      - el usuario es modificado en los atributos indicados y se retorna un mensaje que indica eso y el usuario modificado.
      - el usuario a modificar no existe y no puede ser modificado, por lo que se retorna un mensaje indicando ese error. 
  - #### *Tarjeta*
    - ```agregarTarjeta(codigo: String!, saldo: Float!, fechaAlta: Date!, dni: Float!): ResultadoMutacionTarjeta!``` que deriva en alguno de los siguientes resultados:
      - la tarjeta es agregada y se retorna un mensaje indicando eso y la nueva tarjeta.
      - la tarjeta no puede ser agregada porque ya existe otra con el código que se le intenta asignar, por lo que se retorna un mensaje indicando el error y una tarjeta nula.
      - la tarjeta no puede ser agregada porque el usuario que se le intenta asociar no existe, por lo que se retorna un mensaje indicando el error y una tarjeta nula.
      - la tarjeta no puede ser agregada porque el usuario que se le intenta asociar ya tiene una tarjeta, por lo que se retorna un mensaje indicando el error y una tarjeta nula. 
    - ```agregarSaldoTarjeta(id: ID!, saldo: Float!): ResultadoMutacionTarjeta!``` que deriva en alguno de los siguientes resultados:
      - el saldo es agregado a la tarjeta y se retorna un mensaje indicando eso y la tarjeta con el saldo actualizado.
      - la tarjeta a la cual se le quiere agregar el saldo no existe, por lo que se retorna un mensaje indicando ese error y una tarjeta nula.
      - el saldo que se quiere agregar a la tarjeta es negativo o cero, por lo que se retorna un mensaje indicando ese error y una tarjeta nula.
    - ```eliminarTarjeta(id: ID!): String!``` que deriva en alguno de los siguientes resultados:
      - la tarjeta es eliminada y se retorna un mensaje indicando eso.
      - la tarjera no existe y no puede ser eliminada, por lo que se retorna un mensaje indicando el error.
    - ```modificarTarjeta(id: ID!, codigo: String, saldo: Float): ResultadoMutacionTarjeta!``` que deriva en alguno de los siguientes resultados:
      - la tarjeta es modificada en los atributos indicados y se retorna un mensaje indicando eso y la tarjeta modificada.
      - la tarjeta que se quiere modificar no existe y no puede ser modificada, por lo que se retorna un mensaje indicando el error y nula.
      - el código que se le quiere asignar a la tarjeta le pertenece a otra, por lo que se retorna un mensaje indicando el error y la tarjeta sin modificar.
      - el saldo que se le quiere asignar a la tarjeta es negativo o cero, por lo que se retorna un mensaje indicando el error y la tarjeta sin modificar.
      - no se indicaron cambios ni en el código ni en el saldo de la tarjeta, por lo que se retorna un mensaje indicando el error y la tarjeta sin modificar.

## Guía de instalación

Para realizar el procedimiento de instalación del proyecto y que pueda consumir la API, debe seguir los siguientes pasos:
1. Obtenga el código del proyecto desde este repositorio. Para ello, puede descargar todo el repositorio como un .zip o utilizar el comando ```git clone``` con el enlace al repositorio.
2. Si no lo tiene aún, instale Node.js. Para ello, puede ir a la [página oficial de Node.js](https://nodejs.org/en) y elegir la versión según el sistema operativo que tenga. Es importante elegir alguna que tenga la nomenclatura LTS ya que son las versiones que nos aseguran que van a tener soporte por un largo periodo de tiempo. En nuestro caso, para el proyecto utilizamos la versión 22.11.0.
3. Diríjase a la carpeta donde tenga descargado este proyecto (lo que logró con el paso 1) e inicialice Node.js con el comando ```npm install```.
4. Corra el servidor con el comando ```npm run start```. Si todo sale bien, por la consola se le indicará que el servidor está corriendo.
5. Ya tiene el servidor en funcionamiento y puede consumir la API. Diríjase a http://localhost:3000/graphql para interactuar con la interfaz de Apollo Studio.
6. Para interrumpir la ejecución del servicio utilice el comando ```Ctrl + C```.
