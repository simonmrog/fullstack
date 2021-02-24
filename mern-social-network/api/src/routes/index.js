import postRouter from "./post.js";

export default function(app) {
  app.use("/api/posts", postRouter);

  // Not found response for non-matching routes
  app.use('*', function(req, res){
    res.status(404).json({ status: "error", detail: "Not Found" });
  });
}
