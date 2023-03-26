const express = require("express");
const bodyParser= require("body-parser");
const request = require("request");
const https = require("https");
const app= express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
    res.sendFile(__dirname+ "/index.html");
});

app.post("/", function(req,res){
    const query=req.body.cityName;
    const apiKey="ade9049f85af7c57f3ff2a3063915fb4";
    const unit= "metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

    // sending the http request to the openweather to fetch the data from their website.
    https.get(url, function(response){
        
        // check whether the data is fetched or not by the status code. It should be 200.
        console.log(response.statusCode);

        response.on("data", function(data){
            const Weatherdata=JSON.parse(data); //parse the data coming from openweather in JSON format.
            const temp= Weatherdata.main.temp;  //can be seen by JSON viewer extension, how to fetch particular data we need
            const WeatherDescription=Weatherdata.weather[0].description;
            const icon= Weatherdata.weather[0].icon; 
            const imageURL= "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>The weather is currently "+WeatherDescription+"<h1>");
            res.write("<h1>The temperature in "+query+" is "+temp+" degree celcius.</h1>");
            res.write("<img src="+imageURL+">");
            res.send();

        })
    })
})



app.listen(3000, function(){
    console.log("Server is running on port 3000.");
})