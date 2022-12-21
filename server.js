const express = require('express')
const app = express()
const bodyParser = require("body-parser");
require("dotenv").config();
const apiRoutes =require('./routes')
require("./config/db").connect();
const PORT = process.env.PORT;
const cors = require('cors')


app.use(cors())
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));




app.use("/", apiRoutes());

app.listen(PORT)

console.log(`app started at port : ${PORT}`)