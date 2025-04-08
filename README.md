# 📡 Proyecto IoT: Monitoreo de Temperatura y Humedad

## 🧠 Etapa de Investigación

Antes de desarrollar el sistema final, realizamos una etapa de exploración donde investigamos y experimentamos con las siguientes tecnologías:

- **Sensor de Movimiento**: exploramos sensores básicos para detección de presencia, como base para entender la comunicación entre hardware y software.
- **ESP32**: microcontrolador Wi-Fi/Bluetooth que usamos para adquirir lecturas desde sensores y transmitirlas de forma inalámbrica.
- **MQTT (Mosquitto)**: protocolo de mensajería ligero ideal para IoT; aprendimos a usar Mosquitto como broker MQTT para intermediar entre dispositivos.
- **Node-RED**: plataforma visual de flujo para integración entre sistemas. Nos permitió trabajar con MQTT y hacer pruebas rápidas.
- **NestJS y GraphQL (Apollo Server)**: framework backend robusto y moderno que usamos para construir APIs modulares, escalables y tipadas.
- **MongoDB + Mongoose**: base de datos NoSQL flexible y orientada a documentos, utilizada con Mongoose para facilitar la conexión desde Node.js.

Esta fase fue clave para entender cómo se comunican los distintos componentes y evaluar qué tan bien se integran en un ecosistema IoT moderno.

---

## 🚀 Proyecto Final: Sistema de Monitoreo IoT

### 🎯 Objetivo

Diseñar e implementar un sistema completo de monitoreo en tiempo real de temperatura y humedad, desde el hardware hasta la visualización de datos en una interfaz web.

### 🔄 Flujo del Sistema

1. **Adquisición de Datos**  
   El sensor **DHT11** conectado al **ESP32** mide temperatura y humedad.

2. **Transmisión vía MQTT**  
   El ESP32 publica los datos en un **broker Mosquitto** mediante el protocolo **MQTT**.

3. **Procesamiento en Node-RED**  
   Un flujo en **Node-RED** se suscribe al topic MQTT, toma los datos y realiza una petición **GraphQL** a la API para registrar cada medición.

4. **API NestJS con GraphQL**  
   La API construida en **NestJS + Apollo Server** maneja, entre otros métodos:
   - Registro de mediciones.
   - Consulta de la última medición.
   - Promedios de las últimas *n* mediciones.
   - Consulta de las últimas *n* mediciones.

   Toda la información es almacenada en **MongoDB Atlas** utilizando **Mongoose**.

5. **Visualización Web (Next.js)**  
   El frontend hecho en **Next.js** muestra:
   - Dos gráficos tipo **gauge** (usando `react-gauge-chart`) con:
     - Última medición de temperatura y humedad.
     - Promedio de las últimas 10 mediciones.
   - Una **tabla con las últimas 10 mediciones**, incluyendo:
     - Fecha y hora
     - Temperatura
     - Humedad

---

## 🧱 Tecnologías Utilizadas

| Componente        | Tecnología             |
|------------------|------------------------|
| Sensor            | DHT11                  |
| Microcontrolador  | ESP32                  |
| Comunicación      | MQTT (Broker Mosquitto)|
| Orquestación      | Node-RED               |
| Backend           | NestJS + GraphQL (Apollo Server) |
| Base de datos     | MongoDB Atlas + Mongoose |
| Frontend          | Next.js + React Gauge Chart |

---

## 📊 Principales funcionalidades de la API

- `traerMedicionActual()`: Última medición registrada.
- `traerPromedioTemperatura(n)`: Promedio de temperatura de las últimas *n* mediciones.
- `traerPromedioHumedad(n)`: Promedio de humedad de las últimas *n* mediciones.
- `traerUltimasMediciones(n)`: Lista de las últimas *n* mediciones.

---

## 💡 Conclusiones

Este proyecto nos permitió no solo entender el funcionamiento individual de tecnologías modernas relacionadas con el IoT y el desarrollo web, sino también integrarlas en una solución real, escalable y visualmente atractiva.

Durante el proceso, pasamos de la teoría a la práctica, aprendiendo sobre:

- Integración de hardware y software.
- Comunicación en tiempo real mediante MQTT.
- Diseño de APIs modernas con GraphQL.
- Modelado y consulta de datos en MongoDB.
- Visualización efectiva de datos en una app web.
