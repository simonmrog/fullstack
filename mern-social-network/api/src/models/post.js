import mongoose from "mongoose";
const { Schema } = mongoose;

const PostSchema = new Schema({
  title: {
    type: String,
    required: "Title is required",
    minlength: 4,
    maxlength: 150
  },
  body: {
    type: String,
    required: "Body is required",
    minlength: 4,
    maxlength: 2000
  }
});

export default mongoose.model("posts", PostSchema);