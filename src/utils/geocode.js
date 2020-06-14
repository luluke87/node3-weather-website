"use strict"

const request = require('request')
const axios = require('axios')
const chalk = require('chalk')

const geocode1 = (address) => {

    const data = {
        latitude: 0,
        longitude: 0
    }
    axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?', {
        params: {
            access_token: 'pk.eyJ1IjoibHVsdWtlMTI4NyIsImEiOiJja2I1OGVpZnIwajhzMnBwZHZuaHhxbmV3In0.oOKre8O01JXmRcghQjDpdw',
            limit: '1',
        }
    }).then(function (response) {
        // handle success
        if (response.data.features.length === 0) {
            console.log(chalk.red('location could not be find'))
        }
        const latitude = response.data.features[0].center[0]
        const longitude = response.data.features[0].center[1]
        const location= response.data.features[0].place_name
        console.log(`location: ${location} lat: ${latitude} // long ${longitude}`)
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    })
}


const geocode2 = (address, callback) => { //the adress is encoded. this fct returns a string. thats important if an adress is searched that contains sepcial characters
   const url =  'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibHVsdWtlMTI4NyIsImEiOiJja2I1OGVpZnIwajhzMnBwZHZuaHhxbmV3In0.oOKre8O01JXmRcghQjDpdw&limit=1'
   request({url: url, json: true}, (error, {body}) => {
    if (error) {
        callback('unable to connect to location services!')
    } else if (body.features.length === 0) {
        callback('unable to connect to find location! try another search')
    } else {
        callback(undefined, {
            latitude: body.features[0].center[1], 
            longitude: body.features[0].center[0],
            location: body.features[0].place_name 
        })
    }
   })
}

module.exports = {
    geocode1: geocode1,
    geocode2: geocode2,
}
