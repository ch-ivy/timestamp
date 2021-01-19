// server.js
// where your node app starts

// init project
var express = require('express');
const morgan = require("morgan");
const bodyParser = require("body-parser");


var app = express();
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.status(200).json({ greeting: 'hello API' });
});

//Timestamp API endpoint...
app.get('/api/timestamp/:date?', (req, res) => {
  var date = req.params.date;
  var result = {
    unix: '', utc: ''
  }
  if (!date) {
    result.unix = new Date().getTime();
    result.utc = new Date().toUTCString();
    res.status(200).json(result);
  }
  else {
    if (/\d{5,}/.test(date)) {
      const dateInt = parseInt(date);
      //Date regards numbers as unix timestamps, strings are processed differently
      res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString() });
    } else {
      let dateObject = new Date(date);

      if (dateObject.toString() === "Invalid Date") {
        res.json({ error: "Invalid Date" });
      } else {
        res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
      }
    }
  })

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
