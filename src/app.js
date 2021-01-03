// here express is a function
// calling it to create a new express app

// path - core node module
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// store the app
const app = express()

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))


// defining path for Express config
const publicDir = path.join(__dirname, '../public')

// setting up handlebars engine
app.set('view engine', 'hbs')

// setting up new path for views location
// changing the paths to our custom dir
const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath)

const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

app.use(express.static(publicDir))

// first argument - the url extension, 
// second argument - a function describing what to do when someone visits the url extension
// this function takes two arguments, the first - an object containing information about the incoming request to the server
// the second argument is the response methods to customize what we send back
// home route
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Brian Alegria'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Brian Alegria'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Brian Alegria',
        message: 'Hi, we are here to help in anyway you need'
    })

})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a location'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })

        })
        // res.send({
        //     location: 'Oakland',
        //     forecast: 45,
        //     address: req.query.address

    // })
})

// http has a single request and response 
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

// 404 pages that start with /help example
app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: 'Help Page Not Found!',
        name: 'Brian Alegria',
        message: 'The help article was not found'
    })
})

// 404 page set up *
app.get('*', (req, res) => {
    res.render('404page', {
        title: 'Page Not Found',
        name: 'Brian Alegria',
        message: 'The page you are lookinf for could not be found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})