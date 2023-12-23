import { MongoClient } from "mongodb";

const express = require("express");
const bodyParser = require("body-parser");


async function start(){
    try{
        const app = express();
        const mongodb = await MongoClient.connect("mongodb://0.0.0.0:27017/flagak-test");
        await mongodb.connect();

        app.db = mongodb.db("flagak-test");
        // body parser
        app.use(bodyParser.json());
        // routes
        app.use("/api", require("./routes/customers"));
        //start server
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    }catch(e){
        console.log(e)
    }
}

start();