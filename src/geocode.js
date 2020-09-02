var request = require('request')
var geocode = (address, callback)=>{

    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiY2h1ZGFzYW1hZGhhdmFsMjc3IiwiYSI6ImNrZTlzN3ZwcTI5aXEyem9ieDhqYjZnanEifQ.VVUQwsU2G49hOCgDttMOzQ&limit=1'

    request({ url, json: true},(error,{ body })=>{
        if(error){
            callback('unable to find the web services', undefined)
        }else if (body.features.length === 0){
            callback('unable to find the location', undefined)
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })            
        }
    })

}

module.exports = geocode;