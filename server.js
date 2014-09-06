const port = 5000;
var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.redirect('/runner.html');
});

app.use(express.static(__dirname));
app.listen(port);

console.log('Listening on port: ' + port);
