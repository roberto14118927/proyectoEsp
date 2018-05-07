//https://www.youtube.com/watch?v=G_FlX41qADE
//https://es.coursera.org/learn/aplicaciones-android/lecture/IeLYO/ejemplo-conectando-servidor-node-js-con-base-de-datos-firebase

var firebase = require('firebase');

firebase.initializeApp({
    serviceAccount: "./esp8266-dacaa-147646623b44.json",
    databaseURL: "https://esp8266-dacaa.firebaseio.com"
});

var ref = firebase.database().ref('esp8266-dacaa');
var dato;
var dbRef = firebase.database().ref().child('LED_STATUS');
dbRef.on('value', snap => dato = snap.val());
console.log(dato)
// ref.child('LED_STATUS').on('value', function(snap){
//     logs = snap.val();
//     console.log(logs);
// });