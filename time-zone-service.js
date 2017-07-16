/* global etzone */

var express = require('express');
var app = express();
var time = require('time');

var port = process.env.PORT || 3000;

let serverOffetmS = 1100;

var timeZone = function(area,location,city) {
  if (area===null) {
    return new Error("Area can't be empty");
  }
  if (location===null) {
    return new Error("Location can't be empty");
  }
  if (city===null) {
    return area+'/'+location;
  } else {
    return area+'/'+location+'/'+city;
  }
};

// Call for getting the adjusted time back 2 part location
app.get('/getTime/:area/:location', function(req, res) {
  "use strict";
  logClientID(req);
  let time = require('time');
  let origNow = new time.Date();
  let now = (new time.Date(origNow.getTime() + serverOffetmS));
  let tzone = timeZone(req.params.area,req.params.location,null);
  if (tzone instanceof Error) {
    res.send(etzone);
  } else {
    now.setTimezone(tzone);
    var resultTime=now.getFullYear()+","+(now.getMonth()+1)+","+now.getDate()+","+now.getHours()+","+now.getMinutes()+","+now.getSeconds();
    res.send(resultTime);
  }
});

// Call for getting the adjusted time back 3 part location
app.get('/getTime/:area/:location/:city', function(req, res) {
  "use strict";
  logClientID(req);
  let origNow = new time.Date();
  let now = (new time.Date(origNow.getTime() + serverOffetmS));
  let tzone = timeZone(req.params.area,req.params.location,req.params.city);
  if (tzone instanceof Error) {
    res.send(etzone);
  } else {
    now.setTimezone(tzone);
    var resultTime=now.getFullYear()+","+(now.getMonth()+1)+","+now.getDate()+","+now.getHours()+","+now.getMinutes()+","+now.getSeconds();
    res.send(resultTime);
  }
});

// call for getting the time zone 2 part location
app.get('/getTimeZone/:area/:location', function(req, res) {
  "use strict";
  logClientID(req);
  let origNow = new time.Date();
  let now = (new time.Date(origNow.getTime() + serverOffetmS));
  let tzone = timeZone(req.params.area,req.params.location,null);
  if (tzone instanceof Error) {
    res.send(etzone);
  } else {
    now.setTimezone(tzone);
    var resultTimeZone=now.toString().split(" ")[6];
    res.send(resultTimeZone.replace('(','').replace(')',''));
  }
});

// call for getting the time zone 3 part location
app.get('/getTimeZone/:area/:location/:city', function(req, res) {
  "use strict";
  logClientID(req);
  let origNow = new time.Date();
  let now = (new time.Date(origNow.getTime() + serverOffetmS));
  let tzone = timeZone(req.params.area,req.params.location,req.params.city);
  if (tzone instanceof Error) {
    res.send(etzone);
  } else {
    now.setTimezone(tzone);
    var resultTimeZone=now.toString().split(" ")[6];
    res.send(resultTimeZone.replace('(','').replace(')',''));
  }
});

// call for getting the time zone 2 part location
app.get('/getTimeOffset/:area/:location', function(req, res) {
  "use strict";
  logClientID(req);
  let origNow = new time.Date();
  let now = (new time.Date(origNow.getTime() + serverOffetmS));
  let tzone = timeZone(req.params.area,req.params.location,null);
  if (tzone instanceof Error) {
    res.send(etzone);
  } else {
    now.setTimezone(tzone);
    var resultTimeZone=now.toString().split(" ")[5];
    res.send(resultTimeZone);
  }
});

// call for getting the time zone 3 part location
app.get('/getTimeOffset/:area/:location/:city', function(req, res) {
  "use strict";
  logClientID(req);
  let origNow = new time.Date();
  let now = (new time.Date(origNow.getTime() + serverOffetmS));
  let tzone = timeZone(req.params.area,req.params.location,req.params.city);
  if (tzone instanceof Error) {
    res.send(etzone);
  } else {
    now.setTimezone(tzone);
    var resultTimeZone=now.toString().split(" ")[5];
    res.send(resultTimeZone);
  }
});

// Call for getting the adjusted time back 2 part location
app.get('/getTimeRaw/:area/:location', function(req, res) {
  "use strict";
  logClientID(req);
  let origNow = new time.Date();
  let now = (new time.Date(origNow.getTime() + serverOffetmS));
  let tzone = timeZone(req.params.area,req.params.location,null);
  if (tzone instanceof Error) {
    res.send(etzone);
  } else {
    now.setTimezone(tzone);
    var resultTime=now.toString();
    res.send(resultTime);
  }
});

// Call for getting the adjusted time back 3 part location
app.get('/getTimeRaw/:area/:location/:city', function(req, res) {
  "use strict";
  logClientID(req);
  let origNow = new time.Date();
  let now = (new time.Date(origNow.getTime() + serverOffetmS));
  let tzone = timeZone(req.params.area,req.params.location,req.params.city);
  if (tzone instanceof Error) {
    res.send(etzone);
  } else {
    now.setTimezone(tzone);
    var resultTime=now.toString();
    res.send(resultTime);
  }
});

function logClientID(request) {
  if ((request.headers.clientid !== undefined) && (request.headers.esp !== undefined)) {
    console.log('Client: ' + request.headers.clientid + ' --> ' + request.headers.esp);
  }
}

app.listen(port);
console.log('Listening on port '+port+'...');
