var request = require('request')

var forecast = (latitude,longitude, callback)=>{

var url = 'http://api.weatherstack.com/current?access_key=be7e28cccd456dbdd058cc29cdb0d950&query='+ longitude + ' , ' + latitude +'&units=f'

request({ url, json: true},(error,{ body}) =>{
 
    if(error){
        callback('unbale to find the web services', undefined)
    }else if(body.error){
        callback('unable to find the location', undefined)
    }else{
        callback(undefined, body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' degree out. There is a fill like '+body.current.feelslike +' .')
    }
})
}
module.exports = forecast;
