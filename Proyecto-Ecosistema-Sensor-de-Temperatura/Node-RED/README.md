## Descripción del desarrollo

Esta carpeta contiene el diagrama que modela la mutation que se pueden hacer a la [API Mediciones](https://github.com/unla-investigacion-desarrollo/ecosistema-iot/tree/proyecto-sensor-temperatura-humedad/Proyecto-Ecosistema-Sensor-de-Temperatura/API%20Mediciones). Por lo tanto, teniendo en ejecución Node-RED, la API mencionada, el Broker MQTT Mosquitto, el microcontrolador ESP32 y el sensor DHT11 podrá consumir este endpoint con las mediciones que hace el sensor.

## Guía de instalación

Para realizar el procedimiento de instalación de Node-RED, debe seguir los siguientes pasos:
1. Obtenga el código del proyecto desde este repositorio. Para ello, puede descargar todo el repositorio como un .zip o utilizar el comando ```git clone --branch proyecto-sensor-temperatura-humedad --single-branch https://github.com/unla-investigacion-desarrollo/ecosistema-iot```.

2. Si no lo tiene aún, instale Node.js. Para ello, puede ir a la [página oficial de Node.js](https://nodejs.org/en) y elegir la versión según el sistema operativo que tenga. Es importante elegir alguna que tenga la nomenclatura LTS ya que son las versiones que nos aseguran que van a tener soporte por un largo periodo de tiempo.

3. Instale Node-RED con el siguiente comando en la consola: ```npm install -g --unsafe-perm node-red```.

4. El siguiente paso es poner en funcionamiento el servicio. Como Node-RED se instaló globalmente en su máquina, puede hacerlo con el comando ```node-red```.

5. Una vez que levantó el servicio, por consola le saldrá la URL con la que puede consumirlo, que generalmente es http://127.0.0.1:1880/. Ingrese a esa dirección para consumir la interfaz de Node-RED.

6. Si bien el diagrama se carga automáticamente, es necesario configurar la IP y puerto del servidor Mosquitto en el nodo "Input MQTT" para que trabaje con el que usted tiene en funcionamiento. Por lo tanto, siga el siguiente procedimiento:

   1.  Doble clic en el nodo "Input MQTT".
   2.  Pestaña "Properties", en "Server" tiene cargado el que configuramos con el nombre "Mosquitto". Haga clic sobre el lápiz para editar la conexión.
   3.  En la pestaña "Connection", sección "Server", coloque su IP pública.
   4.  Misma pestaña que en el paso anterior, sección "Port", coloque el puerto que expuso para la conexión al broker.
   5.  Pestaña "Security", indique su username y password del broker.
   6.  Haga clic sobre el botón rojo "Upload "en la esquina superior derecha de la ventana emergente.
   7.  Haga clic sobre el botón rojo "Done "en la esquina superior derecha de la ventana emergente.
   8.  Haga clic sobre el botón rojo "Deploy "en la esquina superior derecha de la ventana.
   9.  Con estos cambios, el nodo "Input MQTT" estará atento a los mensajes en su Mosquitto.

8. Ya tiene todo configurado en Node-RED para trabajar. Sin embargo, es necesario levantar los demás servicios mencionados para que funcione la conexión. Por lo tanto, debe seguir el paso a paso detallado en el readme de [API Mediciones](https://github.com/unla-investigacion-desarrollo/ecosistema-iot/tree/api-mediciones) y [Código ESP32](https://github.com/unla-investigacion-desarrollo/ecosistema-iot/tree/proyecto-sensor-temperatura-humedad/Proyecto-Ecosistema-Sensor-de-Temperatura/ESP32-code).

9. Para detener la ejecución del servicio debe ejecutar ```Ctrl + C```.

## Funcionamiento
El diagrama consiste en los siguientes nodos secuenciales:

1. **Input MQTT:** dentro de propiedades vinculamos un servidor "Mosquitto" y le especificamos el tópico de conexión clima/esp32 para subscribirnos a los mensajes que envía el sensor a través del microcontrolador ESP32. Además se configura la salida como dato del tipo JSON. 

2. **Set Data:** en este nodo lo que se hace es acceder al JSON enviado por el nodo "Input MQTT" para armar la query a nuestro endpoint de la API que permite agregar una nueva medición.

3. **API Mediciones:** dentro de las propiedades del nodo se define el metodo del tipo POST y luego se indica la URL donde estará corriendo nuestra API. En la parte de "Headears" se especifica que el contenido del cuerpo de la consulta es del tipo JSON y es la salida del nodo anterior. Por lo tanto, la API puede ejecutar la petición que, en nuestro caso, es agregar la medición.

4. **Debug:** este nodo sirve únicamente  para visualizar la estructura de la consultas que se están ejecutando, tanto desde la interfaz de Node-RED como desde la terminal donde se ejecuta el servicio. 
