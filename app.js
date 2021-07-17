var express = require("express");


// INIT APP
var app = express();

app.use(express.static(__dirname + '/public'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/scripts", express.static(__dirname + '/scripts'));


app.set("views", __dirname + "/public/views/");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");


app.get("/", function (request, response) {
    response.render("test_experiment.html")
});


// SERVER
var server = app.listen(3000, function(){
    console.log("listening to port %d", server.address().port);
}); 


