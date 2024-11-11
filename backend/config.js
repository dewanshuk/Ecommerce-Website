import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.REACT_APP_PORT,
  MONGODB_URL: process.env.REACT_APP_MONGODB_URL,
  JWT_SECRET: process.env.REACT_APP_JWT_SECRET,
  PAYPAL_CLIENT_ID: process.env.REACT_APP_PAYPAL_CLIENT_ID,
  accessKeyId: process.env.REACT_APP_accessKeyId,
  secretAccessKey: process.env.REACT_APP_secretAccessKey,
};
