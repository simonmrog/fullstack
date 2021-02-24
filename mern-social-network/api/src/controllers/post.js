import PostModel from "../models/post.js";

class PostController {

  async getPosts(req, res) {
    try {
      const posts = await PostModel.find()
        .select("_id title body");
      res.json({ status: "ok", data: posts });
    } catch (err) {
      res.status(500).json({
        status: "error",
        detail: "Internal Server Error"
      });
    }
  }

  async createPost(req, res) {
    try {
      const post = new PostModel(req.body);
      const postCreated = await post.save();
      res.status(201).json({
        status: "ok",
        data: postCreated
      });
    } catch (err) {
      console.log("[ERROR]:", err.message);
      res.status(500).json({
        status: "error",
        detail: "Internal Server Error"
      });
    }
  }
}

export default new PostController();
