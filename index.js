var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

app.use(bodyParser());
app.use(express.static(__dirname + '/styles'));
app.use(express.static(__dirname + '/public'));

//Create the sql connection
var conn = mysql.createConnection({
    host: "sql7.freemysqlhosting.net",
    user: "sql7131875",
    password: "53p4btZ4VM",
    database: "sql7131875"
});


//Handle all get requests


//Return main page
app.get('/', function(req, res){
  res.sendFile('./login.html', {root:__dirname});
});


//Return success page
app.get('/success', function(req, res) {
    res.sendFile('./success.html', {root:__dirname});
});

//Return failure page
app.get('/failure', function(req, res){
  res.sendFile('./failure.html', {root:__dirname});
});






//Handle all post requests

//Handle go to login page req
app.post('/', function(req, res) {
    res.redirect('/login');
});

//Handle login req
app.post('/login', function(req, res) {


    var queryString = "select * from accounts where name= '" +
        req.body.username + "' and password = '" + req.body.password + "'";

    conn.query(queryString, function(error, results) {
        if (results=="") {
            res.redirect('failure');
        } else {
            res.redirect('success');
        }

    });


    //  res.redirect('/success');
});







//Handle 404 error
app.get('*', function(req, res) {
    res.send("This page doesn't exist");
});


//Listen on port 3000
app.listen(3000, function() {
    console.log("Listening on port 3000.");
});
