import express from "express";
import {createServer} from "node:http";
import mongoose from "mongoose";
import connectToSocket from "./controllers/socketManager.js";
import cors from "cors"
import usersRoutes from "./routes/usersRoutes.js";
const app=express();
const server=createServer(app);
const io=connectToSocket(server);

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb", extended:true}));

app.use("/api/v1/users",usersRoutes);

const start = async () => {
    try {
        console.log("Connecting to MongoDB...");
        const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/videocall";
        const connectionDb = await mongoose.connect(mongoUri);
        console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`);
        console.log(`Database Name: ${connectionDb.connection.db.databaseName}`);

        server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
    } catch (error) {
        console.error("MongoDB connection failed:", error?.message || error);
        process.exit(1);
    }
};

start();