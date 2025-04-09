#include <WiFi.h>               // Librería para conectar el ESP32 a una red WiFi
#include <PubSubClient.h>       // Librería para conectarse a un broker MQTT
#include <ArduinoJson.h>        // Librería para generar mensajes JSON
#include <time.h>               // Librería para manejar fecha y hora con NTP
#include "DHT.h"                // Librería para usar el sensor de temperatura y humedad DHT

// WiFi
//const char *ssid = "MovistarFibra-101970"; 
//const char *password = "2F58v7sDwhcFEDMr5sw2";  

const char *ssid = "Lucy hotspot";  // Nombre de la red WiFi (SSID)
const char *password = "Emi12345";  // Contraseña de la red WiFi

// MQTT Broker
const char *mqtt_broker = "181.24.154.196";   // IP pública o local del broker MQTT
const char *topic = "emqx/esp32";             // Tópico de suscripción (no se usa para publicar en este caso)
const char *mqtt_username = "userEmi";        // Usuario MQTT
const char *mqtt_password = "unlaiot";        // Contraseña MQTT
const int mqtt_port = 1883;                   // Puerto por defecto del protocolo MQTT

WiFiClient espClient;                         // Cliente para conexión WiFi
PubSubClient client(espClient);               // Cliente MQTT, usando la conexión WiFi como transporte

// DHT11
#define DHTPIN 4            // Pin digital al que está conectado el DHT11
#define DHTTYPE DHT11       // Tipo de sensor
DHT dht(DHTPIN, DHTTYPE);   // Inicializa el sensor DHT11


void setup() {
  Serial.begin(115200); // Inicia el puerto serial para depuración

  // Conectar a WiFi
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.println("Conectando a WiFi...");
    }
    Serial.println("Conectado a WiFi.");

  // Configuración de fecha y hora usando NTP
    configTime(-3 * 3600, 0, "pool.ntp.org"); // Argentina = UTC-3

  // Espera a que la sincronización de hora se complete
  struct tm timeinfo;
  while (!getLocalTime(&timeinfo)) {
    Serial.println("Esperando sincronización NTP...");
    delay(1000);
  }
  Serial.println("Hora sincronizada con NTP.");

  // Conexión al broker MQTT
    client.setServer(mqtt_broker, mqtt_port);
    client.setCallback(callback);

    while (!client.connected()) {
        String client_id = "esp32-client-" + String(WiFi.macAddress());
        Serial.printf("Conectando cliente %s al broker MQTT\n", client_id.c_str());

        if (client.connect(client_id.c_str(), mqtt_username, mqtt_password)) {
            Serial.println("Conectado a MQTT.");
        } else {
            Serial.print("Error en conexión MQTT, código: ");
            Serial.println(client.state());
            delay(2000);
        }
    }

    // Suscribir al tema MQTT
    client.subscribe(topic);

  // Iniciar DHT (?)
  dht.begin();
}
//función que se ejecuta si llega un mensaje MQTT
void callback(char *topic, byte *payload, unsigned int length) {
    Serial.print("Mensaje recibido en el topic: ");
    Serial.println(topic);
    Serial.print("Mensaje: ");
    for (int i = 0; i < length; i++) {
        Serial.print((char) payload[i]);
    }
    Serial.println();
    Serial.println("-----------------------");
}

void loop() {
  client.loop(); // Necesario para mantener la conexión MQTT activa
  
  // Leer datos del sensor
  float h = dht.readHumidity();     // Humedad
  float t = dht.readTemperature();  // Temperatura en Celsius
  //Validar que se hayan leído bien los datos
  if (isnan(h) || isnan(t)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }

  // Calcular la sensación térmica (Heat Index) [no se envia]
  float hic = dht.computeHeatIndex(t, h, false);
  //Mostrar los datos en el monitor serial
  Serial.print(F("Humidity: "));
  Serial.print(h);
  Serial.print(F("%  Temperature: "));
  Serial.print(t);  
  Serial.print(F("°C "));
  Serial.print(F("  Heat index: "));
  Serial.print(hic);
  Serial.println(F("°C "));

  //Obtener la fecha y hora actual
  struct tm timeinfo;
  getLocalTime(&timeinfo);

  // Formatear fecha y hora como string ISO 8601 (ej: 2025-04-09T23:41:00)
  char fechaHora[25];
  strftime(fechaHora, sizeof(fechaHora), "%Y-%m-%dT%H:%M:%S", &timeinfo);



  // Armar el JSON con los datos de temperatura, humedad y fecha-hora
  StaticJsonDocument<128> doc;
  doc["temperatura"] = t;
  doc["humedad"] = h;
  doc["fechaHora"] = fechaHora;

  // Serializar JSON a string
  char buffer[128];
  serializeJson(doc, buffer);

  // Publicar el mensaje en el topic MQTT clima/esp32
  client.publish("clima/esp32", buffer);
  //Esperar 5 segundos antes de volver a leer
  delay(5000);
}
//:)
