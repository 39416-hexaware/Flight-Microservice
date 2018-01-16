//imports
var express = require('express');
var bodyParser = require('body-parser');
var requestAPI = require('request');
var async = require('async');
const commonFiles = require('./util/commonfiles');
const data = require('./data/airlines.json');

app = express();
//Create express object

var port = process.env.PORT || 7002;
// var port = 7002;
//Assign port
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Configuring express app behaviour

app.get("/FlightMicroService", function (req, res) {
    res.send("Flight MicroService works");
});
//GET Endpoint

app.post("/FlightAPI", function (req, res) {
    console.log(JSON.stringify(req.body));

    if (req.body.IntentName == 'FlightIntent.BookFlight') {
        let prefix = 'PLANE';
        let boardingPoint = req.body.BoardingPoint;
        let destination = req.body.Destination;
        let travelDate = req.body.DateOfTravel;
        let noOfTickets = req.body.Tickets;
        let ticketno = commonFiles.generateTicket(prefix);
        let getJSON = commonFiles.BookFlightTicket(boardingPoint, destination, travelDate, noOfTickets, ticketno);

        console.log(getJSON);
        
        //Write JSON
        commonFiles.writeJSON();

        console.log('Flight Book Ticket');

        res.json(ticketno);
    }
    else {
        console.log('Inside Flight API');
        async.parallel([
            function (firstfn) {
                let intentFrom = req.body.IntentName;
                var url = '';

                if (intentFrom === 'FlightIntent.FlightFacilities') {
                    let pnrNumber = req.body.PNRNumber;
                    url = commonFiles.APIList[intentFrom](pnrNumber);
                    console.log(url);
                }
                else if (intentFrom === 'FlightIntent.FlightCheckIn') {
                    let trainNumber = req.body.TrainNumber;
                    url = commonFiles.APIList[intentFrom](trainNumber);
                    console.log(url);
                }
                else if (intentFrom === 'FlightIntent.CancelFlight' || intentFrom === 'FlightIntent.FlightStatus' || intentFrom === 'FlightIntent.RescheduleFlight') {
                    let ticketNumber = req.body.TicketNumber;
                    console.log(ticketNumber);
                    let arrIndex = data.result.findIndex(x => x.ticketnumber == ticketNumber);
                    firstfn(false, data.result[arrIndex]);
                }

                // var options = {
                //     url: url,
                //     method: 'GET',
                //     header: commonFiles.headerTemplate(),
                //     body: '',
                //     json: true
                // };

                // requestAPI(options, function (error, response, body) {
                //     if (error) {
                //         console.dir(error);
                //         return
                //     }
                //     else {
                //         console.log('status code:' + response.statusCode);

                //         console.log('Inside data process');
                //         firstfn(false, body);
                //     }
                // });
            }],
            function (err, result) {
                console.log('Inside Final Response Send of Flight API');
                res.json(result);
            });
    }
});
//POST Call Endpoint

console.log("Server Running at Port : " + port);

app.listen(port);