import app from "./app.js";

import config from "./config.js";

function initApplication() {
  try {
    app.listen(config.PORT, function () {
      console.log("Server running on port", config.PORT);
    });
  } catch (err) {
    console.log("[ERROR]", err.message);
  }
}

initApplication();