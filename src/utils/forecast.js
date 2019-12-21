const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/4e2de48cc1c6bf49371ef110a5b90c87/' + latitude + ',' + longitude + '?units=si'
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location services (Darksky)', undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            Response = {
                message: body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out.',
                iconito: body.currently.icon,
                precipProb: 'There is a ' + (body.currently.precipProbability * 100) + '% chance of rain'
            }
            console.log(Response.iconito)
            callback(undefined, Response)
        }
    })
}

module.exports = forecast
