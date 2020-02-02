var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("landing");

});


app.get("/laws", function(req, res) {
  var query = req.query.search;
  var url = "https://api.case.law/v1/cases/?search=" + query + "&ordering=-decision_date";
  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      res.render("laws", {data: data});
    }
  });
});



// tell Express to listen for requests (start server)
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("The Law app Has Started!");
});
