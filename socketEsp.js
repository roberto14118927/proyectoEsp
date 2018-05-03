var express = require('express');
var app = express();
app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow- Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
        next();
    });

const net = require('net');
//const hex2ascii = require('hex2ascii');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const os = require('os');
//const { Pool, Client } = require('pg')

/*const client = new Client({
  user: 'gps',
  host: 'localhost',
  database: 'upgch',
  password: 'gps123456',
  port: 5432,
});*/
var datosin;
/*const client = new Client({
  user: 'gps',
  host: '142.44.162.71',
  database: 'gpsdb',
  password: 'gps123456',
  port: 5432,
});*/

//client.connect();

var conta = 0;
var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
  for (var k2 in interfaces[k]) {
    var address = interfaces[k][k2];
    if (address.family === 'IPv4' && !address.internal) {
      addresses.push(address.address);
    }
  }
}

//app.use(express.static('static/js'))

var HOST = addresses[2];
var PORT = 3000;
server.listen(1234);
var arr;
var arr1;
var global_imei="";

const esp_sockets = {};
var web_sockets = [];
var app_users = {};

var mac_in = "";
var CLIENTES=[];//{id,socket_id}
io.on('connection', function(socket) {
  console.log('Cliente Web Conectado: '+socket.id);

  socket.on('app_user', function(user) {
    app_users[user.id] = user;
  });
  
  socket.on('disconnect', function() {
    console.log("Cliente Web Descnectado")
    //delete app_users[socket.store.id];
  });

  socket.on('end', function() {
      
  });

  socket.on('error', function() {

  });

  socket.on('timeout', function() {
      
  });

  socket.on('close', function() {
      
  });

  socket.on('open-esp', function(data) {
    sendData(data);
  });

});


io.on('error',function(err){ 
  console.error(err)
});


server.listen(PORT, function(){
  console.log("Servidor corriendo puerto: " + PORT + " IP: " + HOST)
});



var ESP8266 = net.createServer(function(sock) {
    sock.on('data', function(data) {    
      datosin = data.toString()//.split(".");
      console.log(datosin) 
      if (datosin.length == 0) {
         return;
      }
      switch (datosin[1]) {
        case "0": // registro de dispositivo
            /*esp_sockets[datosin[0]] = sock; 
            mac_in=datosin[0];
            const text = 'SELECT * FROM gps_espregister WHERE mac=($1)'
            const values = [mac_in]
            client.query(text, values, (err, res) => {
              //done();
              if (err) {
                  //Dispositivo no resgistrado   
              } else {
                  console.log(res.rows[0])
                  if(res.rows[0] == null){
                    console.log("Registro exitoso")
                    var dt = new Date();
                    var utcDate = dt.toUTCString();
                    const text = 'INSERT INTO gps_espregister(mac, date_create, cmp_name) VALUES($1, $2, $3) RETURNING *'
                    const values = [datosin[0], utcDate, datosin[2]]
                    client.query(text, values, (err, res) => {
                      if (err) {
                          console.log(err.stack)
                      } else {
                          console.log(res.rows[0])
                        }
                    });
                  }
                }
            });*/
        break;
        case "1":
            console.log("Recepcion de datos");
        break;

        case "2":
            console.log("Bonton ok");
        break;
      } 
      console.log("CONECTADO: " + Object.keys(esp_sockets).length);
    });
    
    sock.on('close', function(data) {
      console.log("close...");
      //delete esp_sockets[sock.store.datosin[0]];
      /*var idx = esp_sockets.indexOf(sock);
          if (idx != -1) {
            esp_sockets.splice(idx, 1);
          }*/
      
    });

    sock.on('end', function() {
      //delete esp_sockets[sock.store.datosin[0]];
      /*var idx = esp_sockets.indexOf(sock);
          if (idx != -1) {
            esp_sockets.splice(idx, 1);
          }*/
      console.log("end...");
    });

    sock.on('timeout', function(data) {
      console.log("timeout...");
    });

    sock.on('error', function(data) {
      //delete esp_sockets[sock.store.datosin[0]];
      console.log("error...");
    });

});

ESP8266.on('error', function(e) { 
  console.log("Error: Necesario reiniciar...");
  if (e.code == 'EADDRINUSE') {
    console.log('Address in use, retrying...');
    setTimeout(function() {
      ESP8266.close();
      ESP8266.listen(PORT, PORT);
    }, 1000);
  }
});




ESP8266.listen(PORT, PORT);

//FUNCIONES*********************************
/*function sendData(data){
    var MAC = data.mac;
    for (var i = 0; i < MAC.length; i++) {
         MAC = MAC.replace("@#$%&", ":");
    }


   if (esp_sockets[MAC]) {
      try {
          esp_sockets[MAC].write("01");
          console.log("Enviado")
      } catch (err) {
          console.log("Error Envio");
        } 
  } 
  else {
      console.log("El dispositivo inactivo");
  }
}*/

    /*for (var socketid in esp_sockets){
      if(MAC == esp_sockets[socketid].datosin[0]){
        esp_sockets[MAC].write("01");
        console.log("Ok")
      }
      else{
        console.log("No")
      }
    }*/