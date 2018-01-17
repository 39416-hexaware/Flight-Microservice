const fs = require('fs');
// const FlightAPIKEY = 'sl5zmz3g1w';
var api = '';

module.exports.headerTemplate = function () {
    var header = {
        'Cache-Control': 'no-cache',
        Accept: 'application/json',
        'Content-Type': 'application/json'
    };
    return header;
}

var APIList = {
    'FlightIntent.RescheduleFlight': (date) => {
        console.log('Inside CancelIntent');
        // api = 'https://api.railwayapi.com/v2/cancelled/date/'+ dateFormatter(date) +'/apikey/' + RailAPIKEY; //Date Format: <dd-mm-yyyy>
        return api;
    },
    'FlightIntent.FlightFacilities': (pnrnumber) => {
        console.log('Inside PNRStatus');
        // api = 'https://api.railwayapi.com/v2/pnr-status/pnr/'+ pnrnumber +'/apikey/' + RailAPIKEY;
        return api;
    },
    'FlightIntent.FlightCheckIn': (trainnumber) => {
        console.log('Inside TrainRoute');
        // api = 'https://api.railwayapi.com/v2/route/train/'+ trainnumber +'/apikey/' + RailAPIKEY;
        return api;
    },
    'FlightIntent.CancelFlight': (stationname) => {
        console.log('Inside TrainRoute');
        // api = 'https://api.railwayapi.com/v2/name-to-code/station/'+ stationname +'/apikey/' + RailAPIKEY;
        return api;
    },
    'FlightIntent.FlightStatus': (stationname) => {
        console.log('Inside TrainRoute');
        // api = 'https://api.railwayapi.com/v2/name-to-code/station/'+ stationname +'/apikey/' + RailAPIKEY;
        return api;
    }
};

var generateTicket = function (prefix) {
    var rn = Math.floor(Math.random() * 90000) + 10000;
    var result = prefix.toUpperCase().substring(0, 5) + rn;
    console.log(result);
    return result;
};

var BookFlightTicket = function (boardingPoint, destination, travelDate, noOfTickets, ticketno) {
    return {
        "ticketnumber": ticketno,
        "airport": {
            "code": "CHN",
            "name": "Chennai, CH: Chennai International"
        },
        "statistics": {
            "flights": {
                "status": "Scheduled",
                "departure": boardingPoint,
                "destination": destination,
                "totaltickets": noOfTickets
            }
        },
        "date": {
            "day": travelDate.split('-')[2],
            "year": travelDate.split('-')[0],
            "month": travelDate.split('-')[1]
        },
        "carrier": {
            "code": "AI",
            "name": "Air India"
        }
    }
}

function writeJSON(JSONobj) {
    console.log('Inside json write');
    // var obj = {
    //     result: []
    // };
    // obj.result.push(JSONobj);

    // var json = JSON.stringify(obj);

    fs.readFile('data/airlines.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('writing');
            var obj = JSON.parse(data); //now it an object
            obj.result.push(JSONobj); //add some data
            var json = JSON.stringify(obj); //convert it back to json
            fs.writeFile('data/airlines.json', json, 'utf8'); // write it back 
        }
    });
}

module.exports.APIList = APIList;
module.exports.generateTicket = generateTicket;
module.exports.BookFlightTicket = BookFlightTicket;
module.exports.writeJSON = writeJSON;