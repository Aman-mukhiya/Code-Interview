import express from "express";
import path from "path";
import cors from "cors";
import { functions, inngest } from "./lib/inngest.js";
import { serve } from "inngest/express";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";

// dotenv.config({
//   path:'./.env'
// });
const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(cors({origin:ENV.CLIENT_URL, credentials:true}));
app.use("api/inngest", serve({client:inngest, functions}))

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "success from api",
  });
}); 

const startServer = async () => {
  try {
    await connectDB();
      app.listen(ENV.PORT, () => {  
        console.log("⚙ Server is runnig port: ",ENV.PORT )
      });
  } catch (error) {
    console.log("Error while starting the server!", error);
  }
}

startServer();
