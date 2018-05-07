#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>
// Set these to run example.
#define FIREBASE_HOST "esp8266-dacaa.firebaseio.com"
#define FIREBASE_AUTH "keniI289RvalAng5CbRTgls9rHe49eSDNRqHHC0D"
//Change line with your WiFi router name and password
#define WIFI_SSID "UPGCH_EXT"  
#define WIFI_PASSWORD "paguach1ta"

void setup() {
    Serial.begin(9600);
    pinMode(D1,OUTPUT);
    // connect to wifi.
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("connecting");
    while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
    }
    Serial.println();
    Serial.print("connected: ");
    Serial.println(WiFi.localIP());
    Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
    Firebase.set("LED_STATUS", 0);
}
int n = 0;
int led = 0;
void loop() {
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
    /*delay(500);
    // update value
    Firebase.setInt("Numero", 28);
    // handle error
    if (Firebase.failed()) {
    Serial.print("setting /number failed:");
    Serial.println(Firebase.error());  
    return;
    }*/
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
    /*delay(1000);
    // set bool value
    Firebase.setBool("truth", false);
    // handle error
    if (Firebase.failed()) {
    Serial.print("setting /truth failed:");
    Serial.println(Firebase.error());  
    return;
    }*/
    delay(1000);
    // append a new value to /logs
    /*String name = Firebase.pushInt("logs", n++);
    // handle error
    if (Firebase.failed()) {
    Serial.print("pushing /logs failed:");
    Serial.println(Firebase.error());  
    return;
    }
    Serial.print("pushed: /logs/");
    Serial.println(name);
    delay(1000);*/
}