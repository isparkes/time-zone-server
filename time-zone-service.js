var express = require('express');
var dateFormat = require('dateformat');

var app = express();

var port=3000;

var timeZone = function(area,city) {
  if (area==null) {
    return new Error("Continent can't be empty")
  }
  return area+'/'+city
}

// Call for getting the adjusted time back
app.get('/getTime/:area/:city', function(req, res) {
  var time = require('time')
  var now = new time.Date()
  var tzone = timeZone(req.params.area,req.params.city)
  if (tzone instanceof Error) {
    res.send(etzone)
  } else {
    now.setTimezone(tzone)
    var resultTime=dateFormat(now,"yyyymmdd HHMMss");
    res.send(resultTime);
  }
});

// call for getting the time zone
app.get('/getTimeZone/:area/:city', function(req, res) {
  var time = require('time')
  var now = new time.Date()
  var tzone = timeZone(req.params.area,req.params.city)
  if (tzone instanceof Error) {
    res.send(etzone)
  } else {
    now.setTimezone(tzone)
    var resultTimeZone=now.toString().split(" ")[6]
    res.send(resultTimeZone.replace('(','').replace(')',''));
  }
});

// call for getting the time zone
app.get('/getTimeOffset/:area/:city', function(req, res) {
  var time = require('time')
  var now = new time.Date()
  var tzone = timeZone(req.params.area,req.params.city)
  if (tzone instanceof Error) {
    res.send(etzone)
  } else {
    now.setTimezone(tzone)
    var resultTimeZone=now.toString().split(" ")[5]
    res.send(resultTimeZone);
  }
});

app.listen(port);
console.log('Listening on port '+port+'...');
