import mongoose from "mongoose";

import config from "./config.js";


class MongoDB {

  mongooseConfig = { useNewUrlParser: true, useUnifiedTopology: true };
  mongoUsername = config.mongoUsername;
  mongoPassword = config.mongoPassword;
  mongoDatabase = config.mongoDatabase;
  mongoPort = config.mongoPort;
  // mongoUri = `mongodb://audit-db:${this.mongoPort}/${this.mongoDatabase}`;
  mongoUri = `mongodb+srv://${this.mongoUsername}:${this.mongoPassword}@outdoors-cluster.durfc.mongodb.net/${this.mongoDatabase}?retryWrites=true&w=majority`

  makeDatabaseConnection() {
    return mongoose.connect(this.mongoUri, {
      auth: { authSource: "admin" },
      user: this.mongoUsername,
      pass: this.mongoPassword,
      ...this.mongooseConfig
    });
  }
}

export default new MongoDB()
