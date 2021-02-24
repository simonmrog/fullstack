import express from "express";
const { Router } = express;

import postController from "../controllers/post.js";
import { postValidator } from "../services/helpers.js";

const postRouter = Router();

postRouter.get("/", postController.getPosts);
postRouter.post("/", postValidator, postController.createPost);

export default postRouter;
