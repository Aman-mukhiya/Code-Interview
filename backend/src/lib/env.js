import dotenv from "dotenv";

dotenv.config();

export const ENV = {
PORT: process.env.PORT,
DB_URL:process.env.DB_URL,
NODE_ENV:process.env.NODE_ENV,
INGGEST_EVENT_KEY:process.env.INGGEST_EVENT_KEY,
INGGEST_SIGNING_KEY:process.env.INGGEST_SIGNING_KEY,
STREAM_API_KEY:process.env.STREAM_API_KEY,
STREAM_API_SECRET:process.env.STREAM_API_SECRET,
CLIENT_URL:process.env.CLIENT_URL,
};