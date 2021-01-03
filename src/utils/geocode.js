const request = require('request')
const geocode = (address, callback) => {
    // dynamic url
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWxlZ3JpYWNvZGluZyIsImEiOiJja2l5OXJhbHUwNGpiMzFzNDRmbXA3MzY4In0.Jz6gJSEhh6p5-F91WxjEBg&limit=1'
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            // undefined will be provided for the second argument if none is given
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location, try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name

            })



        }
    })
}

// const url = 'http://api.weatherstack.com/current?access_key=c56f5d71e1c90c0e62d15a6dad3bfb72&query=37.8270,-122.2712&units=f'


// // takes to arguments, the object containing the url, and a function,
// // which also takes two arguments 
// // json true - parse this as json
// request({ url: url, json: true }, (error, response) => {
//     // const data = JSON.parse(response.body)
//     // console.log(data.current)

//     // lower OS error
//     if (error) {
//         console.log('Unable to connect to weather service')
//     } else if (response.body.error) {
//         console.log('Unable to find location')
//     } else {
//         const temp = response.body.current.temperature
//         const feelsLike = response.body.current.feelslike
//         const weatherDescription = response.body.current.weather_descriptions[0]

//         console.log(weatherDescription + ". It is currently " + temp + " degrees out. It feels like " +
//             feelsLike + " degrees out.")
//     }
// })


// geocode('Oakland', (error, data) => {
//     console.log('Error:', error)
//     console.log('Data:', data)
// })

module.exports = geocode