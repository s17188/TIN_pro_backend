const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tin', { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

const apiRoutes = require("./routes/api-routes");
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

app.use('/api', apiRoutes);
app.listen(8080, () => {
    console.log("Running API on port " + 8080);
});