//imports
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

app = express();
//Create express object

var port = 7001;
//Assign port
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Configuring express app behaviour

app.get("/api", function (req, res) {
    res.send("Flight MicroService works");
});
//GET Endpoint

app.post("/api", function (req, res) {
    console.log(JSON.stringify(req.body.result.action));

    console.log('req.body.originalRequest.source');
});
//POST Call Endpoint

console.log("Server Running at Port : " + port);

app.listen(port);