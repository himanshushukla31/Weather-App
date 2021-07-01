const express = require("express");

const bodyParser= require("body-parser");

const https= require("https");
const { log } = require("console");

const app= express();


app.use(bodyParser.urlencoded({extended: true }));


app.get("/", function(req,res) {
    res.sendFile(`${__dirname}/index.html`)
})

app.post("/", function(req,res) {
const query= req.body.cityName;
const unit= "metric"
const appId= "6fee523fb0dd52db853234aa27b0b5b7"
const url= "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid=" + appId 
https.get(url,function(response) {
    response.on("data", function(data) {
    const jasonFormat=    JSON.parse(data);
    const temp= jasonFormat.main.temp;
    const des= jasonFormat.weather[0].description;
    
    res.write("The temperature is " + temp + " degree celcius.");
    res.send()
    })

})

})


app.listen(3000, function() {
    console.log("The server is running at port 3000");
})