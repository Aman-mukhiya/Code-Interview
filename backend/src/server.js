import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
dotenv.config({
  path:'./.env'
});
const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "success from api",
  });
}); 

const startServer = async () => {
  try {
    await connectDB();
      app.listen(process.env.PORT, () => {  
        console.log("⚙ Server is runnig port: ",process.env.PORT )
      });
  } catch (error) {
    console.log("Error while starting the server!", error);
  }
}

startServer();
