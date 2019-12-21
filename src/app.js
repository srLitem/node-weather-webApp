const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode.js')
const forecast = require('./utils/forecast.js')


const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const public_dir = path.join(__dirname, '../public')
const views_path = path.join(__dirname, '../templates/views')
const partial_path = path.join(__dirname, '../templates/partials')

// Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', views_path)
hbs.registerPartials(partial_path)

// Setup static directory to serve
app.use(express.static(public_dir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Santiago Rhenals'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Santiago Rhenals'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        help_text: 'This is a very helpful text',
        name: 'Santiago Rhenals'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send('No address provided')
    }
    //Llamar a geocode para retornar las coordenadas de la ubicacion
    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) { //Si hay algun error, muestralo
            return res.send({ error })
        } else {
            forecast(latitude, longitude, (error, forecastData) => { //Llamar a forecast para buscar el pronostico de las coordenadas
                if (error) { //Si hay algun error, muestralo
                    return res.send({ error })
                } else {

                    res.send({
                        forecast: forecastData,
                        location,
                        address: req.query.address
                    })
                }
            })
        }
    })
    // res.send({
    //     address: req.query.address,
    //     forecast: 'It\'s sunny outside',
    //     location: 'Amsterdam'
    // })
})



app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } else {

    }

    console.log(req.query.search)
    res.send({
        products: []
    });
})

// "*" This is provided by express to know a "Match anything that has not been matched so far"
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Santiago Rhenals',
        message: 'Error, no "Help" page found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Santiago Rhenals',
        message: 'Error, URL not found'
    })
})

app.listen(port, () => console.log('The server is up on port ' + port))