#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <time.h>
#include "DHT.h"

// WiFi
const char *ssid = "MovistarFibra-101970"; 
const char *password = "2F58v7sDwhcFEDMr5sw2";  

// MQTT Broker
const char *mqtt_broker = "192.168.1.39";
const char *topic = "emqx/esp32";
const char *mqtt_username = "userEmi";
const char *mqtt_password = "unlaiot";
const int mqtt_port = 1883;

WiFiClient espClient;
PubSubClient client(espClient);

// DHT11
#define DHTPIN 4 // Digital pin connected to the DHT sensor
#define DHTTYPE DHT11 // DHT 11

// Initialize DHT sensor.
DHT dht(DHTPIN, DHTTYPE);


void setup() {
  Serial.begin(115200);

  // Conectar a WiFi
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.println("Conectando a WiFi...");
    }
    Serial.println("Conectado a WiFi.");

  // Configurar horario
    configTime(-3 * 3600, 0, "pool.ntp.org"); // Argentina = UTC-3

  // Esperar sincronización
  struct tm timeinfo;
  while (!getLocalTime(&timeinfo)) {
    Serial.println("Esperando sincronización NTP...");
    delay(1000);
  }
  Serial.println("Hora sincronizada con NTP.");

  // Conectar a MQTT
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
  client.loop();
  // Reading temperature or humidity takes about 250 milliseconds!
  float h = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();

   if (isnan(h) || isnan(t)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }

  // Compute heat index in Celsius (isFahreheit = false) [Sensacion Termica]
  float hic = dht.computeHeatIndex(t, h, false);
   
  Serial.print(F("Humidity: "));
  Serial.print(h);
  Serial.print(F("%  Temperature: "));
  Serial.print(t);  
  Serial.print(F("°C "));
  Serial.print(F("  Heat index: "));
  Serial.print(hic);
  Serial.println(F("°C "));

  struct tm timeinfo;
  getLocalTime(&timeinfo);

  // Formatear fecha y hora como string ISO 8601
  char fechaHora[25];
  strftime(fechaHora, sizeof(fechaHora), "%Y-%m-%dT%H:%M:%S", &timeinfo);



  // Crear documento JSON
  StaticJsonDocument<128> doc;
  doc["temperatura"] = t;
  doc["humedad"] = h;
  doc["fechaHora"] = fechaHora;

  // Serializar JSON a string
  char buffer[128];
  serializeJson(doc, buffer);

  // Publicar en un solo topic (podés cambiarlo si querés)
  client.publish("clima/esp32", buffer);

  delay(5000);
}

