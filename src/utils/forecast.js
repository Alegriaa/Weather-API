const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c56f5d71e1c90c0e62d15a6dad3bfb72&query=' +
        latitude + ',' + longitude + '&units=f'

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)

        } else {
            const temp = body.current.temperature
            const feelsLike = body.current.feelslike
            const humidity = body.current.humidity
            const weatherDescription = body.current.weather_descriptions[0]
                // console.log(body.daily.data[0])
            callback(undefined, weatherDescription + ". It is currently " + temp + " degrees out. It feels like " +
                feelsLike + " degrees out. The humidity is currently " + humidity + "%.")

        }
    })


}


module.exports = forecast