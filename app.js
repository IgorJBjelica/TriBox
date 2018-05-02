/*
Date: So. 5. March 2017 Author: SysAdminCat 
*/
var http = require('http');
var express = require('express');
var nodemailer = require("nodemailer");
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var port = Number(process.env.PORT || 5000);

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(__dirname + '/'));

// Home page
app.get('/', function (req, res) {
    res.sendFile('index.html');
    //console.log 
    console.log('NodeMailer reading console log...' + req.url);

});

// sending mail function
app.post('/send', function (req, res) {
    if (req.body.email == "" || req.body.subject == "") {
        res.send("Error: Email & Subject should not blank");
        return false;
    }

    // Sending Emails with SMTP, Configuring SMTP settings

    var smtpTransport = nodemailer.createTransport("SMTP", {
        host: "mail.tribox.rs", // hostname
        secureConnection: true, // use SSL
        port: 465, // port for secure SMTP
        auth: {
            user: 'porukesajt@tribox.rs',
            pass: 'passvord'
        }
    });
    var mailOptions = {
        from: "Node Emailer ✔ <porukesajt@tribox.rs>", // sender address
        to: req.body.emailto, // list of receivers
        subject: req.body.subject + " ✔", // Subject line
        //text: "Hello world ✔", // plaintext body
        html: "<b>" + req.body.description + "</b>" // html body
    }
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            res.send("Email could not sent due to error: " + error);
        } else {
            res.send("Email has been sent successfully");
        }
    });
});

// Starting server
var server = http.createServer(app).listen(port, function () {
    console.log("Server is Running on 127.0.0.1:" + port);
});