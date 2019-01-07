//app.js for Node.js server
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname));     //serve static assets
console.log(express.static(__dirname)+'/');
app.get('*', function(req, res) {
    res.sendfile('./index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.listen(port, function() {
    console.log('Listening on ' + port);
});