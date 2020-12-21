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

if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

app.use('/api', apiRoutes);
app.listen(8080, () => {
    console.log("Running API on port " + 8080);
});