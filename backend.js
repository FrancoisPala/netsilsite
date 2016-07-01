/**
 * Created by Jam on 06-Apr-16.
 */
"use strict";

var port = 8080;
var express = require('express');
//var _ = require('lodash');
var app = express();
var serv = require('http').Server(app);
var io = require('socket.io')(serv);
var util = require('util');

app.use(express.static('public'));
serv.listen(port);

function main () {
    console.log("yo");

    io.on('connection', function (socket) {

        console.log("client connected to the server");

        socket.on("sign in", function (data) {
            console.log("login attempt from client");
            let obj = JSON.parse(data);
            //request.post("http://192.168.99.100:12345/connect", {user:data[0], password:data[1]}, onConnect(data));

        });


        function onConnect (data) {
            console.log(data);
            /*request("http://192.168.99.100:12345/api", function(data) {
                console.log(data);
            });*/
        }



    });


}


main();