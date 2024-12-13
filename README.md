## Descripción de la API

El proyecto consiste en una API de GraphQL desarrollada con TypeScript, NodeJS, Nest y Apollo Server. Se puede interactuar con la misma mediante la interfaz Apollo Studio de Apollo Server.

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

## Descripción del desarrollo en Node-RED

Consiste en dos diagramas que modelan las consultas que se pueden hacer a la API. Por lo tanto, teniendo en ejecución tanto el servicio de Node-RED como el de la API, es posible realizar esas consultas a la API simplemente con un clic en el método que desee.

## Guía de instalación

Para realizar el procedimiento de instalación del proyecto y que pueda consumir la API tanto desde la interfaz de Apollo Studio como de la de Node-RED, debe seguir los siguientes pasos:
1. Obtenga el código del proyecto desde este repositorio. Para ello, puede descargar todo el repositorio como un .zip o utilizar el comando ```git clone``` con el enlace al repositorio.
2. Si no lo tiene aún, instale Node.JS. Para ello, puede ir a la [página oficial de Node.js](https://nodejs.org/en) y elegir la versión según el sistema operativo que tenga. Es importante elegir alguna que tenga la nomenclatura LTS ya que son las versiones que nos aseguran que van a tener soporte por un largo periodo de tiempo. En nuestro caso, para el proyecto utilizamos la versión 22.11.0.
3. Diríjase a la carpeta donde tenga descargado este proyecto (lo que logró con el paso 1) e inicialice Node.js con el comando ```npm install```. De esta forma, instalará todas las dependencias que necesita la API para funcionar. Completado este paso, la API está lista para ser consumida.
4. Instale Node-RED con el siguiente comando en la consola: ```npm install -g --unsafe-perm node-red```.
5. El siguiente paso consiste en levantar ambos servicios con Docker. Para ello, en primer lugar, debe tener Docker instalado y ejecutando en su computadora. Para ello puede descargar Docker Desktop desde la [página oficial](https://www.docker.com/products/docker-desktop/) según su sistema operativo. Le presentamos distintas opciones de comandos para levantar los servicios:

    a. Si es la primera vez que realiza el proceso, debe construir las imágenes y el contenedor. Para ello, utilice el comando ```docker-compose --build```.
  
    b. Si ya tiene las imágenes y el contenedor construidos y en la misma versión que el código, utilice el comando ```docker-compose up``` para levantar ambos servicios. Otra versión es el comando ```docker-compose up -d```, el cual no imprime los logs por consola y le permite seguir trabajando con la misma.
  
    c. Si quiere construir las imágenes y el contenedor y enseguida levantar los servicios utilice el comando ```docker-compose up --build```.
6. Una vez que levantaron ambos servicios, ya puede consumirlos. Por lo tanto, para acceder a la interfaz de Apollo Studio y consumir la API diríjase a http://localhost:3000/graphql. Si desea consumir el servicio de Node-RED para interactuar con la API mediante los diagramas, diríjase a http://localhost:1880/.
7. Para interrumpir la ejecución de los servicios utilice ```Ctrl + C``` o ```docker-compose down``` solo si los levantó con ```docker-compose up -d```.

## Guía de uso desde Node-RED

Una vez realizada la instalación y configuración, puede comenzar a interactuar con la interfaz. Por lo tanto, le comentamos en qué consisten los diagramas diseñados y cómo puede trabajar con ellos. En primer lugar, el mecanismo consiste en un nodo *inject* que sirve para hacer consultas, el cual se conecta a un nodo *function* que se encarga de cargar el mensaje de la consulta, la cual realiza a un nodo *http request*, el cual tiene configurada la URL de la API para llevar esa consulta a la misma y obtener un resultado, el cual es enviado a un nodo *debug* que nos permite ver el resultado por consola o mismo en la interfaz, según como prefiera configurarlo.

Explicado el funcionamiento de los diagramas, continuamos mencionando las consultas que implementamos y su comportamiento por defecto:
- ### **Consultas Usuario**
    - ```traerUsuarios```: devuelve el id, DNI, nombre y apellido de cada usuario.
    - ```traerUsuarioPorId```: devuelve el id, DNI, nombre y apellido del usuario con id "3".
    - ```traerUsuarioPorDni```: devuelve el id, DNI, nombre y apellido del usuario con DNI 11111111.
    - ```agregarUsuario```: intenta agregar el usuario con DNI: 77777777, nombre: "Pilar" y apellido: "Rodríguez".
    - ```eliminarUsuario```: intenta eliminar el usuario con DNI: 77777777.
    - ```modificarUsuario```: intenta modificar el usuario con id "2" en su DNI con el 88888888, en su nombre con "Pablo" y en su apellido con "Martínez".
- ### **Consultas Tarjeta**
    - ```traerTarjetas```: devuelve el id, código, saldo, fecha de alta y el usuario (id, DNI, nombre y apellido) de cada tarjeta.
    - ```traerTarjetaPorId```: devuelve el id, código, saldo, fecha de alta y el usuario (id, DNI, nombre y apellido) de la tarjeta con id "2".
    - ```traerPorCodigo```: devuelve el id, código, saldo, fecha de alta y el usuario (id, DNI, nombre y apellido) de la tarjeta con código "1111".
    - ```traerTarjetaPorDniUsuario```: devuelve el id, código, saldo, fecha de alta y el usuario (id, DNI, nombre y apellido) de la tarjeta del usuario con DNI 55555555.
    - ```traerTarjetasConSaldoEntreRangos```: devuelve el id, código, saldo, fecha de alta y el usuario (id, DNI, nombre y apellido) de cada tarjeta que tenga un saldo mayor o igual a 2500 y menor o igual a 5500.
    - ```traerTarjetasEntreFechas```: devuelve el id, código, saldo, fecha de alta y el usuario (id, DNI, nombre y apellido) de cada tarjeta que tenga una fecha de alta posterior o igual a "2019-01-01" y anterior o igual a "2020-12-31".
    - ```agregarTarjeta```: intenta agregar una tarjeta con código: "6666", saldo: 6500 y fecha de alta: "2024-12-01" al usuario con DNI 66666666.
    - ```agregarSaldoTarjeta```: intenta agregar 2000 de saldo a la tarjeta con id "1".
    - ```eliminarTarjeta```: intenta eliminar la tarjeta con id "4".
    - ```modificarTarjeta```: intenta modificar la tarjeta con id "3" en su código por "4321" y en su saldo por 4321.

Es importante resaltar que, si bien ya hay un payload definido, usted puede modificar el mensaje de la consulta para obtener distintos resultados según lo que busque consultar. Para ello, edite el nodo *function* llamado payload asociado al nodo de consulta que es de su interés. Sin embargo, debe tener en cuenta que ante cualquier modificación sobre los diagramas es necesario realizar el deploy de los mismos para que Node-RED trabaje con esa versión en las consultas sobre la API. Para ello debe hacer clic sobre el botón rojo que dice "Deploy" ubicado en la esquina superior derecha.

Para realizar las consultas a la API y visualizar los resultados que la misma entrega, debe tener en cuenta las siguientes cuestiones:
- El nodo *debug* debe estar en funcionamiento. A la derecha del mismo hay un cuadradito, el cual si está en verde significa que está en funcionamiento. Caso contrario, haga clic sobre el cuadradito y se pondrá en funcionamiento.
- Sobre el nodo *debug* hay unas 3 líneas horizontales que si hace clic puede acceder a la configuración del nodo. Ahí seleccione el/los lugar/es por donde quiere visualizar los resultados. Para desplegar la ventana de visualización de la interfaz debe hacer clic sobre el insecto ubicado en la esquina superior derecha.
- Cada clic sobre el cuadradito azulado a la izquierda de cada nodo de consulta dispara la misma.