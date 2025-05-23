# API Mediciones
El proyecto consiste una API de GraphQL desarrollada con TypeScript, Node.js, Nest.js y Apollo Server. La misma puede ser consumida desde la interfaz gráfica Apollo Studio de Apollo Server o directamente desde el dashboard desarrollado por nosotros ([dashboard-sensores](https://github.com/unla-investigacion-desarrollo/ecosistema-iot/tree/proyecto-sensor-temperatura-humedad/Proyecto-Ecosistema-Sensor-de-Temperatura/dashboard-sensores)).

La persistencia de datos está implementada en una base de datos no relacional de MongoDB y específicamente en su versión en la nube MongoDB Atlas. A su vez, para interactuar con la misma utilizamos como ODM a Mongoose que es una librería proporcionada por Node.js.

La API permite realizar Queries (consultas) y Mutations (altas, bajas) de objetos del tipo "Medicion". A continuacion se detallan los métodos implementados que pueden ser consumidos:

- ### **Queries:**
  - ***Medicion***
    - `traerMedicionActual: Medicion` -> Trae la última medición agregada, es decir, la que tenga el valor del campo fechaHora más reciente.
    - `traerPromedioTemperatura(cantidad: Int!): ` -> Trae el valor resultante del promedio de las temperaturas de las mediciones que tengan el valor del campo fechaHora más reciente. La cantidad de mediciones se indica por parámetro.
    - `traerPromedioHumedad(cantidad: Int!): Float` -> Trae el valor resultante del promedio de las humedades de las mediciones que tengan el valor del campo fechaHora más reciente. La cantidad de mediciones se indica por parámetro.
    - `traerMedicionPorFechaHora(fechaHora: Date!): Medicion` -> Trae la medición que tenga la fechaHora indicada por parámetro.
    - `traerMediciones: [Medicion]` -> Trae todas las mediciones que estén agregadas en la base de datos.
    - `traerUltimasMediciones(cantidad: Int!): [Medicion]` -> Trae las mediciones tengan el valor del campo fechaHora más reciente. La cantidad se indica por parámetro.
    - `traerMedicionesEntreFechasHoras(fechaHoraDesde: Date!, fechaHoraHasta: Date!): [Medicion]` -> Trae las mediciones entre las dos fechaHora indicadas por parámetro. Incluídos ambos extremos.
    - `traerMedicionesEntreTemperaturas(temperaturaDesde: Float!, temperaturaHasta: Float!): [Medicion]` -> Trae las mediciones entre las dos temperaturas indicadas por parámetro. Incluídos ambos extremos.
    - `traerMedicionesEntreHumedades(humedadDesde: Int!, humedadHasta: Int!): [Medicion]` -> Trae las mediciones entre las dos humedades indicadas por parámetro. Incluídos ambos extremos.
- ### **Mutations:**
  - ***Medicion***
    - `agregarMedicion(fechaHora: Date!, temperatura: Float!, humedad: Float!): Medicion!` ->  Instancia un objeto del tipo Medicion y lo agrega sin ningún tipo de validación. Si la operación fue exitosa devuelve la medición agregada, en caso contrario devuelve un "MongooseError".
    - `eliminarMedicion(fechaHora: Date!): String!` -> Elimina la medición que tenga la fechaHora indicada por parámetro. Devuelve un mensaje indicando si se concretó o no la operación.
# Guía de instalación
1. Obtenga el código del proyecto desde este repositorio. Para ello, puede descargar todo el repositorio como un .zip o utilizar el comando `git clone --branch proyecto-sensor-temperatura-humedad --single-branch https://github.com/unla-investigacion-desarrollo/ecosistema-iot`.

3. Si no lo tiene aún, instale Node.js. Puede verificar si lo tiene instalado con el comando node -v. Para instalarlo, puede ir a la [página oficial de Node.js](https://nodejs.org/en) y elegir la versión según el sistema operativo que tenga. Es importante elegir alguna que tenga la nomenclatura LTS ya que son las versiones estables que nos aseguran que van a tener soporte por un largo periodo de tiempo.

4. Diríjase a la carpeta donde tenga descargado este proyecto (lo que logró con el paso 1) e inicialice Node.js con el comando `npm install`.

5. Crear la base de datos en MongoDB Atlas

   -  **Cuenta:** Deberá crearse una cuenta en MongoDB Atlas si aún no la tiene. Diríjase a https://www.mongodb.com/es/cloud/atlas/register para hacerlo.

   -  **Proyecto:** Luego deberá crear un nuevo proyecto haciendo click en *"New Project"*.

   -  **Clúster:** En el nuevo proyecto deberá crear un Clúster eligiendo el proveedor, la región más cercana y el nombre del mismo.

   -  **Base de datos:** Dentro del Clúster deberá crear la base de datos.

   -  **Usuarios:** Diríjase a *"Database Access"* ubicado en *"Security"* y seleccione *"Add New Database User"*. Elija el nombre, contraseña y los permisos que desee. Guarde cuidadosamente el nombre de usuario y la contraseña.

   -  **Conexiones IP:** Vaya a *"Network Access"* y haga click en *"Add IP Address"*. De esta manera puede configurar que IPs pueden tener acceso. Si desea que se pueda realizar la conexión desde cualquier IP agregue "0.0.0.0", aunque no se recomienda por motivos de seguridad.

   -  **Conexión API con base de datos:** 

      1. Diríjase a la base de datos dentro del Clúster y haga click en *"Connect"*. Consiga la URL proporcionada para su usuario.

      2. Cree un archivo .env en la raíz del proyecto para guardar las variables de entorno. Dentro del mismo se define la variable de entorno MONGO_URI y se le coloca la URL que le proporcionó MongoDB Atlas con los pasos anteriormente indicados. Debe quedar "MONGO_URI=URL". 

      3. Luego deberá colocar el nombre de usuario, contraseña, el nombre del cluster y el nombre la base de datos donde corresponda dentro de esa URL. Por ejemplo:
         - **Usuario:** unla-iot
         - **Password:** 1234  
         - **Nombre base de datos:** test
         - **Nombre cluster:** cluster
         - **URL general:** ```mongodb+srv://usuario:password@nombreCluster.rznehcl.mongodb.net/nombreDB?retryWrites=true&w=majority```
         - **URL con datos:** ```mongodb+srv://unla-iot:1234@cluster.rznehcl.mongodb.net/test?retryWrites=true&w=majority```
           
      4. Verifique que el archivo .env esté incluído en el archivo .gitignore

6. Corra el servidor con el comando `npm run start`. Si todo sale bien, por la consola se le indicará que el servidor está corriendo.

7. Ya tiene el servidor en funcionamiento y puede consumir la API. Diríjase a http://localhost:4000/graphql para interactuar con la interfaz de Apollo Studio. También puede consumir la API desde el frontend que desarrollamos en ([dashboard-sensores](https://github.com/unla-investigacion-desarrollo/ecosistema-iot/tree/proyecto-sensor-temperatura-humedad/Proyecto-Ecosistema-Sensor-de-Temperatura/dashboard-sensores)). Siga el paso a paso del README para poder levantarlo.

8. Para interrumpir la ejecución del servicio utilice el comando Ctrl + C.