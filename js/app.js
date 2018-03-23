var http = require('http');
var express = require('express');
var nodemailer = require('nodemailer');

var bodyParser = require('body-parser');
var app = express();
var port = Number(process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

// Front page
app.get('/', function(req, res) {
    res.sendfile('index.html');
    console.log('Nodemailer reading console log...' + req.url);
});

//sending mail function
app.post('/send', function(req, res) {
    if(req.body.mail == "" || req.body.subject == "") {
        res.send("Error: Email & Subject should not be blank");
        return false;
    }

    //sending emails with SMTP, configuration using SMTP settings
    var smtpTransport = nodemailer.createTransport("SMTP", {
        host: "smtp.gmail.com", //host name
        secureConnection: true, //use SSL
        port: 465, //port for secure SMTP
            auth: {
                user: '',
                pass: ''
            }
    });

    var mailOptions = {
        from: "Node Emailer - <porukesajt@gmail.com>",
        to: req.body.email, //list of receivers
        subject: req.body.subject+" -", //subject line
        //text: "Hello world" //plain text
        html: "<b>"+req.body.description+"<b>" //html body of the index.html
    }
    smtpTransport.sendMail(mailOptions, function(error, response) {
        if(error){
            res.send("Email could not be sent due to Error: "+error);
        }else{
            res.send("Email has been sent successfuly!");
        }
    });
    var server = http.createServer(app).listen(port, function(){
        console.log("Server Running on" + port);
    });
});