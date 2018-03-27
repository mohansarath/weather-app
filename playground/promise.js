const request = require('request');

var geocode = (address) => {
    return new Promise((resolve, reject) => {
        const url = encodeURIComponent(address)

        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${url}&key=AIzaSyChWOXtMjUBR4I61V5qrpz4UKnsu8Czudk`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect  to Google..');
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find address');
            } else if (body.status === 'OK') {
                resolve( {
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                })
            }

        })
    });
};

geocode('695035').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
})