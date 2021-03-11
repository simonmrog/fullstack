"use strict";

import mongoose from "mongoose";

import config from "./config.js";


class MongoDB {

  mongooseConfig = { useNewUrlParser: true, useUnifiedTopology: true };
  mongoUsername = config.mongoUsername;
  mongoPassword = config.mongoPassword;
  mongoDatabase = config.mongoDatabase;
  mongoHost = config.mongoHost;
  mongoPort = config.mongoPort;
  mongoUri = `mongodb://${this.mongoUsername}:${this.mongoPassword}@${this.mongoHost}:${this.mongoPort}/${this.mongoDatabase}`;

  makeDatabaseConnection() {
    return mongoose.connect(this.mongoUri, {
      auth: { authSource: "admin" },
      ...this.mongooseConfig
    });
  }
}

export default new MongoDB()
