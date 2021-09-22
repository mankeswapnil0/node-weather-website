const request = require('request')

const geocode = (address,callback) => {
    const loc_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1IjoibWFua2Vzd2FwbmlsMCIsImEiOiJja3J3enZwMTgwbGhhMm5xbm16M2VrNnRsIn0.VoFz_4v7QSFQBFVh_YwkkQ&limit=1'
    request({ url:loc_url , json:true}, (error,{body}) => {
    if(error){
        callback('Unable to connect to location services',undefined);
    }else if(body.features.length === 0){
        callback('Unable to find location!',undefined);
    }else{
        const data = {
            latitude:  body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
        }
        callback(undefined,data)
    }
})
}

module.exports = geocode