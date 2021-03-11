import mongoose from "mongoose";
const { Schema } = mongoose;

const VoteSchema = new Schema({
  os: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true
  }
});

export default mongoose.model("Vote", VoteSchema);
