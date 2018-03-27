const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            description: 'Address to be fetched',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

const url = encodeURIComponent(argv.address)
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${url}&key=AIzaSyChWOXtMjUBR4I61V5qrpz4UKnsu8Czudk`;

axios.get(geocodeUrl)
.then((response) => {

    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find address');
    }
    const lat = response.data.results[0].geometry.location.lat;
    const lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/4370410837e7192428d5158c2ba6d0e5/${lat},${lng}`
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);

}).then((response) => {

    const temperature = response.data.currently.temperature;
    const apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature} . But it feels like ${apparentTemperature}`);

}).catch((e) => {

    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to server');
    } else {
        console.log(e.message);
    }

});