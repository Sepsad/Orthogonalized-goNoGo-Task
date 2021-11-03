var express = require("express");


// INIT APP
var app = express();

app.use(express.static(__dirname + '/public'));
app.use("/jspsych", express.static(__dirname + '/jspsych'));
console.log(__dirname + '/jsPsych');
app.use("/scripts", express.static(__dirname + '/scripts'));


app.set("views", __dirname + "/public/views/");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");


app.get("/", function (request, response) {
    response.render("test_experiment.html")
});


// SERVER
var server = app.listen(process.env.PORT || 3000, function(){
    console.log("listening to port %d", server.address().port);
}); 


