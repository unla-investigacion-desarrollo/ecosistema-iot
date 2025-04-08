# agro-iot-unla-fiuba

# mosquitto

Para levantar el server de MQTT se deberá correr el comando "docker compose up" y tener un .env en la misma ruta donde se ubica el archivo docker-compose-yml, con el siguiente contenido:

{user cliente MQTT} = {pass cliente MQTT}

Si no generaste el usuario y password, se pueden crear con los siguientes comandos:
docker exec -it container-name sh
mosquitto_passwd -c /mosquitto/config/mosquitto.passwd username