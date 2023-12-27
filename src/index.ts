import mongoose from "mongoose";
import CustomerRouter from "./routes/Customer.route";
import StoreAdminRouter from "./routes/StoreAdmin.route";
import express from "express";
import bodyParser from "body-parser";
import config from "./config/config";
import Logger from "./library/logging";
import http from "http";
import authRouter from "./routes/auth.route";


const router = express();

mongoose.connect(config.mongo.url, ).then(() => {
    Logger.info("Connected to MongoDB");
    startServer();

}).catch((error) => {
    Logger.error(error);
});

const startServer = () => {
    router.use((req, res, next) => {
        Logger.info(`Request URL: ${req.url}, Method: ${req.method}, IP: ${req.ip}`);

        res.on("finish", () => {
            Logger.info(`Response Status: ${res.statusCode}`);
        });
        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(bodyParser.json());

    router.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        next();
    });
    //routes
    router.use("/store", StoreAdminRouter);
    router.use("/customer", CustomerRouter);
    router.use("/auth", authRouter);
    //health check

    router.get("/health", (req, res) => {
        res.status(200).send("OK");
    });

    

    //not found

    router.use((req, res) => {
        res.status(404).send("Not Found");
        Logger.error(`Request URL: ${req.url}, Method: ${req.method}, IP: ${req.ip}`);
    });

    http.createServer(router).listen(config.server.port, () => {
        Logger.info(`Server is running on port ${config.server.port}`);
    });
}
