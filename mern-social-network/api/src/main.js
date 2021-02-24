import app from "./app.js";
import mongo from "./db.js";
import config from "./config.js";

async function initApplication() {
  try {
    const db = await mongo.makeDatabaseConnection();
    console.log("[INFO]: Connected to database:", db.connection.host);
    app.listen(config.port, function () {
    console.log("[INFO]: Server running on port", config.port);
  });
  } catch (err) {
    console.log("[ERROR]:", err.message);
  }
}

initApplication();
