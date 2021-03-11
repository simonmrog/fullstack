"use strict";
import pusher from "../core/pusher.js";

import VoteSchema from "../models/Vote.js";


class PollController {

  async getVotingResults(req, res) {
    try {
      const votes = await VoteSchema.find({});
      console.log(votes);
      res.status(200).json({ status: "ok", data: votes });
    } catch (err) {
      console.log("[ERROR]:", err.message);
      res.status(500).json({ status: "error", detail: err.message });
    } 
  }

  async createVote(req, res) {
    try {
      const { os } = req.body;
      const newVote = {
        os, 
        points: 1
      }

      const createdVote = await new VoteSchema(newVote).save();
      pusher.trigger("os-poll", "os-vote", {
        os: createdVote.os,
        points: createdVote.points
      });

      return res.status(201).json({
        status: "ok",
        message: "Thanks for voting"
      });
    } catch (err) {
      console.log("[ERROR]:", err.message);
      res.status(500).json({ status: "error", detail: err.message });
    }
  }
}

export default new PollController();
