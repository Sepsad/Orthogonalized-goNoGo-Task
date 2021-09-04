var express = require("express");


// INIT APP
var app = express();

app.use(express.static(__dirname + '/public'));
app.use("/jsPsych", express.static(__dirname + '/jsPsych'));
console.log(__dirname + '/jsPsych');
app.use("/scripts", express.static(__dirname + '/scripts'));


app.set("views", __dirname + "/public/views/");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");


app.get("/", function (request, response) {
    response.render("test_experiment.html")
});


// SERVER
var server = app.listen(process.env.PORT || 5000, function(){
    console.log("listening to port %d", server.address().port);
}); 


