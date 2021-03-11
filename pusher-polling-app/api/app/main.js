import app from "./api/app.js";
import mongo from "./db.js";
import config from "./config.js";

async function initApplication() {
  try {
    const db = await mongo.makeDatabaseConnection();
    console.log("Database connection established:", db.connection.host);
    app.listen(config.port);
    console.log("Server listening on port", config.port);
  } catch (err) {
    console.log("[ERROR]", err.message);
  }
}

initApplication();
