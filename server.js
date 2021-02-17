var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var port = process.env.PORT || 8080;
var routes = require("./routes/index");

//middleware
app.use(bodyParser.json());
app.use("/api", routes);

// Only works on 3000 regardless of what I set environment port to or how I set
// [value] in app.set('port', [value]).
// app.listen(3000);
app.listen(port, () => console.log(`Listening on port ${port}`));
