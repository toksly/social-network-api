const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/User");
const thoughtRoutes = require("./routes/Thought");
require("dotenv").config();

const port = process.env.PORT || 8080;

//middleware
app.use(bodyParser.json());
app.use("/api", userRoutes);
app.use("/api", thoughtRoutes);

// Only works on 3000 regardless of what I set environment port to or how I set
// [value] in app.set('port', [value]).
// app.listen(3000);

//connect to mongodb database
mongoose.connect(process.env.DB_url, {
	useNewUrlParser: "true",
});

mongoose.connection.on("error", (err) => {
	console.log("err", err);
});

mongoose.connection.on("connected", (err, res) => {
	console.log("mongoose is connected");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
