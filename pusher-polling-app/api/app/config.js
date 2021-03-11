"use strict";

import dotenv from "dotenv";

dotenv.config();

class Settings {
  port = process.env.WEB_APP_PORT;
  pusherAppId = process.env.PUSHER_APP_ID;
  pusherKey = process.env.PUSHER_KEY;
  pusherSecret = process.env.PUSHER_SECRET;
  mongoUsername = process.env.MONGO_USERNAME;
  mongoPassword = process.env.MONGO_PASSWORD;
  mongoDatabase = process.env.MONGO_DATABASE_NAME;
  mongoHost = process.env.MONGO_HOST;
  mongoPort = process.env.MONGO_PORT;
}

export default new Settings();
