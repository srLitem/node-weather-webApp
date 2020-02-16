const request = require('request')
const dotenv = require('dotenv').config({ path: __dirname + '/../../.env' })

const unsplash = (city, callback) => {
    const url = 'https://api.unsplash.com/search/photos?page=1&per_page=1&orientation=portrait&query=' + encodeURIComponent(city) + '&client_id=' + process.env.UNSPLASH_KEY
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to Unsplash image provider', undefined)
        } else if (body.results.length === 0) {
            callback('The searched location was not found as an image, please try another search', undefined)
        } else {
            callback(undefined, {
                imageURL: body.results[0].urls.small,
            })

        }
    })
}

module.exports = unsplash
