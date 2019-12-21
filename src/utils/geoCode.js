const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibGl0ZW0xIiwiYSI6ImNrMzkzdjlrdDBmMWczam92b2NldWZxNTYifQ.JClmS5aqkScwn_232r95Qw&limit=1'
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location services (Mapbox)', undefined)
        } else if (body.features.length === 0) {
            callback('The searched location was not found, please try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })

        }
    })
}

module.exports = geoCode
