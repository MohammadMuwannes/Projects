// if the project is not in production then config the env file
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const wrapAsync = require('./wrapAsync.js');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mabBoxToken = process.env.MAPBOX_TOKEN; //the mapbox token which is mostly private
const geoCoder = mbxGeocoding({ accessToken: mabBoxToken }); //passing the token to mapbox

//setting the view engine and templating type
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// parsing the body to access the request-body 
app.use(express.urlencoded({ extended: true }));


// linking the get & post route with the same url and rendering the same template to minimize the loading time
//adding a wrap async method to catch any errors without try and catch
app.route('/map')
    .get(wrapAsync(async (req, res) => {
        res.render('map', {coordinates:[5,7]}); // its first rendered with deafult coordinates
    }))
    .post(wrapAsync(async (req, res) => {
        const geoData = await geoCoder.forwardGeocode({ //the post route is async to await the geodata fetch
            query: req.body.search, //sending the query via the search bar input
            limit: 1
        }).send()
        if(geoData.body.features.length === 0){ //basic error handling if the location is not in the geodata features array
           res.send('this is an invalid location')
        }
        const coordinates = geoData.body.features[0].geometry.coordinates; // this returns a geoJSON
        res.render('map', { coordinates: coordinates }); // rendering the map with the acutal coordiantes for the location
  
    }));

// express port 'localhost:8080'
app.listen(8080, () => {
    console.log('serving');
})
