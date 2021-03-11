"use strict";

import express from "express";
const { Router } = express;

import pollController from "../controllers/poll.js";

const pollRouter = Router();

pollRouter.get("/results", pollController.getVotingResults);
pollRouter.post("/create", pollController.createVote);

export default pollRouter;
