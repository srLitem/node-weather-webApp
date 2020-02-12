const request = require('request')
const dotenv = require('dotenv').config({ path: __dirname + '/../../.env' })

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/' + process.env.DARKSKY_KEY + '/' + latitude + ',' + longitude + '?units=si'
    console.log(url)
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location services (Darksky)', undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            Response = {
                temperature: body.currently.temperature,
                message: body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out.',
                forecast: body.daily.data[0].summary,
                summary: body.currently.summary,
                iconito: body.currently.icon,
                precipProbM: 'There is a ' + (body.currently.precipProbability * 100) + '% chance of rain',
                precip: body.currently.precipProbability * 100,
            }
            callback(undefined, Response)
        }
    })
}

module.exports = forecast
