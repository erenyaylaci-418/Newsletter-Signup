//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();


app.use(express.static("public"))
app.use(express.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+'/static/signup.html');
});
app.post("/",function(req,res){
    let data = req.body;
    let firstName = data.fName;
    let lastName = data.lName;
    let email = data.email;
    let sendData = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_field: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]

    };
    let jsonData = JSON.stringify(sendData);
    let url = "https://us6.api.mailchimp.com/3.0/lists/f4aac8df4f";

    const options = {
        method: "POST",
        auth: "eren1:496d51807c166943e1f1d29a8ba27645-us6"
    };
    const request = https.request(url, options,function(response) {
        if(response.statusCode === 200){
            res.sendFile(__dirname+"/static/success.html");
        }else{
            res.sendFile(__dirname+"/static/failure.html");
        }
        response.on("data",function(data) {
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();
    
});
app.post("/failure",function(req,res) {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is working ");
});

//API Key
//496d51807c166943e1f1d29a8ba27645-us6

//List Key
//f4aac8df4f