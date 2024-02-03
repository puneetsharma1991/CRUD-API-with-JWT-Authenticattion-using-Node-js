const { error } = require("console");
const express = require("express");

const mongoose = require("mongoose");

const { connectMongoDb } = require('./connection');

const userRouter = require('./routes/user');

const { logReqRes } = require("./middlewares/index");
const bodyParser = require('body-parser');

const app = express();

// Connection Mongo db
connectMongoDb('mongodb://localhost:27017/user_database').then(() =>
    console.log("MongoDB Connected")
);



//Middleware plugin........
app.use(bodyParser.json());

//app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));


// user routes
app.use("/api/users", userRouter);

app.listen(8000, () => console.log("Server Started"));
