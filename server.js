const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const cors = require("cors");
const isAuth = require("./middleware/is-auth");
var cookieSession = require('cookie-session')
const PORT = process.env.PORT || 3001;
//oijj


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(isAuth);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

//moving to atlas mongodb need this section of code  asdad
//mongodb+srv://User:Password@cluster0.jwb3e.mongodb.net/Cluster0?retryWrites=true&w=majority;

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://user:password123@ds139072.mlab.com:39072/heroku_fk9bgj1g");
// mongodb://localhost/peakConditiondb

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
