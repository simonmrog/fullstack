"use strict";

import pollRouter from "./poll.js";


export default function (app) {
  app.use("/api/poll", pollRouter);

  app.use("*", function(req, res) {
    res.status(404).json({ detail: "Not Found" });
  });
}
