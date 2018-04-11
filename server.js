
var express        = require('express');  
var app            = express();  
var httpServer = require("http").createServer(app);  
var five = require("johnny-five");  
var io=require('socket.io')(httpServer);

var port = 3000; 

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {  
        res.sendFile(__dirname + '/public/index.html');
});

httpServer.listen(port);  
console.log('Server available at http://localhost:' + port);  
var led;


var board = new five.Board();  
board.on("ready", function() {  
    console.log('Arduino connected');
    led = new five.Led(13);
});

io.on('connection', function (socket) {  
        console.log(socket.id);

        socket.on('led:on', function (data) {
		console.log('LED ON RECEIVED');
           led.on();
           
        });

        socket.on('led:off', function (data) {
		console.log('LED OFF RECEIVED');
            led.off();
            

        });
    });

console.log('Waiting for connection');

