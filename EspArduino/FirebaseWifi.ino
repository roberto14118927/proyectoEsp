#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>
#include <ArduinoOTA.h>
#include <ESP8266WiFiMulti.h>
ESP8266WiFiMulti wifiMulti;
// Set these to run example.
#define FIREBASE_HOST "esp8266-dacaa.firebaseio.com"
#define FIREBASE_AUTH "keniI289RvalAng5CbRTgls9rHe49eSDNRqHHC0D"

void setup() {
    Serial.begin(9600);
    WiFi.mode(WIFI_STA);
    wifiMulti.addAP("INFINITUM2485_2.4", "Pk3F00FMYC");
    wifiMulti.addAP("UPGCH_EXT", "paguach1ta");
    pinMode(D1,OUTPUT);
    if(wifiMulti.run() == WL_CONNECTED) {
        Serial.println(WiFi.localIP());
    }

    ArduinoOTA.onStart([]() {
      Serial.println("Start");
    });
    ArduinoOTA.onEnd([]() {
      Serial.println("\nEnd");
    });
    ArduinoOTA.onProgress([](unsigned int progress, unsigned int total) {
      Serial.printf("Progress: %u%%\r", (progress / (total / 100)));
    });
    ArduinoOTA.onError([](ota_error_t error) {
      Serial.printf("Error[%u]: ", error);
      if (error == OTA_AUTH_ERROR) Serial.println("Auth Failed");
      else if (error == OTA_BEGIN_ERROR) Serial.println("Begin Failed");
      else if (error == OTA_CONNECT_ERROR) Serial.println("Connect Failed");
      else if (error == OTA_RECEIVE_ERROR) Serial.println("Receive Failed");
      else if (error == OTA_END_ERROR) Serial.println("End Failed");
    });
    ArduinoOTA.begin();
    Serial.println(WiFi.localIP());
    Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
    Firebase.set("LED_STATUS", 0);
}
int n = 0;
int led = 0;
bool ota_flag = true;
uint16_t time_elapsed=0; 
void loop() {
    if(ota_flag){
      while(time_elapsed < 15000){
          ArduinoOTA.handle();
          time_elapsed = millis();
          delay(10);
      }
      ota_flag = false;
    }
    led = Firebase.getInt("LED_STATUS");
    if(led == 1){
      Serial.println("Led On");
      digitalWrite(D1,HIGH);
    }
    if(led == 0){
      Serial.println("Led Off");
      digitalWrite(D1,LOW);
    }
    // set value
    Firebase.setInt("Numero", n++);
    // handle error
    if (Firebase.failed()) {
    Serial.print("setting /number failed:");
    Serial.println(Firebase.error());  
    return;
    }
    delay(1000);
    // get value 
    Serial.print("number: ");
    Serial.println(Firebase.getFloat("number"));
    delay(1000);
    // remove value
    Firebase.remove("number");
    delay(1000);
    // set string value
    Firebase.setString("Nombre", "Roberto Eduardo");
    Firebase.setString("Apellido", "Guzman Ruiz");
    // handle error
    if (Firebase.failed()) {
    Serial.print("setting /message failed:");
    Serial.println(Firebase.error());  
    return;
    }
    delay(1000);
}