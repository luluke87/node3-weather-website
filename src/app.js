"use strict"

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const chalk = require('chalk')
const { geocode1, geocode2 } = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//configuring paths
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '/../templates/views')
const partialPaths = path.join(__dirname, '../templates/partials')

//handlebars is now set up
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPaths)


//it's a way to customize the server......what does this do? here we have all out static content
//this content does not change. but now we use a template engine for a dynamically rendered homepage
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ludwig Ostermeier'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: 'How can I help you?',
        title: 'Weather App',
        name: 'Ludwig Ostermeier'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App',
        name: 'Ludwig Ostermeier'
    })
})


app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }

    let address = req.query.address

    geocode2(address, (error, { latitude, longitude, location } = {}) => { //only one gets a value. the other is undefined
        if (error) {
            console.log(error)
            return res.send({
                error: "Geocode produced a mistake. Seems like location could not be found"
            })
        }

        forecast(latitude, longitude, (error, foreCastdata) => {
            if (error) {
                console.log(error)
                return res.send({
                    error: "forecastmodule produced a mistake"
                })
            }
            let weather = `It is currently ${foreCastdata.weather_descriptions}. There is a ${foreCastdata.precip} % chance of rain.`
            res.send({
                location,
                address: req.query.address,
                forecast: weather,
            })
        })
    })
})

/*
Mit ? kann ich einen querystring einleiten. Der steckt in Express im req drin.
req.query.'queryterm' kann ich auf die jeweiligen Parameter zugreifen


Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
we can not answer twice to a http request. in this case down there we have the res.send twice.....return stops the function....
*/
app.get('/products', (req, res) => {
    //runnning if no search term is provided
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: 'Weather App',
        name: 'Ludwig Ostermeier',
        msg: 'Help page not found!!'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: 'Weather App',
        name: 'Ludwig Ostermeier',
        msg: '404 Page not found'
    })
})

//app.com 
//app.com/help
//app.com/about

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})