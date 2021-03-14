import pushRouter from "./webPush.js";

export default function (app) {
  app.use("/api", pushRouter);

  app.use("*", function (req, res) {
    return res.status(404).json({
      status: "error",
      detail: "Not Found"
    });
  });
}
