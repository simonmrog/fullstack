import dotenv from "dotenv";

dotenv.config();


class Config {

  environment = process.env.ENVIRONMENT;
  port = process.env.PORT;
  mongoUsername = process.env.MONGO_USERNAME;
  mongoPassword = process.env.MONGO_PASSWORD;
  mongoDatabase = process.env.MONGO_DATABASE;
}

export default new Config();
