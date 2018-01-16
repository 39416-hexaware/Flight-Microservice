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
    var rn = Math.floor(Math.random()*90000) + 10000;
    var result = prefix.toUpperCase().substring(0,5) + rn;
    console.log(result);
    return result;
};

module.exports.APIList = APIList;
module.exports.generateTicket = generateTicket;