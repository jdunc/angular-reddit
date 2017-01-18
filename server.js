var express = require('express');
var path = require('path');
var app = express();
const port = process.env.PORT || 8000;
// Define the port to run on

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'warmup')));

// Listen for requests
app.listen(port, () => {
  console.log('Listening on port', port);
});
