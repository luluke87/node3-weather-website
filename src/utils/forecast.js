"use strict"

const request = require('request')
const axios = require('axios')

const url = 'http://api.weatherstack.com'

const wxRequest = () => {
    axios({
        method: 'get',
        url: '/current',
        baseURL: url,
        params: {
            access_key: '4ea8c2be11ac1563291e3fe55ebd0df9',
            query: '45.7831,-79.9712'
        },
        responseType: 'json'
    }).then(function ({data}) { //destructured version of response.data
        console.log(data)
    })
    .catch(function (error) {
        //console.log(error);
        console.log(chalk.red('unable to connect to services'))
    })
    .finally(function () {
        // always executed
    })
}

const forecast = (latitude, longitude, callback) => { 
    //the adress is encoded. this fct returns a string. thats important if an adress is searched that contains sepcial characters
    const url =  'http://api.weatherstack.com/forecast?access_key=4ea8c2be11ac1563291e3fe55ebd0df9&query='+latitude+','+longitude
    request({url: url, json: true}, (error, {body}) => {
     if (error) {
         callback('unable to connect to weather services!',undefined) 
     } else if (body.error) {
        callback('unable to find location', undefined)
     } else {
         callback(undefined, 
            body.current)
     }
    })
 }

module.exports = forecast
  