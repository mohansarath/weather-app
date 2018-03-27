const request = require('request');

const geocodeAddress = (address,callback) => {
    const url = encodeURIComponent(address)

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${url}&key=AIzaSyChWOXtMjUBR4I61V5qrpz4UKnsu8Czudk`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect  to Google..');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find address');
        } else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            })
        }

    })
};

module.exports.geocodeAddress=geocodeAddress;