var express = require('express');
var router = express.Router();
let request = require('request');
const env = require('dotenv').config()

ipdata = "https://geoip-db.com/json/"
var citydata = '';
request(ipdata, function(err, res, body) {
  if(err){
    console.log('error:', error);
  } else {
    let weather = JSON.parse(body)
    citydata =weather.city;
    console.log(weather.longitude);
  }
});
  let apiKey = process.env.OPEN_WEATHERAPI
router.get('/', function(req, res, next) {
  let city = citydata;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=Metric` 
  request(url, function (err, response, body) {
    if(err){
      console.log('error:', err);
    } else {
      let weather = JSON.parse(body)
      let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
      console.log(message);
      res.render('form',{
        weathertemp : weather.main.temp,
        weathername : weather.name
      });
    }
  });
 
});
router.post('/citydata', function(req, res, next) {
 var user_city =  req.body.cityform;

//  console.log(c)
 res.send('success')

});
  

  


module.exports = router;
