# Dashboard de sensores

El proyecto consiste en un **frontend desarrollado con *Next.js, React y yarn* que permite visualizar**:
- los **datos de la última medición**, es decir, **temperatura y humedad**, con un **gráfico específico para cada dato**. 
- una **tabla** con las **últimas 10 mediciones** tomadas por el sensor, indicando **fecha y hora, temperatura y humedad de cada una** de ellas, ordenadas de la más reciente a la más antigua.
- el **promedio de temperatura y humedad** de esas 10 últimas mediciones.

Estas mediciones provienen de consumir distintos endpoints de una API que también desarrollamos ([API Mediciones](https://github.com/unla-investigacion-desarrollo/ecosistema-iot/tree/proyecto-sensor-temperatura-humedad/Proyecto-Ecosistema-Sensor-de-Temperatura/API%20Mediciones)).

Además, **automáticamente realiza nuevamente las consultas a los endpoints cada 5 segundos**, logrando actualizar la información en base a las nuevas mediciones que lleva a cabo el sensor.

## Guía de instalación
Para realizar el procedimiento de instalación del proyecto y que pueda consumir el dashboard, debe seguir los siguientes **pasos**:

1. Obtenga el código del proyecto desde este repositorio. Para ello, puede descargar todo el repositorio como un ```.zip``` o utilizar el comando ```git clone --branch proyecto-sensor-temperatura-humedad --single-branch https://github.com/unla-investigacion-desarrollo/ecosistema-iot```.

2. Si no lo tiene aún, **instale Node.js**. Puede **verificar si lo tiene instalado** con el comando ```node -v```. Para **instalarlo**, puede ir a la **[página oficial de Node.js](https://nodejs.org/en)** y **elegir la versión según el sistema operativo que tenga**. Es **importante** elegir alguna que tenga la **nomenclatura LTS** ya que son las **versiones que nos aseguran que van a tener soporte por un largo periodo de tiempo**.

3. El siguiente paso consiste en **instalar yarn**. Puede **verificar si ya lo tiene instalado** con ```yarn -v```. Para **instalarlo**, utilice el comando ```npm install -g yarn```.

4. Ahora debe **instalar las dependencias del proyecto**. Por lo tanto, ejecute el comando ```yarn```.

5. Ya cuenta con todo lo necesario para **correr el frontend**. Con el comando ```yarn dev``` puede hacerlo. Una vez que el servicio haya levantado, **puede consumirlo en http://localhost:3000**.

6. Para **interrumpir la ejecución del servicio** presione ```Ctrl + C``` en su teclado teniendo el cursor seleccionado sobre la consola con la que puso a ejecutarlo.

### Consideraciones
Este proyecto consiste en un frontend que se conecta a la API anteriormente mencionada. Por lo tanto, **si usted corre este proyecto sin tener en funcionamiento el de la API, obviamente no va a visualizar los registros que están almacenados en la base de datos de MongoDB Atlas que consume la API**.

*Para una mejor apreciación del desarrollo, le pedimos que siga el paso a paso definido en el readme de [API Mediciones](https://github.com/unla-investigacion-desarrollo/ecosistema-iot/tree/api-mediciones)*.

¡Muchas gracias por tu atención!
