## Descripción del desarrollo

Esta carpeta contiene dos diagramas que modelan las consultas que se pueden hacer a la API almacenada en la carpeta ```api-nest``` de este repositorio. Por lo tanto, teniendo en ejecución tanto el servicio de Node-RED como el de la API, es posible realizar esas consultas a la API simplemente con un clic en el método que desee.

## Guía de instalación

Para realizar el procedimiento de instalación de Node-RED y que pueda consumir la API desde esta interfaz, debe seguir los siguientes pasos:
1. Obtenga el código del proyecto desde este repositorio. Para ello, puede descargar todo el repositorio como un .zip o utilizar el comando ```git clone``` con el enlace al repositorio.
2. Si no lo tiene aún, instale Node.js. Para ello, puede ir a la [página oficial de Node.js](https://nodejs.org/en) y elegir la versión según el sistema operativo que tenga. Es importante elegir alguna que tenga la nomenclatura LTS ya que son las versiones que nos aseguran que van a tener soporte por un largo periodo de tiempo.
3. Instale Node-RED con el siguiente comando en la consola: ```npm install -g --unsafe-perm node-red```.
4. El siguiente paso es poner en funcionamiento el servicio. Como Node-RED se instaló globalmente en su máquina, puede hacerlo con el comando ```node-red```.
5. Una vez que levantó el servicio, por consola le saldrá la URL con la que puede consumirlo, que generalmente es http://127.0.0.1:1880/. Ingrese a esa dirección para consumir la interfaz de Node-RED.
6. Cuando se encuentre en la interfaz de Node-RED, observará que no hay ningún flujo cargado. Por lo tanto, es necesario importar desde la interfaz de Node-RED el archivo ```flows.json```. Para ello, vaya a las 3 rayas horizontales en la esquina superior derecha y seleccione la opción ```Import```. En el recuadro que se abre puede copiar el contenido del archivo o directamente cargarlo. Confirme la acción y listo. 
7. Ya tiene todo configurado en Node-RED para trabajar. Sin embargo, es necesario levantar el servicio de la API para que las consultas puedan ser realizadas. Por lo tanto, debe seguir el paso a paso detallado en el readme de la carpeta ```api-nest```.
8. Una vez que tenga ambos servicios en ejecución (solo restaba el de la API), puede utilizar la interfaz de Node-RED para hacer las consultas.
9. Para detener la ejecución del servicio debe ejecutar ```Ctrl + C```.

## Guía de uso

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

Es importante resaltar que, si bien ya hay un payload definido, usted puede modificar el mensaje de la consulta para obtener distintos resultados según lo que busque consultar. Para ello, edite el nodo *function* llamado payload asociado al nodo de consulta que es de su interés. Sin embargo, debe tener en cuenta que ante cualquier modificación sobre los diagramas es necesario realizar el Deploy de los mismos para que Node-RED trabaje con esa versión en las consultas sobre la API. Para ello debe hacer clic sobre el botón rojo que dice "Deploy" ubicado en la esquina superior derecha.

Para realizar las consultas a la API y visualizar los resultados que la misma entrega, debe tener en cuenta las siguientes cuestiones:
- El nodo *debug* debe estar en funcionamiento. A la derecha del mismo hay un cuadradito, el cual si está en verde significa que está en funcionamiento. Caso contrario, haga clic sobre el cuadradito y se pondrá en funcionamiento.
- Sobre el nodo *debug* hay unas 3 líneas horizontales que si hace clic puede acceder a la configuración del nodo. Ahí seleccione el/los lugar/es por donde quiere visualizar los resultados. Para desplegar la ventana de visualización de la interfaz debe hacer clic sobre el insecto ubicado en la esquina superior derecha.
- Cada clic sobre el cuadradito azulado a la izquierda de cada nodo de consulta dispara la misma.